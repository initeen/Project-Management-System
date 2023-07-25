package com.springboot.project.management.controller;

import java.util.List;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.project.management.model.User;
import com.springboot.project.management.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Autowired 
	private UserRepository userRepository;


	//create user rest api
	@PostMapping("/user")
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
	//create login authentification
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String emailId = credentials.get("emailId");
        String password = credentials.get("password");

        // Fetch user from the database based on the username
//        User user = userRepository.findByemailId(emailId);
        
        // Check if the user exists and the password matches
//        if (user != null && user.getPassword().equals(password)) {
//            return ResponseEntity.ok("Login successful!");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//        List<User> users = userRepository.findAll();        
//
//        User findUser = null;
//        for(User user : users ) {
//        	if (user.getEmailId().equals(emailId) && user.getPassword().equals(password)) {
//        		findUser=user;
//        	}
//        }
//        System.out.println(findUser);
//        if (findUser == null) {
//        	 Map<String, String> errorResponse = new HashMap<>();
//             errorResponse.put("error", "Invalid credentials");
//             errorResponse.put("message", "The username or password you provided is incorrect. Please try again.");
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//    
//        }
//        return ResponseEntity.ok(findUser);

        User user = userRepository.findByEmailAndPassword(emailId, password);  
        System.out.println(user);
        if (user == null) {
       	 Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");
            errorResponse.put("message", "The username or password you provided is incorrect. Please try again.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
   
       }
        user.setPassword(null);
        Map<String, String> successResponse = new HashMap<>();
        	successResponse.put("success", "true");
        	successResponse.put("message", "Valid user");
        
        	return ResponseEntity.status(HttpStatus.OK).body(successResponse);
        
    }
	
	@PostMapping("/logout")
    public String logout(@RequestBody User user) {
        // Implement logout logic here, such as clearing session data or invalidating the session.
        // For example, if using Spring Security, you can invalidate the session as follows:
        // SecurityContextHolder.clearContext();
        // request.getSession().invalidate();

		
		
        return "Logged out successfully!";
    }
	  
}
