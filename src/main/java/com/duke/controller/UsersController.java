package com.duke.controller;

import com.duke.Dao.UsersDao;
import com.duke.Entity.*;
import org.json.HTTP;
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
@RequestMapping("/users")

public class UsersController {

    @Autowired
    private UsersDao usersDao;

    /**
     * POST request to get user's user, role, and location info by UserId.
     *
     * /users/User
     *
     * Input ex: { "UserId": "reichertb" }
     */

    @CrossOrigin
    @ResponseBody
    @RequestMapping(
            value = "/User",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )

    public ResponseEntity<String> SearchUserbyUserId(@RequestBody String params) {
        try {

            System.out.println("in SearchUserbyUserId()");

            JSONObject obj = new JSONObject();
            JSONObject jsonObj = new JSONObject(params);
            String userId = jsonObj.getString("UserId");

            List<Users> results = usersDao.getUserByUserId(userId);

            if (results.size() < 1) {
                // no results found
                // return 404
                return new ResponseEntity<String>("404  No results found", HttpStatus.NOT_FOUND);
            } else {
                // results found
                obj.put("results", results);
                return new ResponseEntity<String>(obj.toString(), HttpStatus.OK);

            }
        } catch (Exception ex) {
            String errorMessage = ex + " error";
            return new ResponseEntity<String>(errorMessage, HttpStatus.BAD_REQUEST);
        }
    }
}
