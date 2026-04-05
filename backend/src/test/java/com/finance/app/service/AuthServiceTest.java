package com.finance.app.service;

import com.finance.app.model.User;
import com.finance.app.repository.UserRepository;
import com.finance.app.util.AppUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_Success() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        User registered = authService.register(user);

        assertNotNull(registered.getAvatar()); // Check default avatar logic
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_EmailExists_Throws() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        assertThrows(RuntimeException.class, () -> authService.register(user));
    }

    @Test
    void login_Success() {
        String password = "password";
        String hashed = AppUtils.hashPassword(password);
        
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword(hashed);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        User loggedIn = authService.login("test@example.com", password);
        assertEquals("test@example.com", loggedIn.getEmail());
    }

    @Test
    void login_UserNotFound_Throws() {
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> authService.login("e", "p"));
    }

    @Test
    void login_WrongPassword_Throws() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("correct_hash");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class, () -> authService.login("test@example.com", "wrong_pass"));
    }
}
