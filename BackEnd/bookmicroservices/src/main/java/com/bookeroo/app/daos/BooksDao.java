package com.bookeroo.app.daos;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import com.bookeroo.app.models.Book;
import com.bookeroo.mapper.BookMapper;

/*  
 *  @Repository instructs spring boot that this class is a repository or
 *  is intended to handle exceptions with behaviour similar to a repo.
*/  
@Repository
public class BooksDao {
    
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

    public List<Book> getBooks() {
        String query = "select * from books;";
        
        return jdbcTemplate.query(query, new BookMapper());
    }

    public Book saveBook(Book book) {
        // Adds book to database
        String query = "insert into `books`(`id`,`title`) values(?, ?)";
        jdbcTemplate.update(query, book.getId(), book.getTitle());

        // Asks database to return the book we just added so that we may have the correct id
        // Since the id is autoincremented by the database
        String query2 = "SELECT * FROM `books` WHERE `title`= ?;";
        return jdbcTemplate.queryForObject(query2, new BookMapper(), book.getTitle());
    }

}
