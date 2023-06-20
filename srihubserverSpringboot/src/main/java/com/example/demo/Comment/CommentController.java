package com.example.demo.Comment;

import com.example.demo.middleware.UserMiddleware;
import com.example.demo.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    private CommentService commentService;

    public CommentController(CommentService commentService ) {
        this.commentService = commentService;

    }

    //checked and working
    @PostMapping("/add-new-comment")
    public ResponseEntity addNewPost(@RequestHeader Map<String, String> headers, @RequestBody Comment comment  )
    {
        System.out.println(comment.getPostId()  + " " +comment.getText());
        return   commentService.addNewComment(headers ,comment);
    }

    //checked and working
    @PutMapping("/update-comment")
    public ResponseEntity updatePost(@RequestHeader Map<String, String> headers,@RequestBody Map body ){

        return   commentService.updateComment(headers,body);
    }

    @DeleteMapping("/delete-comment")
    public ResponseEntity deletePost(@RequestHeader Map<String, String> headers,@RequestParam String comment_id){
        System.out.println(comment_id);
        return   commentService.deleteComment(headers , comment_id);
    }
}
