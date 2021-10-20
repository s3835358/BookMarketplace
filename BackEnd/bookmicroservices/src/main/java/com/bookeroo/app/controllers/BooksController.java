package com.bookeroo.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.bookeroo.app.models.Book;
import com.bookeroo.app.models.Review;
import com.bookeroo.app.daos.BooksDao;
import com.bookeroo.app.services.ImageUploadService;

import java.io.IOException;

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
	public Book book(@RequestParam(value = "title", defaultValue = "person") String title) {
		return new Book(1, String.format("Hello %s", title));
	}

	/*
	 *	Based on https://www.baeldung.com/spring-resttemplate-post-json
	 * 
	 */
	@PostMapping(value = "/addBook", consumes ="application/json", produces = "application/json")
	public Book addBook(@RequestBody Book book) {
		
		return booksDao.saveBook(book);
	}

	/*
	 *	Based on https://www.baeldung.com/spring-resttemplate-post-json
	 * 
	 */
	@PostMapping(value = "/editBook", consumes ="application/json", produces = "application/json")
	public Book editBook(@RequestBody Book book) {
		
		return booksDao.updateBook(book);
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

	@GetMapping("/getBooks")
	public List<Book> getBooks() {
		//response.addHeader("Access-Control-Allow-Origin","*");
		return booksDao.getBooks();
	}

	@PostMapping(value = "/bookSold", consumes ="application/json", produces = "application/json")
	public Book bookSold(@RequestBody Book book) {
		
		return booksDao.bookSold(book);
	}

	@PostMapping(value = "/addReview", consumes ="application/json", produces = "application/json")
	public ResponseEntity<?> addReview(@RequestBody Review review) {
		
		ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);

        if(booksDao.addReview(review)) {
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        }

		return responseEntity;
	}

	@PostMapping(value = "/getReviews", consumes ="application/json", produces = "application/json")
    public List<Review> getReviews(@RequestBody Book book) {
        
        Long id = book.getId();

        return booksDao.getReviews(id);
    }

	@Autowired
	ImageUploadService imageUploadService;

	@PostMapping(value = "/uploadCover", consumes = "multipart/form-data", produces = "multipart/form-data")
	public void uploadCover(@RequestParam("cover") MultipartFile cover, @RequestParam("id") long id) throws IllegalStateException, IOException {
		imageUploadService.uploadCover(cover, id);
	}

	@PostMapping(value = "/uploadContents", consumes = "multipart/form-data", produces = "multipart/form-data")
	public void uploadContents(@RequestParam("contents") MultipartFile contents, @RequestParam("id") long id) throws IllegalStateException, IOException {
		imageUploadService.uploadContents(contents, id);
	}
	
}
