package com.bookeroo.mapper;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.bookeroo.app.models.Review;
// Based on https://javabydeveloper.com/spring-jdbctemplate-query-examples/

public class ReviewMapper implements RowMapper<Review>{
    
    @Override
    public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
        Review review = new Review();
        review.setId(rs.getLong("id"));
        review.setUserId(rs.getLong("user_id"));
        review.setBookId(rs.getLong("book_id"));
        review.setContent(rs.getString("content"));
        review.setUserName(rs.getString("user_name"));

        return review;
    }
}

