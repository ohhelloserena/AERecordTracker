package com.duke.controller;


import com.duke.Dao.recordDao;
import com.duke.Entity.*;
//import com.sun.org.apache.xpath.internal.operations.String;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.sql.*;

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


    // TEST RESPONSE
    @CrossOrigin
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public java.lang.String getTestRecords() {
        System.out.print("Getting test JSON..");
        JSONObject obj = new JSONObject();

        record record1 = new record();
        record1.setId(51);
        record1.setNumber("EDM-2003/001");
        record1.setTitle("Laboriosam at sapiente temporibus");
        record1.setScheduleId(26);
        record1.setTypeId(3);
        record1.setConsignmentCode("DESTRUCTION CERTIFICATE 2009-01");
        record1.setStateId(6);
        record1.setContainerId(24365);
        record1.setLocationId(5);
        record1.setCreatedAt(Timestamp.valueOf("2003-09-15 18:52:36.000000"));
        record1.setUpdatedAt(Timestamp.valueOf("2009-03-26 20:44:09.000000"));
        record1.setClosedAt(Timestamp.valueOf("2003-12-31 14:48:45.000000"));

        record record2 = new record();
        record2.setId(52);
        record2.setNumber("EDM-2003/002");
        record2.setTitle("Consequatur voluptas soluta in incidunt omnis praesentium illum beatae in voluptate adipisci ipsum accusamus id est");
        record2.setScheduleId(408);
        record2.setTypeId(3);
        record2.setConsignmentCode("DESTRUCTION CERTIFICATE 2007-001");
        record2.setStateId(6);
        record2.setContainerId(0);
        record2.setLocationId(5);
        record2.setCreatedAt(Timestamp.valueOf("2003-09-15 19:11:48.000000"));
        record2.setUpdatedAt(Timestamp.valueOf("2008-04-22 19:02:18.000000"));
        record2.setClosedAt(Timestamp.valueOf("2003-12-31 14:48:45.000000"));

        record record3 = new record();
        record3.setId(53);
        record3.setNumber("EDM-2003/003");
        record3.setTitle("Expedita ea recusandae culpa tempore");
        record3.setScheduleId(345);
        record3.setTypeId(3);
        record3.setConsignmentCode("DESTRUCTION CERTIFICATE 2007-001");
        record3.setStateId(6);
        record3.setContainerId(0);
        record3.setLocationId(5);
        record3.setCreatedAt(Timestamp.valueOf("2003-09-15 19:27:10.000000"));
        record3.setUpdatedAt(Timestamp.valueOf("2008-04-22 19:02:42.000000"));
        record3.setClosedAt(Timestamp.valueOf("2003-12-31 14:48:45.000000"));

        record record4 = new record();
        record4.setId(54);
        record4.setNumber("EDM-2003/004");
        record4.setTitle("Veniam incidunt mollitia repudiandae et velit delectus eveniet voluptatem ipsam fugiat neque corrupti ut");
        record4.setScheduleId(398);
        record4.setTypeId(3);
        record4.setConsignmentCode("DESCRUCTION CERTIFICATE 2007-001");
        record4.setStateId(6);
        record4.setContainerId(0);
        record4.setLocationId(5);
        record4.setCreatedAt(Timestamp.valueOf("2003-09-15 19:32:10.000000"));
        record4.setUpdatedAt(Timestamp.valueOf("2008-04-22 19:02:59.000000"));
        record4.setClosedAt(Timestamp.valueOf("2003-12-31 14:48:45.000000"));

        record record5 = new record();
        record5.setId(55);
        record5.setNumber("EDM-2003/005");
        record5.setTitle("Temporibus eos");
        record5.setScheduleId(97);
        record5.setTypeId(3);
        record5.setConsignmentCode("DESTRUCTION CERTIFICATE 2007-001");
        record5.setStateId(6);
        record5.setContainerId(0);
        record5.setLocationId(5);
        record5.setCreatedAt(Timestamp.valueOf("2003-09-15 19:35:42.000000"));
        record5.setUpdatedAt(Timestamp.valueOf("2008-04-22 19:03:18.000000"));
        record5.setClosedAt(Timestamp.valueOf("2003-12-31 14:48:45.000000"));


        List<record> results = new ArrayList<record>();
        results.add(record1);
        results.add(record2);
        results.add(record3);
        results.add(record4);
        results.add(record5);


        obj.put("results", results);
        System.out.print(obj.toString());
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
        return obj.toString();
    }

    /**
     * POST request to search by ConsignmentCode
     *
     * /records/consignmentCode
     *
     * Input ex: {"consignmentCode": "445810223"}
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/consignmentCode",
            method = RequestMethod.POST,
            consumes= MediaType.APPLICATION_JSON_VALUE
    )
    public java.lang.String SearchRecordsByConsignmentCode(@RequestBody String params) {
        System.out.print("this SearchRecordsByConsignmentCode respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeConsignment= jsonObj.getString("consignmentCode");

        List<record> results=RecordDao.SearchRecordsByConsignmentCode(likeConsignment);
        obj.put("results", results);
        return obj.toString();

        // DO NOT DELETE:

        /*

            if (results.size() < 1) {
                // no results found
                // return 404
                return new ResponseEntity<>("404  No results found", HttpStatus.NOT_FOUND);
            } else {
                // results found
                // return 200
                obj.put("results", results);
                return new ResponseEntity<>(obj.toString(), HttpStatus.OK);
            }
        } catch (Exception ex) {
            // return 400
            String errorMessage = ex + " error";
            return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
        }
        */
    }

    /**
     * POST request to search by record number.
     *
     * /records/number
     *
     * Input ex: {"number": "20035916.00.C.03.06~02"}
     *
     * TODO: exception handling
     *
     * @param params
     * @return
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/number",
            method = RequestMethod.POST,
            consumes= MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> SearchRecordsByRecordNumber(@RequestBody String params) {
        try {
        System.out.println("In SearchRecordsByRecordNumber");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeNumber = jsonObj.getString("Number");
        likeNumber = likeNumber.replaceAll("\\s", "");

        List<record> results = RecordDao.SearchByRecordNumber(likeNumber);

        //obj.put("results", results);
        //return obj.toString();

            if (results.size() < 1) {
                // no results found
                // return 404
                return new ResponseEntity<String>("404  No results found", HttpStatus.NOT_FOUND);
            } else {
                // results found
                // return 200
                obj.put("results", results);
                return new ResponseEntity<String>(obj.toString(), HttpStatus.OK);
            }
        } catch (Exception ex) {
            // return 404
            String errorMessage = ex + " error";
            return new ResponseEntity<String>(errorMessage, HttpStatus.BAD_REQUEST);

        }

    }

    /**
     * GET request to search the notes of a record.
     *
     * /records/notes?text=text
     *
     * Input ex: {"text": "Molestiae cum"}
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


    /**
     * POST request to get classifications.Name and recordclassifications.Ordinal for given record id.
     *
     * Used to get record's classification path.
     *
     * /records/ClassificationPath
     *
     * Input ex: { "RecordId": "252" }
     *
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/ClassificationPath",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )

    public java.lang.String SearchRecordClassPath(@RequestBody String params) {
        System.out.println("in SearchRecordClassPath()");

        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String likeRecordId = jsonObj.getString("RecordId");

        List<Classifications> results = RecordDao.GetClassPath(likeRecordId);
        obj.put("results", results);
        return obj.toString();
    }

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/fulltext", method = RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public java.lang.String FullText(@RequestBody String params) {
        System.out.print("this SearchRecordsByTitle respond happened");
        JSONObject obj = new JSONObject();
        JSONObject jsonObj = new JSONObject(params);
        String keyword= jsonObj.getString("keyword");
        Integer page= jsonObj.getInt("page");
        Integer pageSize= jsonObj.getInt("pageSize");

        List<JSONObject> results=RecordDao.FullTextSearch(keyword, page, pageSize);
        obj.put("results", results);
        return obj.toString();
    }

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/dropdownlocation", method = RequestMethod.GET)
    public java.lang.String GetAllLocations() {
        System.out.print("this GetAllLocation function called");

        JSONObject obj = new JSONObject();
        List<JSONObject> results=RecordDao.GetAllLocation();
        obj.put("results", results);
        return obj.toString();
    }

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/dropdownclass", method = RequestMethod.GET)
    public java.lang.String GetAllClassifictions() {
        System.out.print("this GetAllClassification function called");

        JSONObject obj = new JSONObject();
        List<JSONObject> results=RecordDao.GetAllclassifications();
        obj.put("results", results);
        return obj.toString();
    }

    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/dropdownstate", method = RequestMethod.GET)
    public java.lang.String GetAllstates() {
        System.out.print("this GetAllstates function called");

        JSONObject obj = new JSONObject();
        List<JSONObject> results=RecordDao.GetAllstates();
        obj.put("results", results);
        return obj.toString();
    }
    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/dropdowntype", method = RequestMethod.GET)
    public java.lang.String GetAlltypes() {
        System.out.print("this GetAlltypes function called");

        JSONObject obj = new JSONObject();
        List<JSONObject> results=RecordDao.GetAllTypes();
        obj.put("results", results);
        return obj.toString();
    }
    @CrossOrigin
    @ResponseBody @RequestMapping(value = "/dropdownsched", method = RequestMethod.GET)
    public java.lang.String GetAllscheds() {
        System.out.print("this GetAllscheds function called");

        JSONObject obj = new JSONObject();
        List<JSONObject> results=RecordDao.GetAllschedules();
        obj.put("results", results);
        return obj.toString();
    }


}
