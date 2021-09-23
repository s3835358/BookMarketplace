package com.bookeroo.app.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
    "id",
    "title",
    "author",
    "isbn",
    "publisher",
    "year"
})

public class Book {

    @JsonProperty("id")
    private long id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("author")
    private String author;
    @JsonProperty("isbn")
    private String isbn;
    @JsonProperty("publisher")
    private String publisher;
    // Format as 2015-02-15
    @JsonProperty("year")
    private String year;
    @JsonProperty("category")
    private String category;

    public Book() {
    }

    public Book(long id, String title) {
        this.id = id;
        this.title = title;
    }
    
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    @JsonProperty("author")
    public String getAuthor() {
        return author;
    }
    @JsonProperty("isbn")
    public String getIsbn() {
        return isbn;
    }
    @JsonProperty("year")
    public String getYear() {
        return year;
    }
    @JsonProperty("publisher")
    public String getpublisher() {
        return publisher;
    }

    @JsonProperty("id")
    public long getId() {
        return id;
    }

    @JsonProperty("category")
    public String getCategory() {
        return category;
    }

    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("id")
    public void setId(long id) {
        this.id = id;
    }

    @JsonProperty("author")
    public void setAuthor(String author) {
        this.author = author;
    }

    @JsonProperty("isbn")
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @JsonProperty("publisher")
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    @JsonProperty("year")
    public void setYear(String year) {
        this.year = year;
    }

    @JsonProperty("category")
    public void setCategory(String category) {
        this.category = category;
    }
}
