package com.finance.app.service;

import com.finance.app.model.Transaction;
import com.finance.app.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AnalyticsServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private AnalyticsService analyticsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFinancialSummary_MathCheck() {
        Transaction t1 = new Transaction(); t1.setType("income"); t1.setAmount(100.0);
        Transaction t2 = new Transaction(); t2.setType("expense"); t2.setAmount(40.0);
        
        when(transactionRepository.findByUserIdOrderByDateDesc("uid"))
            .thenReturn(Arrays.asList(t1, t2));

        Map<String, Object> summary = analyticsService.getFinancialSummary("uid");
        
        assertEquals(60.0, summary.get("balance"));
        assertEquals(100.0, summary.get("totalIncome"));
        assertEquals(40.0, summary.get("totalExpenses"));
    }

    @Test
    void getCategoryTotals_Grouping() {
        Transaction t1 = new Transaction(); t1.setType("expense"); t1.setCategory("Food"); t1.setAmount(10.0);
        Transaction t2 = new Transaction(); t2.setType("expense"); t2.setCategory("Food"); t2.setAmount(20.0);
        Transaction t3 = new Transaction(); t3.setType("expense"); t3.setCategory("Travel"); t3.setAmount(50.0);
        Transaction t4 = new Transaction(); t4.setType("income"); t4.setCategory("Salary"); t4.setAmount(1000.0); // Should be ignored

        when(transactionRepository.findByUserIdOrderByDateDesc("uid"))
            .thenReturn(Arrays.asList(t1, t2, t3, t4));

        List<Map<String, Object>> totals = analyticsService.getCategoryTotals("uid");
        
        // Expect 2 categories: Food (30), Travel (50)
        assertEquals(2, totals.size());
        
        Map<String, Object> food = totals.stream().filter(m -> m.get("name").equals("Food")).findFirst().get();
        assertEquals(30.0, food.get("amount"));
    }
}
