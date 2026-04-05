package com.finance.app.controller;

import com.finance.app.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId) {
        return ResponseEntity.ok(analyticsService.getFinancialSummary(userId));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Map<String, Object>>> getCategoryTotals(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId) {
        return ResponseEntity.ok(analyticsService.getCategoryTotals(userId));
    }

    @GetMapping("/chart")
    public ResponseEntity<Map<String, Object>> getChartData(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId) {
        return ResponseEntity.ok(analyticsService.getChartData(userId));
    }
}
