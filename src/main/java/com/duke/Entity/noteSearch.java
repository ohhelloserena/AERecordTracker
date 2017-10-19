package com.duke.Entity;

import java.sql.Date;

public class noteSearch {
    public int Id;
    public String Number;
    public String Title;
    public int ScheduleId;
    public int TypeId;
    public String ConsignmentCode;
    public int StateId;
    public int ContainerId;
    public int LocationId;
    public Date CreatedAt;
    public Date UpdatedAt;
    public Date ClosedAt;
    public String Text;

    public noteSearch(){}

    //Can't avoid getters, to enable JSONObject.put
    public int getId() {
        return Id;
    }

    public String getNumber() {
        return Number;
    }

    public String getTitle() {
        return Title;
    }

    public int getScheduleId() {
        return ScheduleId;
    }

    public int getTypeId() {
        return TypeId;
    }

    public String getConsignmentCode() {
        return ConsignmentCode;
    }

    public int getStateId() {
        return StateId;
    }

    public int getContainerId() {
        return ContainerId;
    }

    public int getLocationId() {
        return LocationId;
    }

    public Date getCreatedAt() {
        return CreatedAt;
    }

    public Date getUpdatedAt() {
        return UpdatedAt;
    }

    public Date getClosedAt() {
        return ClosedAt;
    }

    public String getText() {
        return Text;
    }
}