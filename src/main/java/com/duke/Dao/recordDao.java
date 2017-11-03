package com.duke.Dao;

import com.duke.Entity.Locations;
import com.duke.Entity.noteSearch;
import com.duke.Entity.record;
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
                java.util.Date createdDate = resultSet.getDate("CreatedAt");
                java.util.Date updatedDate = resultSet.getDate("UpdatedAt");
                java.util.Date closedDate = resultSet.getDate("ClosedAt");
                records.setCreatedAt(new java.sql.Timestamp(createdDate.getTime()));
                records.setUpdatedAt(new java.sql.Timestamp(updatedDate.getTime()));
                records.setClosedAt(new java.sql.Timestamp(closedDate.getTime()));
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
                java.util.Date createdDate = resultSet.getDate("CreatedAt");
                java.util.Date updatedDate = resultSet.getDate("UpdatedAt");
                java.util.Date closedDate = resultSet.getDate("ClosedAt");
                records.setCreatedAt(new java.sql.Timestamp(createdDate.getTime()));
                records.setUpdatedAt(new java.sql.Timestamp(updatedDate.getTime()));
                records.setClosedAt(new java.sql.Timestamp(closedDate.getTime()));
                System.out.print(records);
                return records;
            }
        }, number);
        return Record;
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
     * @param RecordId from record table
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


}