package com.duke.Entity;

import java.sql.Timestamp;

public class Classifications {

    // columns from recordr.classifications
    private int Id;
    private String Name;
    private String KeyWord;
    private java.sql.Timestamp UpdatedAt;


    // columns from recordr.recordclassifications
    private int RecordId;
    private int ClassId;
    private int Ordinal;

    public Classifications(int id, String name, String keyWord, Timestamp updatedAt, int recordId, int classId, int ordinal) {
        Id = id;
        Name = name;
        KeyWord = keyWord;
        UpdatedAt = updatedAt;
        RecordId = recordId;
        ClassId = classId;
        Ordinal = ordinal;
    }

    // default constructor
    public Classifications() {}

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getKeyWord() {
        return KeyWord;
    }

    public void setKeyWord(String keyWord) {
        KeyWord = keyWord;
    }

    public Timestamp getUpdatedAt() {
        return UpdatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        UpdatedAt = updatedAt;
    }

    public int getRecordId() {
        return RecordId;
    }

    public void setRecordId(int recordId) {
        RecordId = recordId;
    }

    public int getClassId() {
        return ClassId;
    }

    public void setClassId(int classId) {
        ClassId = classId;
    }

    public int getOrdinal() {
        return Ordinal;
    }

    public void setOrdinal(int ordinal) {
        Ordinal = ordinal;
    }
}
