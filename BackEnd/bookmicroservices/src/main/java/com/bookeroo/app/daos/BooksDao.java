package com.bookeroo.app.daos;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.bookeroo.app.models.Book;
import com.bookeroo.app.models.Review;
import com.bookeroo.mapper.BookMapper;
import com.bookeroo.mapper.ReviewMapper;


/*  
 *  @Repository instructs spring boot that this class is a repository or
 *  is intended to handle exceptions with behaviour similar to a repo.
*/  
@Repository
public class BooksDao {
    
    final int ADDED = 1;

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
    public List<String> getBookTitles() {
        String query = "select title from books;";
        return jdbcTemplate.queryForList(query, String.class);
    }

    // Returns a list of every book in the db
    public List<Book> getBooks() {
        String query = "select * from books;";
        
        return jdbcTemplate.query(query, new BookMapper());
    }

    // Add book
    public Book saveBook(Book book) {
        // Adds book to database
        String query = "insert into `books`(`id`,`title`,`author`,`publisher`,`isbn`,";
        query += "`year`, `category`, `shop`, `qty`, `price`, `condition`, `user`) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        jdbcTemplate.update(query, book.getId(), book.getTitle(), book.getAuthor(), 
        book.getpublisher(), book.getIsbn(), book.getYear(), book.getCategory(), book.getShop(), 
        book.getQty(), book.getPrice(), book.getCondition(), book.getUser());

        // Asks database to return the book we just added so that we may have the correct id
        // Since the id is autoincremented by the database
        String query2 = "SELECT * FROM `books` WHERE `title`= ?;";
        return jdbcTemplate.queryForObject(query2, new BookMapper(), book.getTitle());
    }

    // Edit book
    public Book updateBook(Book book) {
        String query = "update `books` set `id` = ?, `title` = ?, `author` = ?, `publisher` = ?,";
        query+= "`isbn` = ?,`year` = ?, `category` = ?, `shop` = ?, `qty` = ?, `price` = ?, `condition` = ?, `user` = ?  where `id` = ?;";
        
        jdbcTemplate.update(query, book.getId(), book.getTitle(), book.getAuthor(), book.getpublisher(), 
        book.getIsbn(), book.getYear(), book.getCategory(), book.getShop(), book.getQty(), book.getPrice(),
        book.getCondition(), book.getUser(), book.getId());
       
        return book;
    }

    // Decrement quantity when book is sold
    public Book bookSold(Book book) {
        String query = "update `books` set `qty` = ? where `id` = ?;";
        int qty = Integer.parseInt(book.getQty()) - 1;
        jdbcTemplate.update(query, qty, book.getId());

        String query2 = "SELECT * FROM `books` WHERE `id`= ?;";
        return jdbcTemplate.queryForObject(query2, new BookMapper(), book.getId());
    }

    public boolean addReview(Review review) {
        
        String query = "insert into `reviews`(`book_id`,`user_id`,`content`, `user_name`) values(?, ?, ?,?);";
        boolean updated = false;

        if(jdbcTemplate.update(query, review.getBookId(), review.getUserId(), review.getContent(), review.getUserName()) == ADDED) {
            updated = true;
        }
        
        return updated;
    }

    public List<Review> getReviews(Long book_id) {

        String query1 = "SELECT * FROM `reviews` WHERE `book_id`= ?;";
        
        return jdbcTemplate.query(query1, new ReviewMapper(), book_id);
    }

}
