package com.bookeroo.app.daos;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

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

}
