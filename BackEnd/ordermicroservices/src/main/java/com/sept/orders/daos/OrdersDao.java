package com.sept.orders.daos;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.sept.orders.models.Order;
import com.sept.orders.mapper.OrderMapper;

/*
 *  @Repository instructs spring boot that this class is a repository or
 *  is intended to handle exceptions with behaviour similar to a repo.
 */
@Repository
public class OrdersDao {

    /*
     *  Autowiring instructs spring to use database properties in
     *  resources/application.properties file to
     *  construct jdbc template object
     */
    @Autowired
    JdbcTemplate jdbcTemplate;

    /*
     *  Queries the database via the jdbcTemplate, and returns
     *  a List<String> containing the title of every book in the books
     *  table.
     */

    public List<Order> getOrders() {
        String query = "select * from order;";

        return jdbcTemplate.query(query, new OrderMapper());
    }

    public Order saveOrder(Order order) {
        // Adds book to database
        String query = "insert into `order`(`seller_id`,`buyer_id`,`qty`,`price`, `book_id`, `book_title`)";
        query += "values(?, ?, ?, ?, ?, ?);";
        jdbcTemplate.update(query, order.getSellerId(), order.getBuyerId(), order.getQty(),
                order.getPrice(), order.getBookId(), order.getBookTitle());

        return null;
    }


}