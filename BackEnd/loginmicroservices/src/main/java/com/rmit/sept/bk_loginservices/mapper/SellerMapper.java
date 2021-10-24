package com.rmit.sept.bk_loginservices.mapper;

import com.rmit.sept.bk_loginservices.model.Seller;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

// Based on https://javabydeveloper.com/spring-jdbctemplate-query-examples/

public class SellerMapper implements RowMapper<Seller>{
    
    @Override
    public Seller mapRow(ResultSet rs, int rowNum) throws SQLException {
        Seller seller = new Seller();
        seller.setId(rs.getLong("id"));
        seller.setFullName(rs.getString("fullName"));
        return seller;
    }
}