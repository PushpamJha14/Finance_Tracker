package com.finance.app.service;

import com.finance.app.model.User;
import com.finance.app.repository.UserRepository;
import com.finance.app.util.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        user.setPassword(AppUtils.hashPassword(user.getPassword()));
        // Provide default avatar if missing
        if (user.getAvatar() == null || user.getAvatar().isEmpty()) {
            user.setAvatar("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(AppUtils.hashPassword(password))) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
}
