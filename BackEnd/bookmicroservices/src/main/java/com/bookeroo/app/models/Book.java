package com.bookeroo.app.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({
    "id",
    "title"
})

public class Book {

    @JsonProperty("id")
    private long id;
    @JsonProperty("title")
    private String title;

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

    @JsonProperty("id")
    public long getId() {
        return id;
    }

    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("id")
    public void setId(long id) {
        this.id = id;
    }
}
