package com.duke.Entity;

import java.sql.Timestamp;

public class Container {

    private int id;
    private int number;
    private String title;
    private String consignmentCode;
    private java.sql.Timestamp createdAt;
    private java.sql.Timestamp updatedAt;


    public Container(int id, int number, String title, String consignmentCode, Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.number = number;
        this.title = title;
        this.consignmentCode = consignmentCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // default constructor
    public Container(){};

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getConsignmentCode() {
        return consignmentCode;
    }

    public void setConsignmentCode(String consignmentCode) {
        this.consignmentCode = consignmentCode;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}