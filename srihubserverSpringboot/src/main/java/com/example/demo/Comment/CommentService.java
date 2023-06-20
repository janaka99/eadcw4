package com.example.demo.Comment;

import com.example.demo.middleware.UserMiddleware;
import com.example.demo.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CommentService {
    private CommentDataAccessService commentDataAccessService;
    private UserMiddleware userMiddleware;

    public CommentService(CommentDataAccessService commentDataAccessService , UserMiddleware userMiddleware) {
        this.commentDataAccessService = commentDataAccessService;
        this.userMiddleware = userMiddleware;
    }

    public ResponseEntity addNewComment(Map<String, String> headers, Comment comment){

        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                return commentDataAccessService.addNewComment(comment, loggedUser.getId());
            }else{
                result.put("error", "Please Log In");
                return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
            result.put("error", "Something went wrong try again later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity updateComment(Map<String, String> headers,Map comment){

        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                String comment_text = comment.get("comment").toString();
                int comment_id = (Integer) comment.get("comment_id");
                if(comment_text.equals("") || comment_id <= 0){
                    result.put("error", "Something went wrong try again later");
                    return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
                }else{

                    return commentDataAccessService.updateComment(comment_text,comment_id ,loggedUser.getId() );

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
    public ResponseEntity deleteComment(Map<String, String> headers,String comment_id){

        HashMap<String, String> result = new HashMap();
        try{

            ResponseEntity response = userMiddleware.isLoggedIn(headers);
            if(response.getStatusCode().is2xxSuccessful()){
                User loggedUser = (User) response.getBody();
                int commentId = Integer.parseInt(comment_id);
                return commentDataAccessService.deleteComment(loggedUser.getId(), commentId);
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
