package com.finance.app.service;

import com.finance.app.model.User;
import com.finance.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserProfile_Found() {
        when(userRepository.findById("uid")).thenReturn(Optional.of(new User()));
        assertNotNull(userService.getUserProfile("uid"));
    }

    @Test
    void getUserProfile_NotFound() {
        when(userRepository.findById("uid")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> userService.getUserProfile("uid"));
    }

    @Test
    void updateUserProfile() {
        User existing = new User();
        existing.setName("Old");
        
        when(userRepository.findById("uid")).thenReturn(Optional.of(existing));
        when(userRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        User update = new User();
        update.setName("New");
        
        User result = userService.updateUserProfile("uid", update);
        assertEquals("New", result.getName());
    }
}
