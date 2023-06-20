package com.example.demo.user;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserDataAccessService {

    PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;



    @Autowired
    public UserDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }


    public  ResponseEntity loadProfileData(int user_id){
        HashMap<String, String> result = new HashMap();

        String sqlQuery = "select * from user where id="+user_id;
        List<User> user =  jdbcTemplate.query(sqlQuery, (rs, rowNum) ->(
            new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("profileUrl"),
                    rs.getTimestamp("created_at")
            )
        ));
        if(user.size() == 0){
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }else if(user.size() == 1){

            return new ResponseEntity<Object>(user.get(0),HttpStatus.BAD_REQUEST);
        }else{
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity login(String email ,  String password){
        HashMap<String, String> result = new HashMap();


        String sqlQuery = "select * from user where email='"+email+"'";


        List<User> user =  jdbcTemplate.query(sqlQuery, (rs, rowNum) ->(
                new User(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("profileUrl"),
                        rs.getString("password"),
                        rs.getTimestamp("created_at")

                )
        ));


        if(user.size() == 0){

            result.put("errors" , "Login failed Check your email and password");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        } else if (user.size() == 1) {
            boolean userFound = passwordEncoder.matches(password, user.get(0).getPassword());
            if(userFound == true){
              User loggedUser =   new User(
                        user.get(0).getId(),
                        user.get(0).getName(),
                        user.get(0).getEmail(),
                        user.get(0).getProfileUrl(),
                        user.get(0).getCreated_at()
                );

                return new ResponseEntity<Object>(loggedUser, HttpStatus.OK);
            }else{
                result.put("errors" , "Login failed Check your email and password");
                return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
            }
        }else{
            result.put("errors" , "Login failed Check your email and password");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity addNewUser(String name, String email, String password){
        HashMap<String, String> result = new HashMap();
        String hashedPassword = passwordEncoder.encode(password);
        try{
            String sqlquery1 = "select * from user where name='"+name+"' or email='"+email+"'";


            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sqlquery1);
            if(rows.size() > 0){
                result.put("errors" , "User already exists!");
                return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
            }else{
                String sqlQuery3 = "insert into user(name,email,password) values (?, ?,?)";

                int rs3 =  jdbcTemplate.update(sqlQuery3,
                        name, email , hashedPassword
                );
                if(rs3 == 1){
                    result.put("success" , "SuccessFully registered");
                    return new ResponseEntity<Object>(result, HttpStatus.OK);
                }else{
                    result.put("errors" , "Something went wrong! Please Try Again Later");
                    return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
                }
            }

        }catch(Exception ex){
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity<Object> updateUserName(User user ,  int userId){
        HashMap<String, String> result = new HashMap();

        try{
            if(user.getName() == ""){
                result.put("errors" , "Name can not be empty");
                return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
            }else {
                String sqlQuery = "update user set name=? where id=" + userId;

                int rs = jdbcTemplate.update(sqlQuery,
                        user.getName()
                );
                if (rs == 1) {
                    result.put("success", "SuccessFully Updated");
                    return new ResponseEntity<Object>(result, HttpStatus.OK);
                } else {
                    result.put("errors", "Something went wrong! Please Try Again Later");
                    return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                }
            }
        }catch(Exception ex){
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Object> updateUserProfile(int id, Cloudinary cloudinary, String url, String imageId) throws IOException {
        HashMap<String, String> result = new HashMap();

        try{
            String sqlQuery = "update user set profileUrl=? , image_id=? where id=?";

            int rs =  jdbcTemplate.update(sqlQuery,
                        url,
                    imageId,
                    id
            );
            if(rs == 1){
                result.put("success" , "SuccessFully Updated");
                return new ResponseEntity<Object>(result, HttpStatus.OK);
            }else{
                Map deleteresult = cloudinary.uploader().destroy(imageId,
                        ObjectUtils.emptyMap());
                result.put("errors" , "Something went wrong! Please Try Again Later");
                return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            Map deleteresult = cloudinary.uploader().destroy(imageId,
                    ObjectUtils.emptyMap());
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity delete( int id) {
        HashMap<String, String> result = new HashMap();
        try{




            if(rs == 1){
                result.put("success" , "SuccessFully deleted");
                return new ResponseEntity<Object>(result,HttpStatus.OK);
            }else{
                result.put("errors" , "Something went wrong! Please Try Again Later");
                return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result,HttpStatus.BAD_REQUEST);
        }
    }



}
