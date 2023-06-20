package com.example.demo.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/post")
public class PostController {

    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    //checked and working
    @GetMapping("/get-all-posts")
    public ResponseEntity getAllPosts(){
        return   postService.getAllPosts();
    }


    //checked and working
    @GetMapping("/get-my-all-posts")
    public ResponseEntity getAllMyPosts(@RequestHeader Map<String, String> headers){
        return   postService.getAllMyPosts(headers);
    }


    //checked and working
    @PostMapping("/add-new-post")
    public ResponseEntity addNewPost(@RequestHeader Map<String, String> headers,@RequestBody  Post post ){
        System.out.println("reacehd");
        return   postService.addNewPost(headers,post);
    }

    //checked and working
    @PutMapping("/update-post")
    public ResponseEntity updatePost(@RequestHeader Map<String, String> headers,@RequestBody Map body ){

        return   postService.updatePost(headers,body.get("post").toString(),  body.get("post_id").toString());
    }

    //checked and working
    @DeleteMapping("/delete-post")
    public ResponseEntity deletePost(@RequestHeader Map<String, String> headers,@RequestParam String post_id){

      return   postService.deletePost(headers , post_id);
    }
}
