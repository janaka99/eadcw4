package com.example.demo.Comment;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.time.LocalDate;

public class Comment {
    private int id;
    private int userId;
    private int postId;
    private String text;
    private Timestamp created_at;
    private String profileUrl;


    private String owner;

    public Comment(int id, int userId, int postId, String text, Timestamp created_at, String profileUrl, String owner) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.text = text;
        this.created_at = created_at;
        this.profileUrl = profileUrl;
        this.owner = owner;
    }

    public Comment(int id, int userId, int postId, String text, Timestamp created_at) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.text = text;
        this.created_at = created_at;
    }
    public Comment(@JsonProperty("post_id") int postId,@JsonProperty("text") String text) {
        this.postId = postId;
        this.text = text;
    }

    public Comment() {
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

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
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
