# AE Record Tracker

AE Record Tracker is a record-management web app that was made to help Associated Engineering (AE) manage and retrieve paper files from their file rooms and/or offsite storage. 

## Motivation 

Associated Engineering (AE) has a legacy system called TRIM, which is a full document management system used to manage their paper records. The system is outdated with regard to business need and technology; the company no longer requires a full document management system and TRIM presents technology issues such as operating system and driver support. 

## Features

* 3 levels of user permissions: Regular User, Record Management Coordinator, and Administrator.
* Quick search by an ID or code.
* Full text search by a variety of IDs, codes, titles, and/or notes. Partial search inputs are allowed. Results can be filtered by Record Type, Location, Classification, Dates, Record State, and/or Retention Schedules.
* Record type specific search by a variety of IDs, codes, titles, and/or notes. Partial search inputs are accepted. Results can be filtered by Function, Project Manager/Proposal Manager, and/or Client Name.
* Create PDF labels to put on records and boxes of records.
* Create PDF reports for records contained in boxes.
* CRUD interface to manage types of user permissions. 
* CRUD interface to manage AE office locations.

## User Documentation

See here: https://github.com/ohhelloserena/AERecordTracker/blob/master/UserDocumentation_TeamAvengers.pdf 

## Installation Steps

1. `git clone https://github.com/ohhelloserena/AERecordTracker.git`
2. `cd React_Full_Project`
3. `npm uninstall webpack-dev-server`
4. `npm install -D webpack-dev-server@2.7.1`
5. `npm install`
6. `npm install axios`
7. Start Spring backend. Currently done through IntelliJ's run, TODO: launch through terminal/script
8. `npm start`

## Configuration/Release

1. Assuming Linux backend, install Java JRE and Node package manager. JDK is necessary to compile backend JAR once with builtin database connection properties.
2. Replace url, username, password at `/src/main/java/resources` with those for the database server
3. Replace the variable server at the top of files (`React_Full_Project/src/containers/Full/Full.js` and `React_Full_Project/src/views/Dashboard/Dashboard.js`) with the external IP address and port of backend server (server running JAR). For example, `127.0.0.1:8080`
4. Run `setup.sh` to compile both backend server and frontend server.
5. Current user needs to have permissions to open externally-accessible ports. Sudo works but is not recommended due to security risks.
6. Sample script for starting both servers, start.sh have been provided. IP addresses and ports for the backend server will need to be replaced.

## Development Build Environment Tools

Front-End:
* Languages: HTML5, CSS2, Javascript
* Framework: React v15.0, Bootstrap v4.0.0
* IDE: Webstorm 2016.3.2
* Development Environment: JDK 7+

Back-end:
* Language: Java 7
* Framework: Spring 4.2.0
* IDE: IntelliJ IDEA Ultimate 2.017
* Development environment: JDK 7+

Database:
* RDBMS: MySQL Community Server v5.7.19
* RDBMS software: MySQ: Workbench 6.3
* Amazon Web Services, RDS

## Testing Build Environment Tools

Front-End:
* Operating systems: Windows 7, Windows 10
* Browsers: Internet Explorer 11, Chrome 59

Back-End: 
* RDBMS software: MySQL Workbench v6.3
* Test data: `RecordR-Data.sql`, `RecordR-Schema.sql`
* For HTTP requests: Postman v5.3.2 
* For stress testing of server: Apache JMeter v3.3
* For unit testing: JUnit 5  

## Team Members

* Serena Chen - back-end
* Wenyuan Du - back-end
* Jinmo Kim - front-end
* Paul Lam - front-end
* Vincent Tan - back-end

