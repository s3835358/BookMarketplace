package com.bookeroo.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import com.bookeroo.app.models.Book;
import com.bookeroo.app.daos.BooksDao;

import java.util.List;

/* 	
 *	@RestController annotation tells spring boot this is a controller class
 *	and 'automatically' converts any response to JSON. @RequestMapping maps
 *	the class to the '/books' URL
 */ 
@RestController
@RequestMapping("/books")
public class BooksController {

	/* 	
	 *	@Autowired instructs spring boot that booksDao is a dependency for
	 * 	BooksController.
	 */
	@Autowired
	BooksDao booksDao;

	/*
	 *	A test method, not currently useful.
	 */
	@GetMapping()
	public Book book(@RequestParam(value = "name", defaultValue = "person") String name) {
		return new Book(1, String.format("Hello %s", name));
	}

	/*
	 *	Requesting '/books/getTitles' will return a list of all the 
	 *	titles from the books table in the database.
	 */
	@GetMapping("/getTitles")
	public List<String> book() {
		//response.addHeader("Access-Control-Allow-Origin","*");
		return booksDao.getBookTitles();
	}
	
}
