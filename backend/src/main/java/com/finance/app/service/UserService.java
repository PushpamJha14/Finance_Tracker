package com.finance.app.service;

import com.finance.app.model.User;
import com.finance.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUserProfile(String userId, User updatedUser) {
        User user = getUserProfile(userId);
        if (updatedUser.getName() != null) user.setName(updatedUser.getName());
        if (updatedUser.getAvatar() != null) user.setAvatar(updatedUser.getAvatar());
        return userRepository.save(user);
    }
}
