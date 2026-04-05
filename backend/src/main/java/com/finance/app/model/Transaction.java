package com.finance.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Document(collection = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String id;

    private String title;

    private Double amount;

    private LocalDate date;

    private String category;

    private String type; // income, expense

    private String icon;

    private String userId;
}
