package com.rmit.sept.bk_loginservices.model;

public class Seller {
    private Long id;

    
    private String fullName;

    public String getFullName(){
        return fullName;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
