package com.duke.Entity;

import java.util.Date;

public class record {

    private Integer id;
    private Integer AttrId;
    private Integer RecordId;
    private String Value;
    private String consignmentCode;
    private String recordNumber;
    private String recordTitle;
    private String recordStateName;
    private Date recordCreatedAt;
    private Date recordClosedAt;
    private Date recordUpdatedAt;

    public record(int id, int AttrId, int RecordId, String Value, String consignmentCode, String recordNumber, String recordTitle, String recordStateName, Date recordCreatedAt, Date recordClosedAt, Date recordUpdatedAt){
        this.id= id;
        this.AttrId = AttrId;
        this.RecordId=RecordId;
        this.Value = Value;
        this.consignmentCode = consignmentCode;
        this.recordNumber = recordNumber;
        this.recordTitle = recordTitle;
        this.recordStateName = recordStateName;
        this.recordCreatedAt = recordCreatedAt;
        this.recordClosedAt = recordClosedAt;
        this.recordUpdatedAt = recordUpdatedAt;
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

    public String getRecordNumber() {
        return recordNumber;
    }

    public void setRecordNumber(String recordNumber) {
        this.recordNumber = recordNumber;
    }

    public String getRecordTitle() {
        return recordTitle;
    }

    public void setRecordTitle(String recordTitle) {
        this.recordTitle = recordTitle;
    }

    public String getRecordStateName() {
        return recordStateName;
    }

    public void setRecordStateName(String recordStateName) {
        this.recordStateName = recordStateName;
    }

    public Date getRecordCreatedAt() {
        return recordCreatedAt;
    }

    public void setRecordCreatedAt(Date recordCreatedAt) {
        this.recordCreatedAt = recordCreatedAt;
    }

    public Date getRecordClosedAt() {
        return recordClosedAt;
    }

    public void setRecordClosedAt(Date recordClosedAt) {
        this.recordClosedAt = recordClosedAt;
    }

    public Date getRecordUpdatedAt() {
        return recordUpdatedAt;
    }

    public void setRecordUpdatedAt(Date recordUpdatedAt) {
        this.recordUpdatedAt = recordUpdatedAt;
    }

    public String getConsignmentCode() {
        return consignmentCode;
    }

    public void setConsignmentCode(String consignmentCode) {
        this.consignmentCode = consignmentCode;
    }
}
