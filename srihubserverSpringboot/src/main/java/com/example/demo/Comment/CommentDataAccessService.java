package com.example.demo.Comment;

import com.example.demo.post.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CommentDataAccessService {

    private JdbcTemplate jdbcTemplate;

    public CommentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public ResponseEntity addNewComment(Comment comment, int user_id){
        HashMap<String, String> result = new HashMap();

        try{
            String sqlQuery = "insert into comment(userId,postId, text) values (?, ?,?)";

            int rs =  jdbcTemplate.update(sqlQuery,
                    user_id,
                    comment.getPostId(),
                    comment.getText()
            );
            if(rs == 1){
                result.put("Success" , "Successful");
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

    public ResponseEntity updateComment(String comment_text,int comment_id, int user_id){
        HashMap<String, String> result = new HashMap();

        try{
            String sqlQuery = "update comment set text=? where id=? and userId=?";

            int rs =  jdbcTemplate.update(sqlQuery,
                    comment_text,
                    comment_id,
                    user_id
                    );
            if(rs == 1){
                result.put("Success" , "Successfully updated");
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

    public ResponseEntity deleteComment(int user_id, int comment_id){
        HashMap<String, String> result = new HashMap();
        try{
            String sqlQuery = "delete from comment where id=? and userId=?";

            int rs =  jdbcTemplate.update(sqlQuery,
                    comment_id,
                    user_id
            );


            if(rs == 1){
                result.put("success" , "Comment successfully deleted");
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
