

package com.duke.controller;

import com.duke.Dao.recordDao;
import com.duke.Entity.record;
//import com.sun.org.apache.xpath.internal.operations.String;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.ModelMap;

@RestController
@RequestMapping("/records")
public class GetController {

  @Autowired
private recordDao RecordDao;

/*
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

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.ModelMap;


@RestController
@RequestMapping("/records")
public class GetController {


    @Autowired
    private recordDao RecordDao;

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public String getinitialpage() {
//        return "first page here";
//    }

*/

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public java.lang.String getAllrecords() {
        System.out.println("In GetController...In getAllrecords()");
        JSONObject obj = new JSONObject();

        List<record> results = RecordDao.getRecordById();
        obj.put("results", results);
        System.out.println("Search results: " + obj.toString());
        return obj.toString();
    }




    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/title", method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByTitle(@RequestBody String params) {
        System.out.print("this SearchRecordsByTitle respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String liketitle= "%"+jsonObj.getString("title")+"%";
        String likeNumber= "%"+jsonObj.getString("Number")+"%";

        List<record> results=RecordDao.SearchRecordsByTitle(liketitle,likeNumber);
        obj.put("results", results);
        System.out.println("Search results: " + obj.toString());
        return obj.toString();
    }

    /**
     * POST request to search by ConsignmentCode
     *
     * /records/consignmentCode
     *
     * Input ex: { "consignmentCode": "445810223" }
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/consignmentCode/",
            method = RequestMethod.POST,
            consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByConsignmentCode(@RequestBody String params) {
        System.out.print("this SearchRecordsByConsignmentCode respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeConsignment= jsonObj.getString("consignmentCode");

        List<record> results=RecordDao.SearchRecordsByConsignmentCode(likeConsignment);
        obj.put("results", results);
        System.out.println("consignmentCode results: " + obj.toString());
        return obj.toString();
    }

    /**
     * POST request to search by record number.
     *
     * /records/number
     *
     * Input ex: {"number": "EDM-2003/031"}
     *
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/number",
            method = RequestMethod.POST,
            consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String SearchRecordsByRecordNumber(@RequestBody String params) {
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeNumber= jsonObj.getString("number");

        List<record> results=RecordDao.SearchRecordsByRecordNumber(likeNumber);
        obj.put("results", results);
        System.out.println("Search results: " + obj.toString());
        return obj.toString();
    }

    /**
     * GET request to search the notes of a record.
     *
     * /records/notes?text=text
     *
     * Input ex: {text: "Molestiae cum"}
     *
     * @param text
     * @return
     */

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public java.lang.String SearchRecordsByNotes(@RequestParam(value="text") String text) {
        System.out.print("GET request to search notes, text is " + '%' + text + '%');
        return RecordDao.SearchRecordsByNotes("\'%" + text + "%\'").toString();
    }



}

