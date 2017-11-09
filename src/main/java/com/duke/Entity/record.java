package com.duke.Entity;

import java.sql.Timestamp;

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
    private java.sql.Timestamp createdAt;
    private java.sql.Timestamp updatedAt;
    private java.sql.Timestamp closedAt;
    private String consignmentCode;
    private String recordStateName;
    private Boolean hasPrintedLabel;
    private Boolean hasPrintedEndTabLabel;


    private String locationName;    // for locations.Name
    private String notesText;       // for notes.Text
    private String clientName;      // for customattributevalues.Value




    public record(int id, int AttrId, int RecordId, String Value, String title, String number, int scheduleId, int typeId, int stateId, int containerId, int locationId, Timestamp createdAt, Timestamp updatedAt, Timestamp closedAt, String consignmentCode, String recordStateName, String locationName, String notesText, String clientName){
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
        this.recordStateName = recordStateName;
        this.locationName = locationName;
        this.notesText = notesText;
        this.clientName = clientName;
        this.hasPrintedLabel = false;
        this.hasPrintedEndTabLabel = false;
    }

    // default constructor
    public record(){
        this.hasPrintedLabel = false;
        this.hasPrintedEndTabLabel = false;
    };

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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(java.sql.Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setClosedAt(java.sql.Timestamp closedAt) {
        this.closedAt = closedAt;
    }

    public String getTitle() {
        return title;
    }

    public String getNumber() {
        return number;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public int getTypeId() {
        return typeId;
    }

    public int getStateId() {
        return stateId;
    }

    public int getContainerId() {
        return containerId;
    }

    public int getLocationId() {
        return locationId;
    }

    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public java.sql.Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public java.sql.Timestamp getClosedAt() {
        return closedAt;
    }

    public void setConsignmentCode(String consignmentCode) {
        this.consignmentCode = consignmentCode;
    }

    public String getConsignmentCode() {
        return consignmentCode;
    }

    public void setRecordStateName(String recordStateName) {
        this.recordStateName = recordStateName;
    }

    public Boolean getHasPrintedLabel() { return hasPrintedLabel; }

    public void setHasPrintedLabel(Boolean hasPrinted) { this.hasPrintedLabel = hasPrintedLabel; }

    public Boolean getHasPrintedEndTabLabel() { return hasPrintedEndTabLabel; }

    public void setHasPrintedEndTabLabel(Boolean hasPrintedEndTabLabel) { this.hasPrintedEndTabLabel = hasPrintedEndTabLabel; }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getNotesText() {
        return notesText;
    }

    public void setNotesText(String notesText) {
        this.notesText = notesText;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}