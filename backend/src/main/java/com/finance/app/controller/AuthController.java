package com.finance.app.controller;

import com.finance.app.model.User;
import com.finance.app.service.AuthService;
import com.finance.app.util.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User newUser = authService.register(user);
            Map<String, Object> response = new HashMap<>();
            response.put("token", AppUtils.generateToken());
            response.put("user", newUser);
            return ResponseEntity.status(201).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");
            User user = authService.login(email, password);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", AppUtils.generateToken());
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        // Mock implementation
        return ResponseEntity.ok(Map.of("message", "Password reset email sent"));
    }
}
