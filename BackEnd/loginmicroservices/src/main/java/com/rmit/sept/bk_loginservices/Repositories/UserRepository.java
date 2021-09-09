package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Autowired
    JdbcTemplate jdbcTemplate;

    User findByUsername(String username);
    User getById(Long id);
}
