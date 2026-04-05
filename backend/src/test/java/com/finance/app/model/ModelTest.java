package com.finance.app.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

class ModelTest {

    @Test
    void testUser() {
        User u1 = new User("1", "Name", "email", "pass", "avatar");
        User u2 = new User();
        u2.setId("1");
        u2.setName("Name");
        u2.setEmail("email");
        u2.setPassword("pass");
        u2.setAvatar("avatar");

        assertEquals(u1, u2);
        assertEquals(u1.hashCode(), u2.hashCode());
        assertEquals(u1.toString(), u2.toString());

        assertEquals("1", u1.getId());
        assertEquals("Name", u1.getName());
        assertEquals("email", u1.getEmail());
        assertEquals("pass", u1.getPassword());
        assertEquals("avatar", u1.getAvatar());
    }

    @Test
    void testTransaction() {
        LocalDate date = LocalDate.now();
        Transaction t1 = new Transaction("1", "Title", 10.0, date, "Cat", "Type", "scan", "user123");
        Transaction t2 = new Transaction();
        t2.setId("1");
        t2.setTitle("Title");
        t2.setAmount(10.0);
        t2.setDate(date);
        t2.setCategory("Cat");
        t2.setType("Type");
        t2.setIcon("scan");
        t2.setUserId("user123");

        assertEquals(t1, t2);
        assertEquals(t1.hashCode(), t2.hashCode());
        assertEquals(t1.toString(), t2.toString());

        assertEquals("1", t1.getId());
        assertEquals("Title", t1.getTitle());
        assertEquals(10.0, t1.getAmount());
        assertEquals(date, t1.getDate());
        assertEquals("Cat", t1.getCategory());
        assertEquals("Type", t1.getType());
        assertEquals("scan", t1.getIcon());
        assertEquals("user123", t1.getUserId());
    }
}
