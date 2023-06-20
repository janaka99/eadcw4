package com.example.demo.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class User {


    private int id;
    private String name;
    private Timestamp created_at;
    private String email;
    private String password;

    private String profileUrl;

    public User() {

    }

    public User(int id, String name, String email,String profileUrl,String password, Timestamp created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.password = password;
        this.created_at = created_at;

    }
    public User(int id, String name, String email,String profileUrl, Timestamp created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.created_at = created_at;

    }



    public User(
            @JsonProperty("name")String name,
            @JsonProperty("email")String email,
            @JsonProperty("password")String password
    ){
        this.name = name;
        this.email = email;
        this.password = password;

    }
//    public User(
//            @JsonProperty("email")String email,
//            @JsonProperty("password")String password
//    ){
//        this.email = email;
//        this.password = password;
//
//    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }


}
