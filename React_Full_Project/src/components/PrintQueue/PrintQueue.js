import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input} from 'reactstrap';
import classnames from 'classnames';

class PrintQueue extends Component {
    constructor(props) {
        super(props);

    }

    test() {
        console.log("TESTING PRINT QUEUE METHOD");
    }

    render() {
        return (
            <aside className="aside-menu">
              <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
                <b>Print</b>
              </div>
              <hr className="transparent mx-3 my-0"/>
              <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                <small><b>Record Labels</b></small>
              </div>
              <hr className="transparent mx-3 my-0"/>
              <div className="m-1">Record #1</div>
              <hr className="mx-3 my-0"/>
              <div className="m-1">Record #2</div>
              <hr className="transparent mx-3 my-0"/>
              <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                <small><b>Container Reports</b></small>
              </div>
              <hr className="transparent mx-3 my-0"/>
              <div className="m-1">Container #1 </div>
              <hr className="mx-3 my-0"/>
              <div className="m-1">Container #2</div>
              <hr className="mx-3 my-0"/>
            </aside>
        )
    }
}

export default PrintQueue;