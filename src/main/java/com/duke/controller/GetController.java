package com.duke.controller;


import com.duke.Dao.recordDao;
import com.duke.Entity.record;
//import com.sun.org.apache.xpath.internal.operations.String;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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



    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/title", method = RequestMethod.GET,consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByTitle(@RequestBody String params) {
        System.out.print("this SearchRecordsByTitle respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String liketitle= "%"+jsonObj.getString("title")+"%";
        String likeNumber= "%"+jsonObj.getString("Number")+"%";

        List<record> results=RecordDao.SearchRecordsByTitle(liketitle,likeNumber);
        obj.put("results", results);
        return obj.toString();
    }

    /**
     * GET request to search by ConsignmentCode
     *
     * /records/ConsignmentCode
     *
     * Input ex: {consignmentCode: "445810223"}
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/consignmentCode", method = RequestMethod.GET,consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByConsignmentCode(@RequestBody String params) {
        System.out.print("this SearchRecordsByConsignmentCode respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeConsignment= jsonObj.getString("consignmentCode");

        List<record> results=RecordDao.SearchRecordsByConsignmentCode(likeConsignment);
        obj.put("results", results);
        return obj.toString();
    }

    /**
     * GET request to search by record number.
     *
     * /records/number
     *
     * Input ex: {number: "EDM-2003/031"}
     *
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/number", method = RequestMethod.GET,consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByRecordNumber(@RequestBody String params) {
        System.out.print("this SearchRecordsByRecordNumber respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeNumber= jsonObj.getString("number");

        List<record> results=RecordDao.SearchRecordsByRecordNumber(likeNumber);
        obj.put("results", results);
        return obj.toString();
    }



    @CrossOrigin
    //@RequestMapping(value = "/allrec", method = RequestMethod.GET)
    @RequestMapping("/allrec")
    @ResponseBody
    public java.lang.String handlerAllRecs() {
        System.out.print("Get All Recs called.");
        JSONObject obj = new JSONObject();

        List<record> results = RecordDao.getAllRec();
        obj.put("results", results);
        return obj.toString();
    }

}

