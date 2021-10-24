package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

public class ResetRequest {
    
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

    public String getPassword() {
        return password;
    }
}
