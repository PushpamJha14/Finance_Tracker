package com.finance.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.app.model.User;
import com.finance.app.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getProfile() throws Exception {
        when(userService.getUserProfile(eq("1"))).thenReturn(new User());

        mockMvc.perform(get("/api/user/profile").header("X-User-Id", "1"))
                .andExpect(status().isOk());
    }

    @Test
    void updateProfile() throws Exception {
        User u = new User();
        u.setName("Updated");
        when(userService.updateUserProfile(eq("1"), any())).thenReturn(u);

        mockMvc.perform(put("/api/user/profile")
                .header("X-User-Id", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(u)))
                .andExpect(status().isOk());
    }
}
