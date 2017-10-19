package com.duke.Dao;

import com.duke.Entity.record;
import com.sun.prism.impl.Disposer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.sql.*;
import java.util.*;
import java.util.logging.Logger;

/**
 * recordDao class gets data from the MySQL database.
 */


@Repository
public class recordDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<record> getRecordById() {
        final String sql = "SELECT Id,AttrId,RecordId,Value  FROM customattributevalues LIMIT 0,5";
        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException {
                record records = new record();
                records.setId(resultSet.getInt("Id"));
                records.setAttrId(resultSet.getInt("AttrId"));
                records.setRecordId(resultSet.getInt("RecordId"));
                records.setValue(resultSet.getString("Value"));
                System.out.print(records);
                return records;
            }
        });
        return Record;
    }

    public List<record> SearchRecordsByTitle(String title, String Number) {

        String likeExpression = "%" + title + "%";
        final String sql = "SELECT * FROM records WHERE Title Like ? AND Number Like ?  LIMIT 0,5";
        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException {
                record records = new record();
                records.setId(resultSet.getInt("Id"));
                records.setNumber(resultSet.getString("Number"));
                records.setTitle(resultSet.getString("Title"));
                records.setScheduleId(resultSet.getInt("ScheduleId"));
                records.setTypeId(resultSet.getInt("TypeId"));
                records.setConsignmentCode(resultSet.getString("ConsignmentCode"));
                records.setStateId(resultSet.getInt("StateId"));
                records.setContainerId(resultSet.getInt("ContainerId"));
                records.setLocationId(resultSet.getInt("LocationId"));
                records.setCreatedAt(resultSet.getDate("CreatedAt"));
                records.setUpdatedAt(resultSet.getDate("UpdatedAt"));
                records.setClosedAt(resultSet.getDate("ClosedAt"));
                System.out.print(records);
                return records;
            }
        }, title, Number);
        return Record;
    }

    /**
     * Search by ConsignmentCode.
     *
     * @param consignmentCode
     * @return
     */

    public List<record> SearchRecordsByConsignmentCode(String consignmentCode) {
        final String sql = "SELECT * FROM records WHERE ConsignmentCode = ?";
        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException {
                record records = new record();
                records.setId(resultSet.getInt("Id"));
                records.setNumber(resultSet.getString("Number"));
                records.setTitle(resultSet.getString("Title"));
                records.setScheduleId(resultSet.getInt("ScheduleId"));
                records.setTypeId(resultSet.getInt("TypeId"));
                records.setConsignmentCode(resultSet.getString("ConsignmentCode"));
                records.setStateId(resultSet.getInt("StateId"));
                records.setContainerId(resultSet.getInt("ContainerId"));
                records.setLocationId(resultSet.getInt("LocationId"));
                records.setCreatedAt(resultSet.getDate("CreatedAt"));
                records.setUpdatedAt(resultSet.getDate("UpdatedAt"));
                records.setClosedAt(resultSet.getDate("ClosedAt"));
                System.out.print(records);
                return records;
            }
        }, consignmentCode);
        return Record;
    }

    /**
     * Search by Record Number.
     *
     * @param number - the record number
     * @return
     */

    public List<record> SearchRecordsByRecordNumber(String number) {
        final String sql = "SELECT * FROM records WHERE Number = ?";
        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException {
                record records = new record();
                records.setId(resultSet.getInt("Id"));
                records.setNumber(resultSet.getString("Number"));
                records.setTitle(resultSet.getString("Title"));
                records.setScheduleId(resultSet.getInt("ScheduleId"));
                records.setTypeId(resultSet.getInt("TypeId"));
                records.setConsignmentCode(resultSet.getString("ConsignmentCode"));
                records.setStateId(resultSet.getInt("StateId"));
                records.setContainerId(resultSet.getInt("ContainerId"));
                records.setLocationId(resultSet.getInt("LocationId"));
                records.setCreatedAt(resultSet.getDate("CreatedAt"));
                records.setUpdatedAt(resultSet.getDate("UpdatedAt"));
                records.setClosedAt(resultSet.getDate("ClosedAt"));
                System.out.print(records);
                return records;
            }
        }, number);
        return Record;
    }


    //TESTING ONLY
    //Misnomer: returns first 50 records in recordstate
    //How to use: visit localhost:8080/records/allrecs. You get a JSON on your browser
    public List<record> getAllRec() {
        //final String sql = "SELECT recordr.records.ConsignmentCode, recordr.records.Number, recordr.records.Title, recordr.recordstates.Name, recordr.records.CreatedAt, recordr.records.UpdatedAt, recordr.records.ClosedAt  FROM recordr.records, recordr.recordstates WHERE recordr.records.StateId = recordr.recordstates.Id AND recordr.records.ConsignmentCode = "580531982";";

        final String sql = "SELECT recordr.records.ConsignmentCode, recordr.records.Number, recordr.records.Title, recordr.recordstates.Name from recordr.records, recordr.recordstates LIMIT 50";

        List<record> recs = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException {
                record records = new record();
                records.setConsignmentCode(resultSet.getString("ConsignmentCode"));
                records.setNumber(resultSet.getString("Number"));
                records.setTitle(resultSet.getString("Title"));
                records.setRecordStateName(resultSet.getString("Name"));
                System.out.print(records);
                return records;
            }
        });
        return recs;

    }
}

