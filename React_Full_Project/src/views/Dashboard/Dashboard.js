import React, {Component} from "react";
import axios from 'axios';
import * as ReactDOM from 'react-dom'
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";


var th;
var request = new XMLHttpRequest();
request.open('GET', 'http://127.0.0.1:8080/records/', false);

request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        th = data.results;
    } else {
        console.error('Response received and there was an error');
    }
};
request.onerror = function() {
    console.error('Request error');
};
request.send();
console.log("this is th");
console.log(th);

var sampleFilterParam = {"filter":[{"name":"locationId","type":"EQ","value":"5"},{"name":"year","type":"GT","value":"2005"}]};

const response = {recordId: 250, attrId: 4, id: 67, value: "MULTIPLE FIELDS OF PRACTICE - SEE NOTES FIELD"};


class Tables extends Component {


    render() {
        console.log(th);
        return (
            <div className="animated fadeIn">

              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"></i> table for customattributevalues
                    </CardHeader>
                    <CardBlock className="card-body">
                      <Table hover bordered striped responsive size="sm">
                        <thead>
                        <tr>
                          <th>Id</th>
                          <th>AttrId</th>
                          <th>RecordId</th>
                          <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>{th[0].id}</th>
                            <th>{th[0].attrId}</th>
                            <th>{th[0].recordId}</th>
                            <th>{th[0].value}</th>
                        </tr>
                          <tr>
                              <th>{th[1].id}</th>
                              <th>{th[1].attrId}</th>
                              <th>{th[1].recordId}</th>
                              <th>{th[1].value}</th>
                          </tr>
                          <tr>
                              <th>{th[2].id}</th>
                              <th>{th[2].attrId}</th>
                              <th>{th[2].recordId}</th>
                              <th>{th[2].value}</th>
                          </tr>
                          <tr>
                              <th>{th[3].id}</th>
                              <th>{th[3].attrId}</th>
                              <th>{th[3].recordId}</th>
                              <th>{th[3].value}</th>
                          </tr>
                          <tr>
                              <th>{th[4].id}</th>
                              <th>{th[4].attrId}</th>
                              <th>{th[4].recordId}</th>
                              <th>{th[4].value}</th>
                          </tr>
                        </tbody>
                      </Table>
                      <nav>
                        <Pagination>
                          <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                          <PaginationItem active>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
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

        )
    }

}


export default Tables;




