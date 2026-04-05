package com.finance.app.util;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.*;

class AppUtilsTest {

    @Test
    void hashPassword() {
        String hash = AppUtils.hashPassword("test");
        assertNotNull(hash);
        assertNotEquals("test", hash);
    }
    
    @Test
    void hashPassword_Consistent() {
        assertEquals(AppUtils.hashPassword("test"), AppUtils.hashPassword("test"));
        assertNotEquals(AppUtils.hashPassword("test"), AppUtils.hashPassword("other"));
    }

    @Test
    void generateToken() {
        String token = AppUtils.generateToken();
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }
    
    @Test
    void constructorTest() {
        // Just for coverage of utility class which implicitly has public constructor
        AppUtils utils = new AppUtils();
        assertNotNull(utils);
    }
}
