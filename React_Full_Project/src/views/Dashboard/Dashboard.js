import React, {Component} from "react";
import axios from 'axios';
import * as ReactDOM from 'react-dom'
import {
    Badge,
    Button,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    CardFooter,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

function getDate(input)
{ //converts the JSON's string date into an array of ints, [year, month, day]
	return input.split("-", 3).map(function(x){
		return parseInt(x);
	});
}

function callFilter(row, index, arr)
{
	for (let criterion of this)
	{
		if (['typeId', 'locationId', 'stateId', 'classId'].indexOf(criterion.column) !== -1)
		{
			//EQ means only include those with value,
			//otherwise means exclude those with value
			if (criterion.type === "EQ")
			{
				if (criterion.value.indexOf(row[criterion.column]) === -1) return false;
			}
			else if (criterion.value.indexOf(row[criterion.column]) !== -1) return false;
		}
		else if (['updatedAt', 'createdAt', 'closedAt'].indexOf(criterion.column) !== -1)
		{
			let date = getDate(row[criterion.column]);
			switch (criterion.type)
			{
				case 'GT': //after this date
					if (date[0] < criterion.value[0] || date[1] < criterion.value[1] || date[2] < criterion.value[2]) return false;
					break;
				case 'EQ': //at this date (probably more like year)
					if (date[0] !== criterion.value[0] || date[1] !== criterion.value[1] || date[2] !== criterion.value[2]) return false;
					break;
				case 'LT': //after this date
					if (date[0] > criterion.value[0] || date[1] > criterion.value[1] || date[2] > criterion.value[2]) return false;
					break;
				default: //invalid comparator
					throw "filter::invalid comparator " + criterion.type;
			}
		}
	}
	return true;
}


//filterJSON takes two parameters
//input is an array of records
//criteria is an array of criterions
//each criterion has at least 3 elements
//column indicates which record column it operates on
//type is the comparator to use. GT, EQ, LT
//value is the value to compare to
function filterJSON(input, crit)
{
    if(input === null || input === undefined) return null;
	return input.filter(callFilter, crit);
}

var th;
var request = new XMLHttpRequest();

request.open('POST', 'http://127.0.0.1:8080/records/consignmentCode', false);
request.setRequestHeader("Content-type", "application/json");

//TODO: shouldn't get records on page load, it should be after user performs query
request.onload = function() {
    //TODO:Front-end must create UI for filters, parse filters to a JSON to pass to filter
	let comp = [{"column":"createdAt","type":"LT","value":[2009, 12, 31]}, {"column":"createdAt","type":"GT","value":[2005, 1, 1]}];
    if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        //th = data.results;
        //sample of how filtering would be done
        th = filterJSON(data.results, comp);
    } else {
        console.error('Response received and there was an error');
    }
};
request.onerror = function() {
    console.error('Request error');
};

var body = JSON.stringify({"consignmentCode": "DESTRUCTION CERTIFICATE 2009-01"});
request.send(body);

console.log("this is th");
console.log(th);


var sampleFilterParam = {"filter":[{"name":"locationId","type":"EQ","value":"5"},{"name":"year","type":"GT","value":"2005"}]};





//  PRINTING-----------------------------------------------------------------------------------


function onPrint(props) {

    var pdfConverter = require('jspdf');

    var doc = new pdfConverter('p','mm','letter');

    doc.setFontSize(22);
    doc.text(20, 50, 'Park Entry Ticket');
    doc.setFontSize(16);
    doc.save("test.pdf");
}








//  -------------------------------------------------------------------------------------------




class BoxRow extends React.Component {
    render() {
        const box = this.props.box;

        return (
            <tr>
                <th>BOX {box.id}</th>
                <th>{box.attrId}</th>
                <th>{box.recordId}</th>
                <th>{box.value}</th>
            </tr>
        );
    }
}


class RecordRow extends React.Component {
    constructor(props) {
        super(props);
        this.togglePrintOptions = this.togglePrintOptions.bind(this);
        this.printRecordLabel = this.printRecordLabel.bind(this);
        this.printEndTabLabel = this.printEndTabLabel.bind(this);
        this.state = {showPrintOptions: false};
    }

    printRecordLabel() {
        this.togglePrintOptions();
        this.pQueue.test();
    }

    printEndTabLabel() {
        this.togglePrintOptions();
    }

    togglePrintOptions() {
        this.setState({
            showPrintOptions: !this.state.showPrintOptions
        });
    }

    render() {
        const record = this.props.record;

        return (
            <tr>
                <th>RECORD {record.id}
                    <Dropdown isOpen={this.state.showPrintOptions} toggle={this.togglePrintOptions}>
                        <DropdownToggle className="nav-link dropdown-toggle">
                            <i className="fa fa-print"></i>
                        </DropdownToggle>
                        <DropdownMenu right className={this.state.showPrintOptions ? 'show' : ''}>
                            <DropdownItem>
                                <button onClick={this.printRecordLabel}>+ Record Label</button>
                            </DropdownItem>
                            <DropdownItem>
                                <button onClick={this.printEndTabLabel}>+ End Tab Label</button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </th>
                <th>{record.number}</th>
                <th>{record.consignmentCode}</th>
                <th>{record.title}</th>
                <th>{record.locationId}</th>
            </tr>
        );
    }
}

//TODO: actual dynamic table
//this means a table that accepts arbitrary number of columns
//will need array of columns or something
//(maybe user don't want to see this column but wants to see that)
class ResultsTable extends React.Component {
    render() {
        const rows = [];

        this.props.results.forEach((result) => {
            // Create slightly different table row if box vs. record (will be needed for later)
            if ("containerId" in result) {               // Only records have a containerId variable, so create RecordRow
                rows.push(
                    <RecordRow
                        record={result}
                        key={result.id} />
                );
            }
            else {                                  // Create BoxRow
                rows.push(
                    <BoxRow
                        box={result}
                        key={result.id} />
                );
            }
        });

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Currently showing "consignmentCode": "DESTRUCTION CERTIFICATE 2009-01"
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Number</th>
                                        <th>Consignment Code</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                    </tr>
                                    </thead>
                                    <tbody>{rows}</tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active><PaginationLink href="#">1</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}



class SearchBar extends React.Component {
    render() {
        return (
            <Form >
                <FormGroup row>
                    <h3><b>Search</b></h3>
                    <h5> </h5>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input type="text" name="Number" placeholder="Search..."/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Button type="submit" id="submit-button" size="sm" color="secondary" value="submit">Search</Button>
                </FormGroup>
            </Form>
        );
    }
}



class App extends React.Component {


    render() {
        return (
            <div>
                <SearchBar />
                <ResultsTable results={th} />
            </div>
        );
    }
}


export default App;