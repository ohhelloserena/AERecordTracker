package com.duke.Entity;

import java.util.Date;

public class record {

    private Integer id;
    private Integer AttrId;
    private Integer RecordId;
    private String Value;
    private String title;
    private String number;
    private int scheduleId;
    private int typeId;
    private int stateId;
    private int containerId;
    private int locationId;
    private java.sql.Date createdAt;
    private java.sql.Date updatedAt;
    private java.sql.Date closedAt;
    private String consignmentCode;
    //private String recordStateName;



    public record(int id, int AttrId, int RecordId, String Value, String title, String number, int scheduleId, int typeId, int stateId, int containerId, int locationId, java.sql.Date createdAt, java.sql.Date updatedAt, java.sql.Date closedAt, String consignmentCode, String recordStateName){
        this.id= id;
        this.AttrId = AttrId;
        this.RecordId=RecordId;
        this.Value = Value;
        this.title = title;
        this.number = number;
        this.scheduleId = scheduleId;
        this.typeId = typeId;
        this.stateId = stateId;
        this.containerId = containerId;
        this.locationId = locationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.consignmentCode = consignmentCode;
        //this.recordStateName = recordStateName;
    }

    // default constructor
    public record(){};

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAttrId() {
        return AttrId;
    }

    public void setAttrId(Integer attrId) {
        AttrId = attrId;
    }

    public Integer getRecordId() {
        return RecordId;
    }

    public void setRecordId(Integer recordId) {
        RecordId = recordId;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }



    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    /*
    public int getScheduleId() {
        return scheduleId;
    }
    */

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    /*
    public int getTypeId() {
        return typeId;
    }
    */

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    /*
    public int getStateId() {
        return stateId;
    }
    */

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    /*
    public int getContainerId() {
        return containerId;
    }
    */

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    /*
    public int getLocationId() {
        return locationId;
    }
    */

    public void setCreatedAt(java.sql.Date createdAt) {
        this.createdAt = createdAt;
    }

    /*
    public java.sql.Date getCreatedAt() {
        return createdAt;
    }
    */

    public void setUpdatedAt(java.sql.Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /*
    public java.sql.Date getUpdatedAt() {
        return updatedAt;
    }
    */

    public void setClosedAt(java.sql.Date closedAt) {
        this.closedAt = closedAt;
    }

    /*
    public java.sql.Date getClosedAt() {
        return closedAt;
    }
    */

    public void setConsignmentCode(String consignmentCode) {
        this.consignmentCode = consignmentCode;
    }

    /*
    public String getConsignmentCode() {
        return consignmentCode;
    }
    */



    /*
    public void setRecordStateName(String recordStateName) {
        this.recordStateName = recordStateName;
    }
    */
}
