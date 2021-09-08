package com.bookeroo.mapper;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.bookeroo.app.models.Book;
// Based on https://javabydeveloper.com/spring-jdbctemplate-query-examples/

public class BookMapper implements RowMapper<Book>{
    
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        Book book = new Book();
        book.setId(rs.getLong("id"));
        book.setTitle(rs.getString("title"));
        return book;
    }
}
