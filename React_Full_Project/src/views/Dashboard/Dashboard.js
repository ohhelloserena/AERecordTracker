import React, {Component} from "react";
import axios from 'axios';
import * as ReactDOM from 'react-dom'
import {
    Badge,
    Button,
    Row,
    Col,
    Collapse,
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
    DropdownItem,
    TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText,
} from "reactstrap";
import classnames from 'classnames';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

var responseJSON = {"results":[]};
var records = [];
var dashGlobal = {};
//let filters = [];
var filters = [{"column":"createdAt","type":"LT","value":[2009, 12, 31]}, {"column":"createdAt","type":"GT","value":[2005, 1, 1]}];
//var server = "http://ec2-13-59-251-84.us-east-2.compute.amazonaws.com";
var server = "http://localhost:8080";


function getDate(input)
{ //converts the JSON's string date into an array of ints, [year, month, day]
	return input.split("-", 3).map(function(x){
		return parseInt(x);
	});
}

function callFilter(row, index, arr)
{
	for (let criterion in this)
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

//given a valid JSON response, updates global variables and tables
function globalUpdate(response)
{
	responseJSON = response;
	records = filterJSON(response.results, filters);
	dashGlobal.update();
}

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
        this.props.addToRecordLabels(this.props.record)         // Full.addToRecordLabels()
    }

    printEndTabLabel() {
        this.props.addToEndTabLabels(this.props.record)         // Full.addToEndTabLabels()
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
                                <div onClick={this.printRecordLabel}>+ Record Label</div>
                            </DropdownItem>
                            <DropdownItem>
                                <div onClick={this.printEndTabLabel}>+ End Tab Label</div>
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

class ResultsTable extends React.Component {
	render() {
	    if (this === undefined || this.props === undefined || this.props.results === undefined)
        {
	        return (
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardBlock className="card-body">
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </div>
	        );
        }
		let columns = [];
		if(this.props.results.length > 0)
		{
			for(let key in this.props.results[0])
			{
				if(this.props.results[0].hasOwnProperty(key))
				{
					//TODO: Replace header with user-readable string
					columns.push({"Header": key, "accessor": key});
				}
			}
		}

		let that = this;
		return (
			<div className="animated fadeIn">
				<Row>
					<Col>
						<Card>
							<CardBlock className="card-body">
								<ReactTable
									data={that.props.results}
									columns={columns}
								/>
							</CardBlock>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

class SearchBar extends React.Component {
    //TODO: PAUL'S CODE

	constructor(props) {
      super(props);
      this.state = {
        Number: 0,
        title: 0,
        statesName: '',
        consignmentCode: '',

        typeId: '',
        locationName: [],
        classification: '',

          createdyyyy:'',
          createdmm:'',
          createddd:'',

        createdFromyyyy:'',
        createdFrommm:'',
        createdFromdd:'',

        createdTillyyyy:'',
        createdTillmm:'',
        createdTilldd:'',

          updatedyyyy:'',
          updatedmm:'',
          updateddd:'',

        updatedFromyyyy:'',
        updatedFrommm:'',
        updatedFromdd:'',

        updatedTillyyyy:'',
        updatedTillmm:'',
        updatedTilldd:'',

          //TODO: closedAt

          closedyyyy:'',
          closedmm:'',
          closeddd:'',

          closedFromyyyy:'',
          closedFrommm:'',
          closedFromdd:'',

          closedTillyyyy:'',
          closedTillmm:'',
          closedTilldd:'',

        stateId: '',
        retentionSchedules: '',

        projectFunction: '',
        projectManager: '',
        projectClientName: '',
        proposalFieldOfPractice: '',
        proposalManager: '',
        proposalClientName: '',

        collapseCreated: false,
        collapseCreatedFromTill: true,
        collapseCreatedFrom: true,
        collapseCreatedTill: true,
          collapseUpdated: false,
          collapseUpdatedFromTill: true,
        collapseUpdatedFrom: true,
        collapseUpdatedTill: true,

          //TODO: closedAt
          collapseClosed: false,
          collapseClosedFromTill: true,
          collapseClosedFrom: true,
          collapseClosedTill: true,

        numberOrConsignmentCode: '',

        fullTextSearch: '',

        activeTab: '1',

        dropdownOpen: false,

        dropdownValue: "Please select quick search attribute:",

        locationDropDownOpen: false,

          arrayOfSelectedLocations: []

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitQuickSearch = this.handleSubmitQuickSearch.bind(this);
      this.handleSubmitFullTextSearch = this.handleSubmitFullTextSearch.bind(this);
      this.handleSubmitRecordTypeSpecificSearch = this.handleSubmitRecordTypeSpecificSearch.bind(this);
      this.toggleTab = this.toggleTab.bind(this);
      this.toggleAttr = this.toggleAttr.bind(this);
      this.changeValue = this.changeValue.bind(this);

      this.toggleCollapseCreated = this.toggleCollapseCreated.bind(this);
      this.toggleCollapseCreatedFrom = this.toggleCollapseCreatedFrom.bind(this);
      this.toggleCollapseCreatedTill = this.toggleCollapseCreatedTill.bind(this);
      this.toggleCollapseUpdated = this.toggleCollapseUpdated.bind(this);
      this.toggleCollapseUpdatedFrom = this.toggleCollapseUpdatedFrom.bind(this);
      this.toggleCollapseUpdatedTill = this.toggleCollapseUpdatedTill.bind(this);

      //TODO: closedAt
         this.toggleCollapseClosed = this.toggleCollapseClosed.bind(this);
         this.toggleCollapseClosedFrom = this.toggleCollapseClosedFrom.bind(this);
         this.toggleCollapseClosedTill = this.toggleCollapseClosedTill.bind(this);

         this.toggleLocationDropdown = this.toggleLocationDropdown.bind(this);
         this.toggleLocationCheckbox = this.toggleLocationCheckbox.bind(this);

         this.locationDropDownItems = this.locationDropDownItems.bind(this);

    }

    sendHttpCall(method, url, json) {
		return new Promise(function(resolve, reject)
		{
			let xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else if (xhr.status >= 300) {
					reject(0);
				}
			};

			if (method === "POST") {
				let body = JSON.stringify(json);
				xhr.send(body);
			}
		});
    }

    handleSubmitQuickSearch(event) {
        if (this.state.dropdownValue === "Please select quick search attribute:"){
            console.log(JSON.stringify({Error:'No quick search attribute is selected from the dropdown menu'}))
        }

        let input = this.state.numberOrConsignmentCode.replace(" ", "");

        if (input.length < 5) {
            console.log("Invalid input - input too short");
            // TODO: show invalid input warning on UI

        } else {
        	let json = {};
        	let url = "";
            if (this.state.dropdownValue === "Record/Box Number:") {
                console.log(JSON.stringify({Number: this.state.numberOrConsignmentCode}));
                url = "/records/number";
                json = {Number: this.state.numberOrConsignmentCode};
            } else {
                console.log(JSON.stringify({consignmentCode: this.state.numberOrConsignmentCode}));
                url = "/records/consignmentCode";
                json = {consignmentCode: this.state.numberOrConsignmentCode};
            }

            let method = "POST";
            this.sendHttpCall(method, server + url, json).then(function(result)
            {
            	globalUpdate(result);
            });
        }
        event.preventDefault();
    }

//var sampleFilterParam = {"filter":[{"name":"locationId","type":"EQ","value":"5"},{"name":"year","type":"GT","value":"2005"}]}


    handleSubmitFullTextSearch(event) {
        let arrayOfFilters =
            [
                (this.state.typeId !== '' ? {name:"typeId",type:"EQ",value:this.state.typeId} : undefined),
                //locationName used splice(1,0,val)
                (this.state.classification !== '' ? {name:"classification",type:"EQ",value:this.state.classification} : undefined),

                //for: createdAt
                //first case: one date
                (this.state.collapseCreated
                && this.state.createdyyyy !== ""
                && this.state.createdmm !== ""
                && this.state.createddd !== ""
                    ? {name:"createdAt",type:"EQ",value:[this.state.createdyyyy, this.state.createdmm, this.state.createddd]} : undefined),

                //second case: from beginning to date

                (!this.state.collapseCreated
                && this.state.collapseCreatedTill
                && this.state.createdTillyyyy !== ""
                && this.state.createdTillmm !== ""
                && this.state.createdTilldd !== ""
                    ? {name:"createdAt",type:"LT",value:[this.state.createdTillyyyy, this.state.createdTillmm, this.state.createdTilldd]} : undefined),

                //third case: from date to beginning

                (!this.state.collapseCreated
                && this.state.collapseCreatedFrom
                && this.state.createdFromyyyy !== ""
                && this.state.createdFrommm !== ""
                && this.state.createdFromdd !== ""
                    ? {name:"createdAt",type:"GT",value:[this.state.createdFromyyyy, this.state.createdFrommm, this.state.createdFromdd]} : undefined),

                //for: updatedAt
                //first case: one date
                (this.state.collapseUpdated
                && this.state.updatedyyyy !== ""
                && this.state.updatedmm !== ""
                && this.state.updateddd !== ""
                    ? {name:"updatedAt",type:"EQ",value:[this.state.updatedyyyy, this.state.updatedmm, this.state.updateddd]} : undefined),

                //second case: from beginning to date

                (!this.state.collapseUpdated
                && this.state.collapseUpdatedTill
                && this.state.updatedTillyyyy !== ""
                && this.state.updatedTillmm !== ""
                && this.state.updatedTilldd !== ""
                    ? {name:"updatedAt",type:"LT",value:[this.state.updatedTillyyyy, this.state.updatedTillmm, this.state.updatedTilldd]} : undefined),

                //third case: from date to beginning

                (!this.state.collapseUpdated
                && this.state.collapseUpdatedFrom
                && this.state.updatedFromyyyy !== ""
                && this.state.updatedFrommm !== ""
                && this.state.updatedFromdd !== ""
                    ? {name:"updatedAt",type:"GT",value:[this.state.updatedFromyyyy, this.state.updatedFrommm, this.state.updatedFromdd]} : undefined),


                //TODO: closedAt

                (this.state.collapseClosed
                && this.state.closedyyyy !== ""
                && this.state.closedmm !== ""
                && this.state.closeddd !== ""
                    ? {name:"closedAt",type:"EQ",value:[this.state.closedyyyy, this.state.closedmm, this.state.closeddd]} : undefined),

                //second case: from beginning to date

                (!this.state.collapseClosed
                && this.state.collapseClosedTill
                && this.state.closedTillyyyy !== ""
                && this.state.closedTillmm !== ""
                && this.state.closedTilldd !== ""
                    ? {name:"closedAt",type:"LT",value:[this.state.closedTillyyyy, this.state.closedTillmm, this.state.closedTilldd]} : undefined),

                (!this.state.collapseClosed
                && this.state.collapseClosedFrom
                && this.state.closedFromyyyy !== ""
                && this.state.closedFrommm !== ""
                && this.state.closedFromdd !== ""
                    ? {name:"closedAt",type:"GT",value:[this.state.closedFromyyyy, this.state.closedFrommm, this.state.closedFromdd]} : undefined),

                (this.state.stateId !== '' ? {name:"stateId",type:"EQ",value:this.state.stateId} : undefined),
                (this.state.retentionSchedules !== '' ? {name:"retentionSchedules",type:"EQ",value:this.state.retentionSchedules} : undefined),
            ];


        let query =
            [{
                fullTextSearch:this.state.fullTextSearch
            },{filter: arrayOfFilters}];


        for (let i = this.state.arrayOfSelectedLocations.length - 1; i >= 0; i--) {
           query[1]['filter'].splice(1, 0, {name: "locationName", type: "EQ", value: this.state.arrayOfSelectedLocations[i]});
        }

        query[1]['filter'] = query[1]['filter'].filter(function(x) {
            x !== null;
            return x;
        });
        console.log('A bunch of record queries are submitted: ' + JSON.stringify(query));
        filters = query[1];
        this.sendHttpCall("POST", server + "/records/fulltext", {"keyword": query[0]['fullTextSearch'], "page": 1, "pageSize": 500}).then(function(result)
        {
        	globalUpdate(result);
        });
        event.preventDefault();
    }

    handleSubmitRecordTypeSpecificSearch(event) {
        console.log('A bunch of record queries are submitted: ' +
            JSON.stringify(
                {FilterBy:
                    {
                        projectFunction:this.state.projectFunction,
                        projectManager:this.state.projectManager,
                        projectClientName:this.state.projectClientName,
                        proposalFieldOfPractice:this.state.proposalFieldOfPractice,
                        proposalManager:this.state.proposalManager,
                        proposalClientName:this.state.proposalClientName
                    }
                }
            )
         );
        event.preventDefault();
    }

    handleChange(event) {
      const name = event.target.name;
      this.setState({
        [name]: event.target.value
      });
      //console.log(this.state);
    }

      toggleTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      toggleAttr() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

      toggleCollapseCreated() {
        this.setState({
            collapseCreated: !this.state.collapseCreated,
            collapseCreatedFromTill: !this.state.collapseCreatedFromTill
        });
      }
      toggleCollapseCreatedFrom() {
        this.setState({ collapseCreatedFrom: !this.state.collapseCreatedFrom });
      }
      toggleCollapseCreatedTill() {
        this.setState({ collapseCreatedTill: !this.state.collapseCreatedTill });
      }
        toggleCollapseUpdated() {
            this.setState({
                collapseUpdated: !this.state.collapseUpdated,
                collapseUpdatedFromTill: !this.state.collapseUpdatedFromTill
            });
        }
      toggleCollapseUpdatedFrom() {
        this.setState({ collapseUpdatedFrom: !this.state.collapseUpdatedFrom });
      }
      toggleCollapseUpdatedTill() {
        this.setState({ collapseUpdatedTill: !this.state.collapseUpdatedTill });
      }

      //TODO: closedAt
    toggleCollapseClosed() {
        this.setState({
            collapseClosed: !this.state.collapseClosed,
            collapseClosedFromTill: !this.state.collapseClosedFromTill
        });
    }
    toggleCollapseClosedFrom() {
        this.setState({ collapseClosedFrom: !this.state.collapseClosedFrom });
    }
    toggleCollapseClosedTill() {
        this.setState({ collapseClosedTill: !this.state.collapseClosedTill });
    }



      changeValue(e) {
        this.setState({dropdownValue: e.currentTarget.textContent})
      }

      toggleLocationDropdown() {
        this.setState({
          locationDropDownOpen: !this.state.locationDropDownOpen
        });
      }

      toggleLocationCheckbox(event) {
         var name = event.target.name;

         if (!this.state.arrayOfSelectedLocations.includes(event.target.name)) {
             this.state.arrayOfSelectedLocations.push(event.target.name)
         }
         else {
             var index = this.state.arrayOfSelectedLocations.indexOf(event.target.name);
             if (index > -1) {
                 this.state.arrayOfSelectedLocations.splice(index, 1);
             }
         }
      }

      //if checked: arrayOfChecked.push
    //if unchecked: arrayOfchecked.remove

      //TODO: Sample Location Param

      locationDropDownItems() {
        var listOfLocationDropDownItems = [];
        var sampleLocationDropDown = [{'name': 'Vancouver', 'id': '5'}, {'name':'Edmonton', 'id': '6'}, {'name': 'Calgary', 'id': '7'}];

        for (var i = 0; i < sampleLocationDropDown.length; i++) {

            listOfLocationDropDownItems.push(<Label check>
                                         <Input type="checkbox" id = {'location' + sampleLocationDropDown[i]['id']} name = {sampleLocationDropDown[i]['name']} onClick={this.toggleLocationCheckbox}/>{' '}
                                            {sampleLocationDropDown[i]['name']}
                                     </Label>);

            //this.state.locationName.push({name:"locationName",type:"EQ",value:sampleLocationDropDown[i]['name']}); //just to test

        }

        //console.log(listOfLocationDropDownItems);

        return listOfLocationDropDownItems;
               /* <Label check>
                  <Input type="checkbox" onClick={this.toggleLocationCheckbox}/>{' '}
                  Check me out
                </Label>*/

      }

      locationSelectedToList() {



      }


    render() {
        return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleTab('1'); }}
            >
              Quick Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggleTab('2'); }}
            >
              Full Text Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggleTab('3'); }}
            >
              Record Type Specific Search
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="20">
                <div className="animated fadeIn">
                    <Form onSubmit={this.handleSubmitQuickSearch}>

                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleAttr} sm={2}>
                            <DropdownToggle caret>
                              {this.state.dropdownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>
                                <div onClick={this.changeValue}>Record/Box Number:</div>
                              </DropdownItem>
                              <DropdownItem>
                                <div onClick={this.changeValue}>Consignment Code:</div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                         <FormGroup row>
                                            <Col sm={10}>
                                              <Input type="text" name="numberOrConsignmentCode" value={this.state.numberOrConsignmentCode} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          <FormGroup row>
                                            <Button type="submit" id="submit-button" size="sm" color="secondary" value="submit">Search</Button>
                                          </FormGroup>
                       </Form>

                    </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="20">
                <div className="animated fadeIn">
                    <Form onSubmit={this.handleSubmitFullTextSearch}>
                         <FormGroup row>
                                            <Label for="fullTextSearch" sm={20}> Enter a valid Record/Box Number, Record/Box Title, Record/Box Notes or Box Consignment Id:</Label>
                                            <Col sm={10}>
                                              <Input type="text" name="fullTextSearch" value={this.state.fullTextSearch} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          <h3>Filter By:</h3>
                                          <FormGroup row>
                                            <Label for="typeId" sm={20}>Record Type:</Label>
                                            <Col sm={10}>
                                              <Input type="text" name="typeId" value={this.state.typeId} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                            <div>
                                                <Label for="locationName" sm={20}>Location:</Label>
                                                <Dropdown isOpen={this.state.locationDropDownOpen} toggle={this.toggleLocationDropdown}>
                                                  <DropdownToggle caret>
                                                    Check the locations you would like to search for
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                    <DropdownItem>
                                                        {this.locationDropDownItems()}
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                          <FormGroup row>
                                            <Label for="classification" sm={20}>Classification:</Label>
                                            <Col sm={10}>
                                              <Input type="text" name="classification" value={this.state.classification} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>

                                          <FormGroup row>
                                            <Label for="dateCreated" sm={20}>Date Created (yyyy/mm/dd): </Label>
                                                 <Label check>
                                                   {' '}<Input type="checkbox" onClick={this.toggleCollapseCreated}/>{' '}
                                                   Check this if you just want one specific date
                                                 </Label>
                                           </FormGroup>

                                          <Collapse sm={20} isOpen={this.state.collapseCreated}>
                                            <FormGroup row>
                                            <Col sm={2}>
                                              <Input type="text" name="createdyyyy" value={this.state.createdyyyy} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createdmm" value={this.state.createdmm} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createddd" value={this.state.createddd} onChange={this.handleChange}/>
                                            </Col>
                                            </FormGroup>
                                          </Collapse>

                                          <Collapse sm={20} isOpen={this.state.collapseCreatedFromTill}>
                                          <FormGroup row>
                                            <Label for="dateCreated" sm={20}>From{' '}</Label>
                                                 <Label check>
                                                   {' '}<Input type="checkbox" onClick={this.toggleCollapseCreatedFrom}/>{' '}
                                                   Beginning
                                                 </Label>
                                           </FormGroup>

                                            <Collapse sm={20} isOpen={this.state.collapseCreatedFrom}>
                                            <FormGroup row>
                                            <Col sm={2}>
                                              <Input type="text" name="createdFromyyyy" value={this.state.createdFromyyyy} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createdFrommm" value={this.state.createdFrommm} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createdFromdd" value={this.state.createdFromdd} onChange={this.handleChange}/>
                                            </Col>
                                            </FormGroup>
                                          </Collapse>

                                          <FormGroup row>
                                            <Label for="dateCreated" sm={20}>Till</Label>
                                                 <Label check>
                                                   {' '}<Input type="checkbox" onClick={this.toggleCollapseCreatedTill}/>{' '}
                                                   Now
                                                 </Label>
                                           </FormGroup>

                                           <Collapse sm={20} isOpen={this.state.collapseCreatedTill}>
                                           <FormGroup row>
                                            <Col sm={2}>
                                              <Input type="text" name="createdTillyyyy" value={this.state.createdTillyyyy} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createdTillmm" value={this.state.createdTillmm} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="createdTilldd" value={this.state.createdTilldd} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          </Collapse>

                                          </Collapse>
                                            <FormGroup row>
                                                <Label for="dateCreated" sm={20}>Date Updated (yyyy/mm/dd): </Label>
                                                <Label check>
                                                    {' '}<Input type="checkbox" onClick={this.toggleCollapseUpdated}/>{' '}
                                                    Check this if you just want one specific date
                                                </Label>
                                            </FormGroup>

                                            <Collapse sm={20} isOpen={this.state.collapseUpdated}>
                                                <FormGroup row>
                                                    <Col sm={2}>
                                                        <Input type="text" name="updatedyyyy" value={this.state.updatedyyyy} onChange={this.handleChange}/>
                                                    </Col>
                                                    /
                                                    <Col sm={2}>
                                                        <Input type="text" name="updatedmm" value={this.state.updatedmm} onChange={this.handleChange}/>
                                                    </Col>
                                                    /
                                                    <Col sm={2}>
                                                        <Input type="text" name="updateddd" value={this.state.updateddd} onChange={this.handleChange}/>
                                                    </Col>
                                                </FormGroup>
                                            </Collapse>

                                        <Collapse sm={20} isOpen={this.state.collapseUpdatedFromTill}>

                                            <FormGroup row>
                                                <Label for="dateCreated" sm={20}>From{' '}</Label>
                                                <Label check>
                                                    {' '}<Input type="checkbox" onClick={this.toggleCollapseUpdatedFrom}/>{' '}
                                                    Beginning
                                                </Label>
                                            </FormGroup>

                                           <Collapse sm={20} isOpen={this.state.collapseUpdatedFrom}>
                                           <FormGroup row>
                                            <Col sm={2}>
                                              <Input type="text" name="updatedFromyyyy" value={this.state.updatedFromyyyy} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="updatedFrommm" value={this.state.updatedFrommm} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="updatedFromdd" value={this.state.updatedFromdd} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          </Collapse>

                                          <FormGroup row>
                                            <Label for="dateCreated" sm={20}>Till{' '}</Label>
                                                 <Label check>
                                                   {' '}<Input type="checkbox" onClick={this.toggleCollapseUpdatedTill}/>{' '}
                                                   Now
                                                 </Label>
                                           </FormGroup>

                                           <Collapse sm={20} isOpen={this.state.collapseUpdatedTill}>
                                           <FormGroup row>
                                            <Col sm={2}>
                                              <Input type="text" name="updatedTillyyyy" value={this.state.updatedTillyyyy} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="updatedTillmm" value={this.state.updatedTillmm} onChange={this.handleChange}/>
                                            </Col>
                                            /
                                            <Col sm={2}>
                                              <Input type="text" name="updatedTilldd" value={this.state.updatedTillddd} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          </Collapse>
                                        </Collapse>

                        <FormGroup row>
                            <Label for="dateClosed" sm={20}>Date Closed (yyyy/mm/dd): </Label>
                            <Label check>
                                {' '}<Input type="checkbox" onClick={this.toggleCollapseClosed}/>{' '}
                                Check this if you just want one specific date
                            </Label>
                        </FormGroup>

                        <Collapse sm={20} isOpen={this.state.collapseClosed}>
                            <FormGroup row>
                                <Col sm={2}>
                                    <Input type="text" name="closedyyyy" value={this.state.closedyyyy} onChange={this.handleChange}/>
                                </Col>
                                /
                                <Col sm={2}>
                                    <Input type="text" name="closedmm" value={this.state.closedmm} onChange={this.handleChange}/>
                                </Col>
                                /
                                <Col sm={2}>
                                    <Input type="text" name="closeddd" value={this.state.closeddd} onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                        </Collapse>

                        <Collapse sm={20} isOpen={this.state.collapseClosedFromTill}>
                            <FormGroup row>
                                <Label for="dateClosed" sm={20}>From{' '}</Label>
                                <Label check>
                                    {' '}<Input type="checkbox" onClick={this.toggleCollapseClosedFrom}/>{' '}
                                    Beginning
                                </Label>
                            </FormGroup>

                            <Collapse sm={20} isOpen={this.state.collapseClosedFrom}>
                                <FormGroup row>
                                    <Col sm={2}>
                                        <Input type="text" name="closedFromyyyy" value={this.state.closedFromyyyy} onChange={this.handleChange}/>
                                    </Col>
                                    /
                                    <Col sm={2}>
                                        <Input type="text" name="closedFrommm" value={this.state.closedFrommm} onChange={this.handleChange}/>
                                    </Col>
                                    /
                                    <Col sm={2}>
                                        <Input type="text" name="closedFromdd" value={this.state.closedFromdd} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                            </Collapse>

                            <FormGroup row>
                                <Label for="dateClosed" sm={20}>Till</Label>
                                <Label check>
                                    {' '}<Input type="checkbox" onClick={this.toggleCollapseClosedTill}/>{' '}
                                    Now
                                </Label>
                            </FormGroup>

                            <Collapse sm={20} isOpen={this.state.collapseClosedTill}>
                                <FormGroup row>
                                    <Col sm={2}>
                                        <Input type="text" name="closedTillyyyy" value={this.state.closedTillyyyy} onChange={this.handleChange}/>
                                    </Col>
                                    /
                                    <Col sm={2}>
                                        <Input type="text" name="closedTillmm" value={this.state.closedTillmm} onChange={this.handleChange}/>
                                    </Col>
                                    /
                                    <Col sm={2}>
                                        <Input type="text" name="closedTilldd" value={this.state.closedTilldd} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                            </Collapse>

                        </Collapse>


                                          <FormGroup row>
                                            <Label for="recordState" sm={20}>Record State:</Label>
                                            <Col sm={10}>
                                              <Input type="text" name="stateId" value={this.state.stateId} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          <FormGroup row>
                                            <Label for="retentionSchedules" sm={20}>Retention Schedules:</Label>
                                            <Col sm={10}>
                                              <Input type="text" name="retentionSchedules" value={this.state.retentionSchedules} onChange={this.handleChange}/>
                                            </Col>
                                          </FormGroup>
                                          <FormGroup row>
                                            <Button type="submit" id="submit-button" size="sm" color="secondary" value="submit">Search</Button>
                                          </FormGroup>
                       </Form>

                    </div>
              </Col>
            </Row>
          </TabPane>
            <TabPane tabId="3">
            <Row>
              <Col sm="20">
                <div className="animated fadeIn">
                  <Form onSubmit={this.handleSubmitRecordTypeSpecificSearch}>
                   <h3>Project Filters:</h3>
                       <FormGroup row>
                          <Label for="projectFunction" sm={20}>Function:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="projectFunction" value={this.state.projectFunction} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>
                       <FormGroup row>
                          <Label for="projectManager" sm={20}>Project Manager:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="projectManager" value={this.state.projectManager} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>
                       <FormGroup row>
                          <Label for="projectClientName" sm={20}>Client Name:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="projectClientName" value={this.state.projectClientName} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>

                   <h3>Proposal Filters:</h3>
                       <FormGroup row>
                          <Label for="proposalFieldOfPractice" sm={20}>Field of Practice:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="proposalFieldOfPractice" value={this.state.proposalFieldOfPractice} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>
                       <FormGroup row>
                          <Label for="proposalManager" sm={20}>Proposal Manager:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="proposalManager" value={this.state.proposalManager} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>
                       <FormGroup row>
                          <Label for="proposalClientName" sm={20}>Client Name:</Label>
                              <Col sm={10}>
                                  <Input type="text" name="proposalClientName" value={this.state.proposalClientName} onChange={this.handleChange}/>
                              </Col>
                       </FormGroup>
                       <FormGroup row>
                           <Button type="submit" id="submit-button" size="sm" color="secondary" value="submit">Search</Button>
                       </FormGroup>


                   </Form>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
        );
    }
}

/*
class ChooseSearchType extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);

    this.state = {
      dropdownOpen: false,
      dropdownValue: "Please Select a Search Method"
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {

    this.setState({
          dropdownValue: e.currentTarget.textContent
    });

    console.log('Dashboard.state: ' + Dashboard.state)
    if (e.currentTarget.textContent == "Quick Search") {
        Dashboard.setState({show:true});
    }
  }


  render() {
    return (
        <div>
          <h3><b>Search Type: </b></h3>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.dropdownValue}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                  <div onClick={this.changeValue}>Quick Search</div>
              </DropdownItem>
              <DropdownItem>
                  <div onClick={this.changeValue}>Full Text Search</div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
    );
  }
}
*/
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	};

	componentWillMount()
	{
		dashGlobal.update = () => {
			// `this` refers to our react component
			this.setState({results: records});
		};
	}

	render() {
		return (
			<div>
				<div>
					<SearchBar/>
					<ResultsTable results={records}/>
				</div>
			</div>
		);
	}
}

/*TODO: add
<ResultsTable results={th} addToRecordLabels={this.props.addToRecordLabels} addToEndTabLabels={this.props.addToEndTabLabels} addToContainerReports={this.props.addToContainerReports} addToEnclosureReports={this.props.addToEnclosureReports}/>
between <SearchBar />
and </div>
later
*/

export default Dashboard;