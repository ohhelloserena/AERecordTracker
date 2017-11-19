package com.duke.Dao;

import com.duke.Entity.*;
import com.sun.org.apache.xerces.internal.xs.datatypes.ObjectList;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;


import javax.xml.stream.Location;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class UsersDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    /**
     * Return  user's user, role, and location info by UserId.
     *
     * @param userId
     * @return
     */
    public List<Users> getUserByUserId(String userId) {
        final String sql = "SELECT  users.*, coalesce(roles.Id, '-1') AS rolesId, coalesce(roles.Name, 'NA') AS rolesName, coalesce(locations.Id, '-1') AS locationsId, coalesce(locations.Name, 'NA') AS locationsName, coalesce(locations.Code, 'NA') AS locationsCode FROM users LEFT JOIN userroles ON userroles.UserId = users.Id LEFT JOIN roles ON userroles.RoleId = roles.Id LEFT JOIN userlocations ON userlocations.UserId = users.Id LEFT JOIN locations ON userlocations.LocationId = locations.Id WHERE users.UserId = ?";

        final List<Users> usersList = jdbcTemplate.query(sql, new ResultSetExtractor<List<Users>>() {

            @Override
            public List<Users> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<Users> list = new ArrayList<Users>();

                while (resultSet.next()) {
                    Users u = new Users();
                    u.setId(resultSet.getInt("users.Id"));
                    u.setUserId(resultSet.getString("users.UserId"));
                    u.setFirstName(resultSet.getString("users.FirstName"));
                    u.setLastName(resultSet.getString("users.LastName"));
                    u.setRolesId(resultSet.getInt("rolesId"));
                    u.setRolesName(resultSet.getString("rolesName"));
                    u.setLocationId(resultSet.getInt("locationsId"));
                    u.setLocationName(resultSet.getString("locationsName"));
                    u.setLocationCode(resultSet.getString("locationsCode"));

                    list.add(u);
                }

                System.out.println(list);
                return list;
            }
        }, userId);
        return usersList;
    }

}
