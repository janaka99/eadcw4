package com.example.demo.post;

import com.example.demo.Comment.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PostDataAccessService {

    private JdbcTemplate jdbcTemplate;

    public PostDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;


    }

    public ResponseEntity getAllPosts(){
        HashMap<String, String> result = new HashMap();
        try {
            String query = "select post.* , user.profileUrl, user.name from post left outer join user on post.userId=user.id";
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
            ArrayList<Post> posts = new ArrayList();
            for(int i = 0 ; i < rows.size() ; i++){

                Post post = new Post();
                post.setId((Integer) rows.get(i).get("id"));
                post.setUserId((Integer) rows.get(i).get("userId"));
                post.setText(rows.get(i).get("text").toString());
                post.setCreated_at((Timestamp) rows.get(i).get("created_at"));
                if(rows.get(i).get("profileUrl") != null){
                    post.setProfileUrl(rows.get(i).get("profileUrl").toString());
                }
                post.setOwner(rows.get(i).get("name").toString());

                String query2 = "select comment.* , user.profileUrl, user.name from comment left outer join user on comment.userId=user.id where comment.postId="+(Integer) rows.get(i).get("id");
                List<Map<String, Object>> rows2 = jdbcTemplate.queryForList(query2);
                ArrayList<Comment> comments = new ArrayList<>();
                if(rows2 == null ||  rows2.isEmpty() == true ){

                    post.setComments(comments);
                }
                for(int j = 0 ; j < rows2.size() ; j++){

                    Comment comment = new Comment();
                    comment.setId((Integer)rows2.get(j).get("id"));
                    comment.setUserId((Integer)rows2.get(j).get("userId"));
                    comment.setPostId((Integer)rows2.get(j).get("postId"));
                    comment.setText(rows2.get(j).get("text").toString());
                    comment.setCreated_at((Timestamp) rows2.get(j).get("created_at"));
                    if(rows2.get(j).get("profileUrl") != null){
                        comment.setProfileUrl(rows2.get(j).get("profileUrl").toString());
                    }
                    comment.setOwner(rows2.get(j).get("name").toString());
                    comments.add(comment);

                }
                post.setComments(comments);

                posts.add(post);

            }

            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        }catch (Exception ex){
            System.out.println("co comments 3");
            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity addNewPost(Post post, int user_id){
        HashMap<String, String> result = new HashMap();

        try{
            String sqlQuery = "insert into post(userId, text) values (?, ?)";

            int rs =  jdbcTemplate.update(sqlQuery,
                    user_id,
                    post.getText()
            );
            if(rs == 1){
                result.put("success" , "Post successfully posted");
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

    public ResponseEntity updatePost(String post, int user_id , int post_id){
        HashMap<String, String> result = new HashMap();

        try{
            String sqlQuery = "update post set text=? where userId=? and id=?";

            int rs =  jdbcTemplate.update(sqlQuery,
                    post,
                    user_id,
                    post_id
            );
            if(rs == 1){
                result.put("success" , "Posts successfully updated");
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

    public ResponseEntity deletePost(int user_id , int post_id ){
        HashMap<String, String> result = new HashMap();

        System.out.println("delete result reached destination");
        try{
            SimpleJdbcCall jdbcCall =  new SimpleJdbcCall(jdbcTemplate).withProcedureName("p_deletePost");
            SqlParameterSource in = new MapSqlParameterSource().addValue("user_Id",user_id).addValue("post_id", post_id);

            Map<String, Object> jdbcCallResult = jdbcCall.execute(in);

            System.out.println("delete result " + jdbcCallResult.get("status"));

            if(jdbcCallResult.get("status").equals("success")){
                result.put("success" , "Post successfully deleted");
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

    public  ResponseEntity<Object> getAllMyPosts(int user_id){
        HashMap<String, String> result = new HashMap();
        try {
            String query = "select post.* , user.profileUrl, user.name from post left outer join user on post.userId=user.id where post.userId="+user_id;
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
            ArrayList<Post> posts = new ArrayList();
            for(int i = 0 ; i < rows.size() ; i++){
                System.out.println("co comments 1" + rows.get(i));
                Post post = new Post();
                post.setId((Integer) rows.get(i).get("id"));
                post.setUserId((Integer) rows.get(i).get("userId"));
                post.setText(rows.get(i).get("text").toString());
                post.setCreated_at((Timestamp) rows.get(i).get("created_at"));
                if(rows.get(i).get("profileUrl") != null){
                    post.setProfileUrl(rows.get(i).get("profileUrl").toString());
                }
                post.setOwner(rows.get(i).get("name").toString());

                String query2 = "select comment.* , user.profileUrl, user.name from comment left outer join user on comment.userId=user.id where comment.postId="+(Integer) rows.get(i).get("id");
                List<Map<String, Object>> rows2 = jdbcTemplate.queryForList(query2);
                ArrayList<Comment> comments = new ArrayList<>();
                if(rows2 == null ||  rows2.isEmpty() == true ){
                    System.out.println("co comments");
                    post.setComments(comments);
                }
                for(int j = 0 ; j < rows2.size() ; j++){
                    System.out.println("comments");
                    Comment comment = new Comment();
                    comment.setId((Integer)rows2.get(j).get("id"));
                    comment.setUserId((Integer)rows2.get(j).get("userId"));
                    comment.setPostId((Integer)rows2.get(j).get("postId"));
                    comment.setText(rows2.get(j).get("text").toString());
                    comment.setCreated_at((Timestamp) rows2.get(j).get("created_at"));
                    if(rows2.get(j).get("profileUrl") != null){
                        comment.setProfileUrl(rows2.get(j).get("profileUrl").toString());
                    }
                    comment.setOwner(rows2.get(j).get("name").toString());
                    comments.add(comment);

                }
                post.setComments(comments);

                posts.add(post);

            }
            return new ResponseEntity<Object>(posts, HttpStatus.OK);
        }catch (Exception ex){

            result.put("errors" , "Something went wrong! Please Try Again Later");
            return new ResponseEntity<Object>(result, HttpStatus.BAD_REQUEST);
        }
    }

}
