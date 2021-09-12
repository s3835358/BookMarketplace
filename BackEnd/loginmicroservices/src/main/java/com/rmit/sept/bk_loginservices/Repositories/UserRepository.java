package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.mapper.UserMapper;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public User register(User user) {

        
        String query = "INSERT INTO `users`(`fullName`, `username`, `password`, `userType`, `address`,";
        query += "`phone`, `pending`, `abn`) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";

        jdbcTemplate.update(query, user.getFullName(), user.getUsername(), user.getPassword(), user.getUserType(),
        user.getAddress(), user.getPhone(), user.getPending(), user.getAbn());

        return findByUsername(user.getUsername());
    }

    public void getNames() {

        String query = "SELECT `fullName` FROM `users`;";

        List<String> users = jdbcTemplate.queryForList(query, String.class);

        for(int i = 0; i < users.size(); ++i) {
            System.out.println(users.get(i));
        }
    }

    public User findByUsername(String username) {
        String query2 = "SELECT * FROM `users` WHERE `username`= ?;";
        User user = jdbcTemplate.queryForObject(query2, new UserMapper(), username);
        return user;
    }

    public User getById(Long id) {
        return null;
    }

}
