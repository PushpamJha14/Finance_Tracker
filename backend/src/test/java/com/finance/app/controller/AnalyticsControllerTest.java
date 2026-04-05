package com.finance.app.controller;

import com.finance.app.service.AnalyticsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnalyticsController.class)
class AnalyticsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnalyticsService analyticsService;

    @Test
    void getSummary() throws Exception {
        when(analyticsService.getFinancialSummary(eq("1"))).thenReturn(Map.of("balance", 100.0));
        
        mockMvc.perform(get("/api/analytics/summary").header("X-User-Id", "1"))
                .andExpect(status().isOk());
    }

    @Test
    void getCategoryTotals() throws Exception {
        when(analyticsService.getCategoryTotals(eq("1"))).thenReturn(Collections.emptyList());
        
        mockMvc.perform(get("/api/analytics/categories").header("X-User-Id", "1"))
                .andExpect(status().isOk());
    }

    @Test
    void getChartData() throws Exception {
        mockMvc.perform(get("/api/analytics/chart"))
                .andExpect(status().isOk());
    }
}
