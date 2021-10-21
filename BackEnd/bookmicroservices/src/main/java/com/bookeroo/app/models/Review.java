package com.bookeroo.app.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Review {
    @JsonProperty("id")
    private long id;
    @JsonProperty("user_id")
    private long user_id;
    @JsonProperty("book_id")
    private long book_id;
    @JsonProperty("content")
    private String content;
    @JsonProperty("user_name")
    private String user_name
    ;

    @JsonProperty("id")
    public Long getId() {
        return id;
    }
    @JsonProperty("user_id")
    public Long getUserId() {
        return user_id;
    }
    @JsonProperty("book_id")
    public Long getBookId() {
        return book_id;
    }
    @JsonProperty("content")
    public String getContent() {
        return content;
    }
    @JsonProperty("user_name")
    public String getUserName() {
        return user_name;
    }

    @JsonProperty("id")
    public void setId(Long id) {
        this.id = id;
    }
    @JsonProperty("user_id")
    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }
    @JsonProperty("book_id")
    public void setBookId(Long book_id) {
        this.book_id = book_id;
    }
    @JsonProperty("content")
    public void setContent(String content) {
        this.content = content;
    }
    @JsonProperty("user_name")
    public void setUserName(String user_name) {
        this.user_name = user_name;
    }
    
}
