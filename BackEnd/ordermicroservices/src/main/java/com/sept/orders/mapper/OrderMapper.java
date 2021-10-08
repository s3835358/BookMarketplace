package com.sept.orders.mapper;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sept.orders.models.Order;
// Based on https://javabydeveloper.com/spring-jdbctemplate-query-examples/

public class OrderMapper implements RowMapper<Order>{

    @Override
    public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
        Order order = new Order();
        order.setId(rs.getLong("id"));
        order.setSellerId(rs.getLong("seller_id"));
        order.setBuyerId(rs.getLong("buyer_id"));
        order.setQty(rs.getString("qty"));
        order.setPrice(rs.getString("price"));
        order.setBookId(rs.getLong("book_id"));
        order.setBookTitle(rs.getString("book_title"));
        return order;
    }
}