package com.duke.Dao;

import com.duke.Entity.record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * recordDao class gets data from the MySQL database.
 */


@Repository
public class recordDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<record> getRecordById(){
        final String sql = "SELECT Id,AttrId,RecordId,Value  FROM customattributevalues LIMIT 0,5";
        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException{
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

    /**
     *
     * @param cCode - {string} The consignment code to be searched.
     * @return
     */
    public List<record> getRecordbyConsignmentCode(java.lang.String cCode){
        //final String sql = "SELECT recordr.records.ConsignmentCode, recordr.records.Number, recordr.records.Title, recordr.recordstates.Name, recordr.records.CreatedAt, recordr.records.UpdatedAt, recordr.records.ClosedAt  FROM recordr.records, recordr.recordstates WHERE recordr.records.StateId = recordr.recordstates.Id AND recordr.records.ConsignmentCode = "580531982";";

        final String sql = "SELECT recordr.records.ConsignmentCode, recordr.records.Number, recordr.records.Title, recordr.recordstates.Name FROM recordr.records, recordr.recordstates WHERE recordr.records.StateId = recordr.recordstates.Id AND recordr.records.ConsignmentCode =" + cCode;

        List<record> Record = jdbcTemplate.query(sql, new RowMapper<record>() {
            public record mapRow(ResultSet resultSet, int Id) throws SQLException{
                record records = new record();
                records.setConsignmentCode(resultSet.getString("ConsignmentCode"));
                records.setRecordNumber(resultSet.getString("Number"));
                records.setRecordTitle(resultSet.getString("Title"));
                records.setRecordStateName(resultSet.getString("Name"));
                System.out.print(records);
                return records;
            }
        });
        return Record;

    }



}