package com.sept.orders.daos;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import java.sql.Timestamp;
import java.util.List;
import java.util.LinkedList;
import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.SQLException;
import org.springframework.jdbc.core.PreparedStatementCreator;
import com.sept.orders.models.Order;
import com.sept.orders.mapper.OrderMapper;


/*
 *  @Repository instructs spring boot that this class is a repository or
 *  is intended to handle exceptions with behaviour similar to a repo.
 */
@Repository
public class OrdersDao {

    final int TWO_HRS = 7200000;
    final int DELETED = 1;
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

    public List<Order> getAll(Long id) {
        String query = "select * from `order`;";

        return jdbcTemplate.query(query, new OrderMapper());
    }

    public Order saveOrder(Order order) {

        // Adds book to database
        String query = "insert into `order`(`seller_id`,`buyer_id`,`qty`,`price`, `book_id`, `book_title`, `ordered_at`)";
        query += "values(?, ?, ?, ?, ?, ?, ?);";
        
        final String stmt = query;

        Timestamp time = new Timestamp(System.currentTimeMillis());
        KeyHolder key = new GeneratedKeyHolder();

        // Based on https://www.concretepage.com/spring/how-to-get-auto-generated-id-in-spring-jdbc

        jdbcTemplate.update(new PreparedStatementCreator() {
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement pst =
                    con.prepareStatement(stmt, new String[] {"id"});
                    pst.setLong(1, order.getSellerId());
                    pst.setLong(2, order.getBuyerId());
                    pst.setString(3, order.getQty());
                    pst.setString(4, order.getPrice());
                    pst.setLong(5, order.getBookId());
                    pst.setString(6, order.getBookTitle());
                    pst.setTimestamp(7, time);

                return pst;
            }
        },
        key);

        Long id = key.getKey().longValue();
        String query2 = "select * from `order` where `id`=?;";

        return jdbcTemplate.queryForObject(query2, new OrderMapper(), id);
    }

    public List<Order> getRecent(Long id) {
        List<Order> orders = getOrders(id);
        List<Order> recent = new LinkedList<Order>();
        
        for(Order order: orders){
            Timestamp two_hrs_ago = new Timestamp(System.currentTimeMillis() - TWO_HRS);

            if(order.getOrderedAt().after(two_hrs_ago)) {
                recent.add(order);
            }
        }

        return recent;
    }

    public List<Order> getOrders(Long id) {
        String query = "select * from `order` where `seller_id`=? OR `buyer_id`=?;";

        List<Order> orders = jdbcTemplate.query(query, new OrderMapper(), id, id);
        
        return orders;
    }

    public List<Order> getBought(Long id) {
        String query = "select * from `order` where `buyer_id`=?;";

        List<Order> orders = jdbcTemplate.query(query, new OrderMapper(), id);
        
        return orders;
    }

    public List<Order> getSold(Long id) {
        String query = "select * from `order` where `seller_id`=?;";

        List<Order> orders = jdbcTemplate.query(query, new OrderMapper(), id);
        
        return orders;
    }

    public boolean cancelOrder(Long id) {

        String query = "delete from `order` where `id`=?;";
        boolean deleted = false;
        if(jdbcTemplate.update(query, id) == DELETED) {
            deleted = true;
        }    
        return deleted;
    }

}