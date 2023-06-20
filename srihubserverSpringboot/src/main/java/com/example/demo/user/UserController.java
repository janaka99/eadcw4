package com.example.demo.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Value("${jwt.secret}")
    private String secret;
    private final long age = 5 * 60 * 60;




    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //checked and working
    @GetMapping("/load-user-profile")
    public   ResponseEntity loadProfileData(@RequestHeader Map<String, String> headers){
        System.out.println("load user received");
        return userService.loadProfileData(headers);
    }

    //checked and working
    @PostMapping("/login")
    public ResponseEntity login(@RequestHeader Map<String, String> headers,@RequestBody ObjectNode user){
        System.out.println("authorization");

        System.out.println(headers.get("authorization") );
        return userService.login(user);
    }

    //checked and working
    @PostMapping("/validate-user")
    public ResponseEntity validateUser(@RequestHeader Map<String, String> headers){
        System.out.println("validate received");
        System.out.println(headers);
        System.out.println(headers.get("authorization") );
        return userService.validateUser(headers);
    }

    //checked and working
    @PostMapping("/add-new-user")
    public ResponseEntity addNewUser(@RequestBody User user) {
        System.out.println("add new user received");

        return userService.addNewUser(user);
    }

    //checked and working
    @PutMapping("/update-user-name")
    public ResponseEntity updateUserName(@RequestHeader Map<String, String> headers,@RequestBody User user) {
        System.out.println("update user received");
        return userService.updateUserName(headers,user);
    }

    //checked and working
    @PutMapping("/update-user-profile")
    public ResponseEntity updateUserProfile(@RequestHeader Map<String, String> headers, @RequestParam("file")MultipartFile uploadedFile) {
        System.out.println("update user profile received");

        return userService.updateUserProfile( headers ,uploadedFile);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser( @RequestHeader Map<String, String> headers) {
        return userService.delete(headers);
    }


}