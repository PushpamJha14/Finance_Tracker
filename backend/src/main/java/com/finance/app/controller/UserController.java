package com.finance.app.controller;

import com.finance.app.model.User;
import com.finance.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId) {
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId,
            @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUserProfile(userId, user));
    }
}
