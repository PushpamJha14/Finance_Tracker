package com.finance.app.service;

import com.finance.app.model.Transaction;

import com.finance.app.repository.TransactionRepository;
import com.finance.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Transaction> getTransactions(String userId, String type) {
        if (type != null && !type.isEmpty()) {
            return transactionRepository.findByUserIdAndTypeOrderByDateDesc(userId, type);
        }
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }

    public Transaction addTransaction(String userId, Transaction transaction) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        transaction.setUserId(userId);
        if (transaction.getDate() == null) {
            transaction.setDate(LocalDate.now());
        }
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(String id) {
        transactionRepository.deleteById(id);
    }
}
