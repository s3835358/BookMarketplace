package com.sept.orders.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.http.HttpRequest;
import java.util.List;
import com.sept.orders.daos.OrdersDao;
import com.sept.orders.models.Order;
import com.sept.orders.models.TokenBody;

/*
 *	@RestController annotation tells spring boot this is a controller class
 *	and 'automatically' converts any response to JSON. @RequestMapping maps
 *	the class to the '/books' URL
 */
@RestController
@RequestMapping("/orders")
public class OrdersController {

    /*
     *	@Autowired instructs spring boot that booksDao is a dependency for
     * 	BooksController.
     */
    @Autowired
    OrdersDao ordersDao;

    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";


    @PostMapping(value = "/addOrder", consumes ="application/json", produces = "application/json")
    public Order addOrder(@RequestBody Order order) {

        System.out.println("yay");
        return ordersDao.saveOrder(order);
    }

    @PostMapping(value = "/getRecent", consumes ="application/json", produces = "application/json")
    public List<Order> getRecent(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();

        return ordersDao.getRecent(id);
    }

    @PostMapping(value = "/getOrders", consumes ="application/json", produces = "application/json")
    public List<Order> getOrders(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();

        return ordersDao.getOrders(id);
    }

    @PostMapping(value = "/getAll", consumes ="application/json", produces = "application/json")
    public List<Order> getAll(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();

        return ordersDao.getAll(id);
    }

    @PostMapping(value = "/getBought", consumes ="application/json", produces = "application/json")
    public List<Order> getBought(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();

        return ordersDao.getBought(id);
    }

    @PostMapping(value = "/getSold", consumes ="application/json", produces = "application/json")
    public List<Order> getSold(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();

        return ordersDao.getSold(id);
    }

    @PostMapping(value = "/cancelOrder", consumes ="application/json", produces = "application/json")
    public ResponseEntity<?> cancelOrder(@RequestBody TokenBody tokenBody) {
        
        Long id = tokenBody.getId();
        ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);

        if(ordersDao.cancelOrder(id)) {
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        }

        return responseEntity;
    }

}
