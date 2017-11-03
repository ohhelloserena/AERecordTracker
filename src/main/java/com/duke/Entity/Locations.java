package com.duke.Entity;

/**
 * For recordr.locations table
 */

public class Locations {
    private int Id;
    private String Name;
    private String Code;


    public Locations(int id, String name, String code) {
        this.Id = id;
        this.Name = name;
        this.Code = code;
    }

    // default constructor
    public Locations() {
    }


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

    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }
}
