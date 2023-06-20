package com.example.demo.post;

import com.example.demo.middleware.UserMiddleware;
import com.example.demo.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PostService {
    private PostDataAccessService postDataAccessService;
    private UserMiddleware userMiddleware;

    public PostService(PostDataAccessService postDataAccessService , UserMiddleware userMiddleware) {
        this.postDataAccessService = postDataAccessService;
        this.userMiddleware = userMiddleware;
    }

    public ResponseEntity getAllPosts(){
        return postDataAccessService.getAllPosts();
    }
    public ResponseEntity getAllMyPosts(Map<String, String> headers){

        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                return postDataAccessService.getAllMyPosts(loggedUser.getId());
            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity addNewPost(Map<String, String> headers,Post post){

        HashMap<String, String> result = new HashMap();
        try{
            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                if(post.getText() == ""){
                    result.put("error", "Question can not be empty");
                    return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                }else{
                    User loggedUser = (User) response.getBody();
                    return postDataAccessService.addNewPost(post, loggedUser.getId());
                }

            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity updatePost(Map<String, String> headers,String post, String post_id){

        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                int postId = Integer.parseInt(post_id);
                return postDataAccessService.updatePost(post , loggedUser.getId(), postId);
            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            result.put("error", "Something went wrong try again laters");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }
    public ResponseEntity deletePost(Map<String, String> headers, String post_id){
        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                int postId = Integer.parseInt(post_id);
                return postDataAccessService.deletePost(loggedUser.getId(),postId);
            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }

    }
}
