package com.finance.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finance.app.model.Transaction;
import com.finance.app.service.TransactionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TransactionController.class)
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getTransactions() throws Exception {
        when(transactionService.getTransactions(eq("1"), any()))
            .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/transactions")
                .header("X-User-Id", "1"))
                .andExpect(status().isOk());
    }

    @Test
    void addTransaction() throws Exception {
        Transaction t = new Transaction();
        t.setTitle("New T");
        when(transactionService.addTransaction(eq("1"), any())).thenReturn(t);

        mockMvc.perform(post("/api/transactions")
                .header("X-User-Id", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(t)))
                .andExpect(status().isCreated());
    }

    @Test
    void deleteTransaction() throws Exception {
        mockMvc.perform(delete("/api/transactions/1"))
                .andExpect(status().isOk());
    }
}
