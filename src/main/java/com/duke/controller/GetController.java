package com.duke.controller;


import com.duke.Dao.recordDao;
import com.duke.Entity.record;
import com.sun.org.apache.xpath.internal.operations.String;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/records")
public class GetController {


    @Autowired
    private recordDao RecordDao;

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public String getinitialpage() {
//        return "first page here";
//    }


/*

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public java.lang.String getAllrecords() {
        System.out.print("this respond happened");
        JSONObject obj = new JSONObject();

        List<record> results = RecordDao.getRecordById();
        obj.put("results", results);
        return obj.toString();
    }
    */


    /**
     * GET request
     * URI: /records?consignmentCode=<xyz>
     *
     * @return
     */

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public java.lang.String handlerRecordsByConsignment(@RequestParam("consignmentCode") String cCode) {
        System.out.print("this respond happened");
        JSONObject obj = new JSONObject();

        List<record> results = RecordDao.getRecordbyConsignmentCode(java.lang.String.valueOf(cCode));
        obj.put("results", results);
        return obj.toString();
    }

}

