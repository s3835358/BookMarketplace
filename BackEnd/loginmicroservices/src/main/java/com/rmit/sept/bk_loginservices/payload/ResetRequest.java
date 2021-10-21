package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

public class RequestResponse {
    
    @NotBlank(message = "Token cannot be blank")
    private String token;
    private long id;
    private String password;

    public String getToken() {
        return token;
    }

    public long getId() {
        return id;
    }

    public boolean getPassword() {
        return password;
    }
}
