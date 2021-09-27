package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.Seller;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.payload.RequestResponse;
import com.rmit.sept.bk_loginservices.payload.Token;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserRepository userRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        System.out.println("ManualErrReport " + errorMap);

        if(errorMap != null)return errorMap;
        
        User newUser = userService.saveUser(user);

        ResponseEntity<User> res =  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
        System.out.println("By me: " + res);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }


    @PostMapping(value = "/shopRequests", consumes ="application/json", produces = "application/json")
    public List<User> shopRequests(@RequestBody Token tokenBody){
        
        List<User> requests = null;
        String token = tokenBody.getToken();
        token = token.substring(TOKEN_PREFIX.length());
    
        if(tokenProvider.validateToken(token) && tokenProvider.isAdmin(token)) {
            requests = userRepository.shopRequests();
        }

        return requests;
    }

    @PostMapping(value = "/approveRejectShop", consumes ="application/json", produces = "application/json")
    public ResponseEntity<?> approveRejectShop(@RequestBody RequestResponse req){
        
        String token = req.getToken();
        token = token.substring(TOKEN_PREFIX.length());

        ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        boolean valid = tokenProvider.validateToken(token) && tokenProvider.isAdmin(token);
    
        if(valid) {
            userRepository.approveRejectShop(req.getId(), req.getAccept());
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        } 

        return responseEntity;
    }

    @PostMapping(value = "/getUsers", consumes ="application/json", produces = "application/json")
    public List<User> getUsers(@RequestBody Token tokenBody){
        
        List<User> users = null;
        String token = tokenBody.getToken();
        token = token.substring(TOKEN_PREFIX.length());
    
        if(tokenProvider.validateToken(token) && tokenProvider.isAdmin(token)) {
            users = userRepository.getUsers();
        }

        return users;
    }
    
    @PostMapping(value = "/editUser", consumes ="application/json", produces = "application/json")
    public ResponseEntity<?> editUser(@RequestBody User user){

                
        String token = user.getToken();
        token = token.substring(TOKEN_PREFIX.length());

        ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        boolean valid = tokenProvider.validateToken(token) && tokenProvider.isAdmin(token);
    
        if(valid) {
            userRepository.editUser(user);
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        } 

        return responseEntity;
    }

    @PostMapping(value = "/blockUser", consumes ="application/json", produces = "application/json")
    public ResponseEntity<?> blockUser(@RequestBody RequestResponse req){
        
        String token = req.getToken();
        token = token.substring(TOKEN_PREFIX.length());

        ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        boolean valid = tokenProvider.validateToken(token) && tokenProvider.isAdmin(token);
    
        if(valid) {
            userRepository.blockUser(req.getId());
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        } 

        return responseEntity;
    }

    
    @PostMapping(value = "/getBlacklist", consumes ="application/json", produces = "application/json")
    public List<User> getBlacklist(@RequestBody Token tokenBody){
        
        List<User> users = null;
        String token = tokenBody.getToken();
        token = token.substring(TOKEN_PREFIX.length());
    
        if(tokenProvider.validateToken(token) && tokenProvider.isAdmin(token)) {
            users = userRepository.getBlacklist();
        }

        return users;
    }

    @PostMapping(value = "/requestShop", consumes ="application/json", produces = "application/json")
    public ResponseEntity<?> requestShop(@RequestBody RequestResponse req){
        
        String token = req.getToken();
        token = token.substring(TOKEN_PREFIX.length());

        ResponseEntity<HttpStatus> responseEntity = ResponseEntity.ok(HttpStatus.BAD_REQUEST);
        boolean valid = tokenProvider.validateToken(token);
    
        if(valid) {
            userRepository.requestShop(tokenProvider.getUserIdFromJWT(token), req.getAbn(), req.getBusName());
            responseEntity = ResponseEntity.ok(HttpStatus.ACCEPTED);
        } 

        return responseEntity;
    }

    @GetMapping(value = "/getSellers", produces = "application/json")
    public List<Seller> getSellers() {
        
        List<Seller> sellers = userRepository.getSellers();
        
        return sellers;
    }

}