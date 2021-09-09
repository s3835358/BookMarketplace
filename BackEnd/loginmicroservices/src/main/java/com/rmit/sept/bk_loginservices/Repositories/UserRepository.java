package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.mapper.UserMapper;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public User findByUsername(String username) {
        String query2 = "SELECT * FROM `users` WHERE `username`= ?;";
        User user = jdbcTemplate.queryForObject(query2, new UserMapper(), username);
        return user;
    }

    public User getById(Long id) {
        return null;
    }
}
