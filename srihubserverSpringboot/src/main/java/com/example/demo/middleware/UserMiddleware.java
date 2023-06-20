package com.example.demo.middleware;

import com.example.demo.user.User;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserMiddleware {

    @Value("${jwt.secret}")
    private String secret;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserMiddleware(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

    }


    public ResponseEntity isLoggedIn(Map<String, String> header) {
        HashMap<String, String> result = new HashMap();
        try {

            if (header.get("authorization") == null) {
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            } else {
                String[] entry = header.get("authorization").split(" ");

                if (entry == null) {
                    Map<String, Object> errorResponse = new HashMap<>();
                    result.put("error", "Please Log In");
                    return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                } else {
                    Map<String, Object> mp = new HashMap<>();
                    String token = entry[1].trim();
                    mp = getAllClaimsFromToken(token);

                    int id = Integer.parseInt((String) mp.get("sub"));

                    String sqlQuery = "select * from user where id=" + id;

                    List<User> user = jdbcTemplate.query(sqlQuery, (rs, rowNum) -> (
                            new User(
                                    rs.getInt("id"),
                                    rs.getString("name"),
                                    rs.getString("email"),
                                    rs.getString("profileUrl"),
                                    rs.getTimestamp("created_at")

                            )
                    ));

                    if (user.size() == 0) {
                        result.put("error", "Please Log In");
                        return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                    } else if (user.size() == 1) {
                        if (mp.get("SessionExpired") == null) {
                            return new ResponseEntity<Object>(user.get(0), HttpStatus.OK);
                        } else {
                            result.put("error", "Please Log In");
                            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                        }
                    } else {
                        result.put("error", "Please Log In");
                        return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                    }

                }
            }
        }catch(Exception ex){
            result.put("error", "Please Log In");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }

    private Map<String, Object> getAllClaimsFromToken (String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}
