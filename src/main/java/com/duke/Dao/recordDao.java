package com.duke.Dao;

import com.duke.Entity.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import javax.xml.stream.Location;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
                java.util.Date createdDate = resultSet.getDate("CreatedAt");
                java.util.Date updatedDate = resultSet.getDate("UpdatedAt");
                java.util.Date closedDate = resultSet.getDate("ClosedAt");
                records.setCreatedAt(new java.sql.Timestamp(createdDate.getTime()));
                records.setUpdatedAt(new java.sql.Timestamp(updatedDate.getTime()));
                records.setClosedAt(new java.sql.Timestamp(closedDate.getTime()));
                System.out.print(records);
                return records;
            }
        }, likeExpression, Number);
        return Record;
    }

    /**
     * Search by ConsignmentCode.
     *
     * Returns all rows of records, location.Name (location_name), notes.Text (notes), and cutomattributevalues.Value (client_name)
     *
     * @param consignmentCode
     * @return
     */

    public List<record> SearchRecordsByConsignmentCode(String consignmentCode) {
        final String sql = "SELECT records.*, COALESCE(locations.Name, 'NA') AS location_name, COALESCE(notes.Text, 'NA') AS notes, COALESCE(customattributevalues.Value, 'NA') AS client_name FROM recordr.records INNER JOIN locations ON locations.Id = records.LocationId LEFT JOIN notes ON notes.RowId=records.Id AND notes.TableId = 26 LEFT JOIN customattributevalues ON customattributevalues.RecordId = records.Id AND customattributevalues.AttrId = 9 WHERE records.ConsignmentCode = ?";

        final List<record> recordList = jdbcTemplate.query(sql, new ResultSetExtractor<List<record>>() {

            @Override
            public List<record> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<record> list = new ArrayList<record>();

                while (resultSet.next()) {

                    record l = new record();

                    //from records table
                    l.setId(resultSet.getInt("records.Id"));
                    l.setNumber(resultSet.getString("records.Number"));
                    l.setTitle(resultSet.getString("records.Title"));
                    l.setScheduleId(resultSet.getInt("records.ScheduleId"));
                    l.setTypeId(resultSet.getInt("records.TypeId"));
                    l.setConsignmentCode(resultSet.getString("records.ConsignmentCode"));
                    l.setStateId(resultSet.getInt("records.StateId"));
                    l.setContainerId(resultSet.getInt("records.ContainerId"));
                    l.setLocationId(resultSet.getInt("records.LocationId"));
                    java.util.Date createdDate = resultSet.getDate("records.CreatedAt");
                    java.util.Date updatedDate = resultSet.getDate("records.UpdatedAt");
                    java.util.Date closedDate = resultSet.getDate("records.ClosedAt");
                    l.setCreatedAt(new java.sql.Timestamp(createdDate.getTime()));
                    l.setUpdatedAt(new java.sql.Timestamp(updatedDate.getTime()));
                    l.setClosedAt(new java.sql.Timestamp(closedDate.getTime()));

                    l.setLocationName(resultSet.getString("location_name"));
                    l.setNotesText(resultSet.getString("notes"));
                    l.setClientName(resultSet.getString("client_name"));

                    list.add(l);
                }

                System.out.println(list);
                return list;
            }
        }, consignmentCode);
        return recordList;
    }


    /**
     * Full text search on notes.
     * Joins records and notes, then selects those whose notes.text contains text
     * TODO: combine chunks
     * TODO: implement a rowmapper that is not ugly (potentially portable to other functions in this file)
     *
     * @param text - the text search
     * @return
     */
    public JSONObject SearchRecordsByNotes(String text) {
        return jdbcTemplate.query("select records.*, notes.Chunk, notes.Text from notes INNER JOIN records ON notes.RowId=records.Id where notes.TableId = 26 AND notes.Text LIKE " + text, new ResultSetExtractor<JSONObject>() {
            @Override
            public JSONObject extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<noteSearch> arr = new ArrayList<noteSearch>();
                int lastid = -1;
                int lastChunk = -2;
                int index = 0;
                while(resultSet.next())
                {
                    if(resultSet.getInt("Id") == lastid && lastChunk + 1 == resultSet.getInt("Chunk"))
                    {
                        //Additional pieces of the same note
                        noteSearch old = arr.get(index);
                        old.Text = old.Text.concat(resultSet.getString("Text"));
                        arr.set(index, old);
                        lastChunk++;
                        index++;
                        continue;
                    }
                    lastChunk = 0;
                    noteSearch note = new noteSearch();
                    note.Id = resultSet.getInt("Id");
                    lastid = note.Id;
                    note.Number = resultSet.getString("Number");
                    note.Title = resultSet.getString("Title");
                    note.ScheduleId = resultSet.getInt("ScheduleId");
                    note.TypeId = resultSet.getInt("TypeId");
                    note.ConsignmentCode = resultSet.getString("ConsignmentCode");
                    note.StateId = resultSet.getInt("StateId");
                    note.ContainerId = resultSet.getInt("ContainerId");
                    note.LocationId = resultSet.getInt("LocationId");
                    note.CreatedAt = resultSet.getDate("CreatedAt");
                    note.UpdatedAt = resultSet.getDate("UpdatedAt");
                    note.ClosedAt = resultSet.getDate("ClosedAt");
                    note.Text = resultSet.getString("Text");
                    arr.add(note);
                    index++;
                }
                JSONObject out = new JSONObject();
                out.put("results", arr);
                return out;
            }
        });
    }

    /**
     * Returns the location name of a record given record's Id.
     *
     * Inner join on locations and records tables.
     *
     * @param RecordId Id from records table
     * @return
     */


    public List<Locations> GetRecordLocationForRecord(String RecordId) {
        final String sql = "SELECT locations.Name FROM locations INNER JOIN records on locations.Id = records.LocationId WHERE records.id = ?";

        final List<Locations> locationsList = jdbcTemplate.query(sql, new ResultSetExtractor<List<Locations>>() {

            @Override
            public List<Locations> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<Locations> list = new ArrayList<Locations>();

                while (resultSet.next()) {
                    Locations l = new Locations();
                    l.setName(resultSet.getString("locations.Name"));
                    list.add(l);
                }

                System.out.println(list);
                return list;
            }
        }, RecordId);
        return locationsList;
    }

    /**
     * Returns all columns from customattributevalues for customattributevalues == 7 and the given record ID.
     *
     * Inner join on customattributevalues and records tables
     *
     * @param RecordId Id from records table
     * @return
     */

    public List<CustomAttributeValues> GetCustAttrValByRecordId(String RecordId) {
        //final String sql = "SELECT customattributevalues.*, notes.Text FROM customattributevalues INNER JOIN records ON customattributevalues.RecordId = records.Id INNER JOIN notes ON customattributevalues.RecordId = notes.RowId WHERE records.id = ? ";

        final String sql = "SELECT * FROM customattributevalues INNER JOIN records ON customattributevalues.RecordId = records.Id WHERE customattributevalues.AttrId = 7 AND records.id = ? ";
        final List<CustomAttributeValues> queryList = jdbcTemplate.query(sql, new ResultSetExtractor<List<CustomAttributeValues>>() {

            @Override
            public List<CustomAttributeValues> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<CustomAttributeValues> list = new ArrayList<CustomAttributeValues>();


                while (resultSet.next()) {
                    CustomAttributeValues obj = new CustomAttributeValues();

                    obj.setId(resultSet.getInt("customattributevalues.Id"));
                    obj.setAttrId(resultSet.getInt("customattributevalues.AttrId"));
                    obj.setRecordId(resultSet.getInt("customattributevalues.RecordId"));
                    obj.setValue(resultSet.getString("customattributevalues.Value"));

                    list.add(obj);
                }
                System.out.println(list);
                return list;
            }
        }, RecordId);
        return queryList;
    }

    /**
     * Returns recordclassifications.RecordId, classifications.Name and recordclassifications.Ordinal for the given record id.
     *
     * @param RecordId
     * @return
     */
    public List<Classifications> GetClassPath(String RecordId) {
        final String sql = "SELECT recordclassifications.RecordId, recordclassifications.Ordinal, classifications.Name FROM classifications  INNER JOIN recordclassifications ON classifications.Id = recordclassifications.ClassId  WHERE recordclassifications.RecordId = ? ORDER BY recordclassifications.Ordinal ASC";

        final List<Classifications> queryList = jdbcTemplate.query(sql, new ResultSetExtractor<List<Classifications>>() {

            @Override
            public List<Classifications> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<Classifications> list = new ArrayList<Classifications>();

                while (resultSet.next()) {
                    Classifications obj = new Classifications();

                    obj.setRecordId(resultSet.getInt("recordclassifications.RecordId"));
                    obj.setOrdinal(resultSet.getInt("recordclassifications.Ordinal"));
                    obj.setName(resultSet.getString("classifications.Name"));

                    list.add(obj);
                }
                System.out.println(list);
                return list;
            }
        }, RecordId);
        return queryList;
    }



    /**
     * Search for record by record number.
     *
     * Returns all rows of records, location.Name (location_name), notes.Text (notes), and cutomattributevalues.Value (client_name)
     *
     * @param recordNumber - records.Number
     * @return
     */


    public List<record> SearchByRecordNumber(String recordNumber) {
        final String sql = "SELECT records.*, COALESCE(locations.Name, 'NA') AS location_name, COALESCE(notes.Text, 'NA') AS notes, COALESCE(customattributevalues.Value, 'NA') AS client_name FROM recordr.records INNER JOIN locations ON locations.Id = records.LocationId LEFT JOIN notes ON notes.RowId=records.Id AND notes.TableId = 26 LEFT JOIN customattributevalues ON customattributevalues.RecordId = records.Id AND customattributevalues.AttrId = 9 WHERE records.Number = ?";


        final List<record> recordList = jdbcTemplate.query(sql, new ResultSetExtractor<List<record>>() {

            @Override
            public List<record> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
                List<record> list = new ArrayList<record>();

                while (resultSet.next()) {
                    record l = new record();

                    //from records table
                    l.setId(resultSet.getInt("records.Id"));
                    l.setNumber(resultSet.getString("records.Number"));
                    l.setTitle(resultSet.getString("records.Title"));
                    l.setScheduleId(resultSet.getInt("records.ScheduleId"));
                    l.setTypeId(resultSet.getInt("records.TypeId"));
                    l.setConsignmentCode(resultSet.getString("records.ConsignmentCode"));
                    l.setStateId(resultSet.getInt("records.StateId"));
                    l.setContainerId(resultSet.getInt("records.ContainerId"));
                    l.setLocationId(resultSet.getInt("records.LocationId"));
                    java.util.Date createdDate = resultSet.getDate("records.CreatedAt");
                    java.util.Date updatedDate = resultSet.getDate("records.UpdatedAt");
                    java.util.Date closedDate = resultSet.getDate("records.ClosedAt");
                    l.setCreatedAt(new java.sql.Timestamp(createdDate.getTime()));
                    l.setUpdatedAt(new java.sql.Timestamp(updatedDate.getTime()));
                    l.setClosedAt(new java.sql.Timestamp(closedDate.getTime()));

                    l.setLocationName(resultSet.getString("location_name"));
                    l.setNotesText(resultSet.getString("notes"));
                    l.setClientName(resultSet.getString("client_name"));

                    list.add(l);
                }

                System.out.println(list);
                return list;
            }
        }, recordNumber);
        return recordList;
    }













}