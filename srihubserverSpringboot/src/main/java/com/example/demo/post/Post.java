package com.example.demo.post;

import com.example.demo.Comment.Comment;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Post {
    private int id;
    private int userId;
    private String text;
    private Timestamp created_at;


    private String profileUrl;
    private String owner;
    private ArrayList<Comment> comments;


    public Post() {
    }

    public Post(int id, int userId, String text, Timestamp created_at, String profileUrl, String owner, ArrayList<Comment> comments) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.created_at = created_at;
        this.profileUrl = profileUrl;
        this.owner = owner;
        this.comments = comments;
    }

    public Post(int id, int userId, String text, Timestamp created_at , ArrayList<Comment> comments) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.created_at = created_at;
        this.comments = comments;
    }
    public Post(@JsonProperty("post") String text) {
        this.text = text;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

}
