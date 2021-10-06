package com.sept.orders.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import com.sept.orders.daos.OrdersDao;
import com.sept.orders.models.Order;

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


    @PostMapping(value = "/addOrder", consumes ="application/json", produces = "application/json")
    public Order addOrder(@RequestBody Order order) {

        System.out.println("yay");
        return ordersDao.saveOrder(order);
    }
}
