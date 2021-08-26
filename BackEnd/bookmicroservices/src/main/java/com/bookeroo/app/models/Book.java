package com.bookeroo.app.models;

public class Book {

    private final long id;
    private final String name;

    public Book(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public long getID() {
        return id;
    }
}
