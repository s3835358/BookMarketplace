package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

public class Token {
    
    @NotBlank(message = "Token cannot be blank")
    private String token;

    public String getToken() {
        return token;
    }

}
