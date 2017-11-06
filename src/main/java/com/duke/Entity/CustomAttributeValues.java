package com.duke.Entity;

/**
 *
 * For recordr.customattributevalues table
 */

public class CustomAttributeValues {
    private int id;
    private int AttrId;
    private int RecordId;
    private String Value;

    public CustomAttributeValues(int id, int attrId, int recordId, String value) {
        this.id = id;
        AttrId = attrId;
        RecordId = recordId;
        Value = value;
    }

    // default constructor
    public CustomAttributeValues() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAttrId() {
        return AttrId;
    }

    public void setAttrId(int attrId) {
        AttrId = attrId;
    }

    public int getRecordId() {
        return RecordId;
    }

    public void setRecordId(int recordId) {
        RecordId = recordId;
    }

    public String getValue() {
        return Value;
    }

    public void setValue(String value) {
        Value = value;
    }
}
