package com.finance.app.service;

import com.finance.app.model.Transaction;
import com.finance.app.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

        @Autowired
        private TransactionRepository transactionRepository;

        public Map<String, Object> getFinancialSummary(String userId) {
                List<Transaction> transactions = transactionRepository.findByUserIdOrderByDateDesc(userId);

                double totalIncome = transactions.stream()
                                .filter(t -> "income".equals(t.getType()))
                                .mapToDouble(Transaction::getAmount)
                                .sum();

                double totalExpenses = transactions.stream()
                                .filter(t -> "expense".equals(t.getType()))
                                .mapToDouble(Transaction::getAmount)
                                .sum();

                Map<String, Object> summary = new HashMap<>();
                summary.put("balance", totalIncome - totalExpenses);
                summary.put("totalIncome", totalIncome);
                summary.put("totalExpenses", totalExpenses);
                return summary;
        }

        public List<Map<String, Object>> getCategoryTotals(String userId) {
                List<Transaction> transactions = transactionRepository.findByUserIdOrderByDateDesc(userId);

                Map<String, Double> totals = transactions.stream()
                                .filter(t -> "expense".equals(t.getType()))
                                .collect(Collectors.groupingBy(
                                                Transaction::getCategory,
                                                Collectors.summingDouble(Transaction::getAmount)));

                return totals.entrySet().stream()
                                .map(entry -> {
                                        Map<String, Object> map = new HashMap<>();
                                        map.put("name", entry.getKey());
                                        map.put("amount", entry.getValue());
                                        // Placeholder colors
                                        map.put("color", "#" + Integer.toHexString(entry.getKey().hashCode())
                                                        .substring(0, 6));
                                        return map;
                                })
                                .collect(Collectors.toList());
        }

        public Map<String, Object> getChartData(String userId) {
                LocalDate endDate = LocalDate.now();
                LocalDate startDate = endDate.minusMonths(5).withDayOfMonth(1); // Last 6 months including current

                List<Transaction> transactions = transactionRepository.findByUserIdAndDateBetweenOrderByDateDesc(
                                userId, startDate, endDate.plusDays(1));

                // Initialize maps for the last 6 months to ensure zero values for months with
                // no data
                Map<String, Double> incomeMap = new java.util.LinkedHashMap<>();
                Map<String, Double> expenseMap = new java.util.LinkedHashMap<>();

                java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("MMM");

                // Populate keys for last 6 months
                for (int i = 5; i >= 0; i--) {
                        LocalDate date = endDate.minusMonths(i);
                        String label = date.format(formatter);
                        incomeMap.put(label, 0.0);
                        expenseMap.put(label, 0.0);
                }

                // Aggregate data
                for (Transaction t : transactions) {
                        if (t.getDate() == null)
                                continue;
                        String label = t.getDate().format(formatter);
                        if (incomeMap.containsKey(label)) {
                                if ("income".equals(t.getType())) {
                                        incomeMap.put(label, incomeMap.get(label) + t.getAmount());
                                } else if ("expense".equals(t.getType())) {
                                        expenseMap.put(label, expenseMap.get(label) + t.getAmount());
                                }
                        }
                }

                Map<String, Object> result = new HashMap<>();
                result.put("labels", new java.util.ArrayList<>(incomeMap.keySet()));
                result.put("monthlyIncome", new java.util.ArrayList<>(incomeMap.values()));
                result.put("monthlyExpenses", new java.util.ArrayList<>(expenseMap.values()));

                return result;
        }
}
