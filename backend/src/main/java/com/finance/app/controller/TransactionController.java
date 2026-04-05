package com.finance.app.controller;

import com.finance.app.model.Transaction;
import com.finance.app.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // For simplicity, we pass userId in header or param since we don't have full security context
    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId,
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(transactionService.getTransactions(userId, type));
    }

    @PostMapping
    public ResponseEntity<Transaction> addTransaction(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId,
            @RequestBody Transaction transaction) {
        return ResponseEntity.status(201).body(transactionService.addTransaction(userId, transaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
