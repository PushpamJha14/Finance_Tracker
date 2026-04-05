package com.finance.app.service;

import com.finance.app.model.Transaction;

import com.finance.app.repository.TransactionRepository;
import com.finance.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TransactionService transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getTransactions_Filtered() {
        transactionService.getTransactions("uid", "expense");
        verify(transactionRepository).findByUserIdAndTypeOrderByDateDesc("uid", "expense");
    }

    @Test
    void getTransactions_All() {
        transactionService.getTransactions("uid", null);
        verify(transactionRepository).findByUserIdOrderByDateDesc("uid");
    }

    @Test
    void addTransaction_Success() {
        when(userRepository.existsById("uid")).thenReturn(true);
        when(transactionRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        Transaction t = new Transaction();
        Transaction saved = transactionService.addTransaction("uid", t);

        assertEquals("uid", saved.getUserId());
        assertNotNull(saved.getDate()); // Check default date logic
    }

    @Test
    void addTransaction_UserNotFound() {
        when(userRepository.existsById("uid")).thenReturn(false);
        assertThrows(RuntimeException.class, () -> transactionService.addTransaction("uid", new Transaction()));
    }

    @Test
    void deleteTransaction() {
        transactionService.deleteTransaction("tid");
        verify(transactionRepository).deleteById("tid");
    }
}
