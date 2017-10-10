package com.duke.Entity;

public class record {

    private Integer id;
    private Integer AttrId;
    private Integer RecordId;
    private String Value;

    public record(int id, int AttrId, int RecordId, String Value){
        this.id= id;
        this.AttrId = AttrId;
        this.RecordId=RecordId;
        this.Value = Value;
    }

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


}
