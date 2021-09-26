package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

public class RequestResponse {
    
    @NotBlank(message = "Token cannot be blank")
    private String token;
    private long id;
    private boolean accept;

    public String getToken() {
        return token;
    }

    public long getId() {
        return id;
    }

    public boolean getAccept() {
        return accept;
    }
}
