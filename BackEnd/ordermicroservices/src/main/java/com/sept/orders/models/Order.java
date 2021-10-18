package com.sept.orders.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Date;
import java.sql.Timestamp;

public class Order {

    @JsonProperty("id")
    private long id;
    @JsonProperty("seller_id")
    private long seller_id;
    @JsonProperty("buyer_id")
    private long buyer_id;
    @JsonProperty("qty")
    private String qty;
    @JsonProperty("price")
    private String price;
    @JsonProperty("book_id")
    private long book_id;
    @JsonProperty("book_title")
    private String book_title;
    @JsonProperty("ordered_at")
    private Timestamp ordered_at;

    public Order() {
    }

    @JsonProperty("id")
    public long getId() {
        return id;
    }

    @JsonProperty("seller_id")
    public long getSellerId() {
        return seller_id;
    }
    @JsonProperty("buyer_id")
    public long getBuyerId() {
        return buyer_id;
    }
    @JsonProperty("qty")
    public String getQty() {
        return qty;
    }
    @JsonProperty("price")
    public String getPrice() {
        return price;
    }

    @JsonProperty("book_id")
    public long getBookId() {
        return book_id;
    }

    @JsonProperty("book_title")
    public String getBookTitle() {
        return book_title;
    }

    @JsonProperty("ordered_at")
    public Timestamp getOrderedAt() {
        return ordered_at;
    }

    @JsonProperty("id")
    public void setId(long id) {
        this.id = id;
    }

    @JsonProperty("seller_id")
    public void setSellerId(long seller_id) {
        this.seller_id = seller_id;
    }

    @JsonProperty("buyer_id")
    public void setBuyerId(long buyer_id) {
        this.buyer_id = buyer_id;
    }

    @JsonProperty("qty")
    public void setQty(String qty) {
        this.qty = qty;
    }

    @JsonProperty("price")
    public void setPrice(String price) {
        this.price = price;
    }

    @JsonProperty("book_id")
    public void setBookId(long book_id) {
        this.book_id = book_id;
    }

    @JsonProperty("book_title")
    public void setBookTitle(String book_title) {
        this.book_title = book_title;
    }

    @JsonProperty("ordered_at")
    public void setOrderedAt(Timestamp ordered_at) {
        this.ordered_at = ordered_at;
    }
}
