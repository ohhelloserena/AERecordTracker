package com.duke.test;

import com.duke.Dao.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class RecordDaoTest {
    private recordDao testRecordDao;

    @BeforeEach
    public void runBefore() {
        testRecordDao = new recordDao();
    }

    @Test
    public void testGetRecordVolume() {

    }

}
