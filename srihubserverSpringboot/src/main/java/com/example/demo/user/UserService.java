package com.example.demo.user;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.middleware.UserMiddleware;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private UserDataAccessService userDataAccessService;
    private UserMiddleware userMiddleware;
    private static final long age = 5 * 60 * 60;
    PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${CLOUDINARY_CLOUD_NAME}")
    private String CLOUDINARY_CLOUD_NAME;
    @Value("${CLOUDINARY_API_KEY}")
    private String CLOUDINARY_API_KEY;
    @Value("${CLOUDINARY_API_SECRET}")
    private String CLOUDINARY_API_SECRET;

    @Autowired
    public UserService(UserDataAccessService userDataAccessService, UserMiddleware userMiddleware) {
        this.userMiddleware = userMiddleware;
        this.userDataAccessService = userDataAccessService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Cloudinary createCloudinaryInstance(){
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUDINARY_CLOUD_NAME,
                "api_key", CLOUDINARY_API_KEY,
                "api_secret",CLOUDINARY_API_SECRET,
                "secure", true));
        return cloudinary;
    }

    public   ResponseEntity loadProfileData(Map<String, String> headers){
        HashMap<String, String> result = new HashMap();
        ResponseEntity response = userMiddleware.isLoggedIn(headers);

        if(response.getStatusCode().is2xxSuccessful()){
            User loggedUser = (User) response.getBody();
            return  userDataAccessService.loadProfileData(loggedUser.getId());
        }else{
            result.put("error", "Please Log In");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }

    public  ResponseEntity validateUser(Map<String, String> headers){
        HashMap<String, String> result = new HashMap();
        ResponseEntity response = userMiddleware.isLoggedIn(headers);

        if(response.getStatusCode().is2xxSuccessful()){
            return response;
        }else{
            result.put("error", "Please Log In");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity login(ObjectNode user){
        HashMap<String, String> result = new HashMap();
        if(user.get("email").asText() == "" || user.get("password").asText() == ""  ||
                user.get("email").asText() == null || user.get("password").asText() == null
        ){
            result.put("errors" , "Login failed Check your email and password");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }else{
            ResponseEntity response = userDataAccessService.login(user.get("email").asText(), user.get("password").asText());


            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                Map<String, Object> claims = new HashMap<>();
                Map<String, Object> userData = new HashMap<>();
                userData.put("name" , loggedUser.getName());
                userData.put("email" , loggedUser.getEmail());
                userData.put("id" , loggedUser.getId());
                userData.put("profileUrl" , loggedUser.getProfileUrl());
                userData.put("created_at" , loggedUser.getCreated_at());
                String id = String.valueOf(loggedUser.getId());
                String token = doGenerateToken(claims,id);
                Map<String, Object> res = new HashMap<>();
                res.put("user", token);
                res.put("userDetails", userData);
                return new ResponseEntity<Object>(res, HttpStatus.OK);

            }else{

                return response;

            }

        }

    }


    private String doGenerateToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + age * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }



    public ResponseEntity addNewUser(User user){
        //do validations
        int ok = 0;
        HashMap<String, String> result = new HashMap();
        if(user.getName() == "" || user.getEmail() == "" || user.getPassword() == "" ||
        user.getName() == null || user.getEmail() == null || user.getPassword() == null
        ){
            result.put("errors" , "All the fields must be filled");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }else {

            return userDataAccessService.addNewUser(user.getName(), user.getEmail(), user.getPassword());
        }
    }

    public ResponseEntity updateUserName(Map<String, String> headers,User user){
        HashMap<String, String> result = new HashMap();
        try{
            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                return userDataAccessService.updateUserName(user , loggedUser.getId());

            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity updateUserProfile(Map<String, String> headers , MultipartFile uploadedFile){
        HashMap<String, String> result = new HashMap();
        try{
            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){

                User loggedUser = (User) response.getBody();
                if(uploadedFile == null ){
                    result.put("error", "Something went wrong check the file!");
                    return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                }else{
                    Cloudinary cloudinary = createCloudinaryInstance();
                    Map uploadResult = cloudinary.uploader().upload(uploadedFile.getBytes() ,ObjectUtils.emptyMap());
                    if(uploadResult.get("url") == null){
                        result.put("error", "Something went wrong check the file!");
                        return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                    }else{
                        System.out.println(uploadResult);

                        return userDataAccessService.updateUserProfile(loggedUser.getId(),cloudinary, uploadResult.get("url").toString() , uploadResult.get("public_id").toString());
                    }

                }

            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }
    public ResponseEntity delete(Map<String, String> headers) {
        HashMap<String, String> result = new HashMap();
        try{
            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                return userDataAccessService.delete( loggedUser.getId());
            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch(Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }


}
