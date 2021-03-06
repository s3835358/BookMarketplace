package com.rmit.sept.bk_loginservices.mapper;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.rmit.sept.bk_loginservices.model.User;

// Based on https://javabydeveloper.com/spring-jdbctemplate-query-examples/

public class UserMapper implements RowMapper<User>{
    
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setFullName(rs.getString("fullName"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setUserType(rs.getString("userType"));
        user.setAddress(rs.getString("address"));
        user.setAbn(rs.getString("abn"));
        user.setPending(rs.getString("pending"));
        user.setPhone(rs.getString("phone"));
        user.setBusName(rs.getString("busName"));
        return user;
    }
}