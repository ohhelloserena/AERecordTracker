import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import PrintQueue from '../../components/PrintQueue/';

class Full extends Component {
    constructor(props) {
        super(props);
        this.addToRecordLabels = this.addToRecordLabels.bind(this);
        this.addToEndTabLabels = this.addToEndTabLabels.bind(this);
        this.addToContainerReports = this.addToContainerReports.bind(this);
        this.addToEnclosureReports = this.addToEnclosureReports.bind(this);
        this.print = this.print.bind(this);
        this.state = {
            recordLabels: [],
            endTabLabels: [],
            containerReports: [],
            enclosureReports: []
        };
    }
    // TODO: disallow duplicates
    addToRecordLabels(data) {
        var newState = Object.assign({}, this.state); // Clone the state obj in newState
        newState["recordLabels"].push(data);             // modify newState
        this.setState(newState);
        //console.log(this.state);
    }

    addToEndTabLabels(data) {
        var newState = Object.assign({}, this.state);
        newState["endTabLabels"].push(data);
        this.setState(newState);
        //console.log(this.state);
    }

    addToContainerReports(data) {
        var newState = Object.assign({}, this.state);
        newState["containerReports"].push(data);
        this.setState(newState);
        //console.log(this.state);
    }

    addToEnclosureReports(data) {
        var newState = Object.assign({}, this.state);
        newState["enclosureReports"].push(data);
        this.setState(newState);
        //console.log(this.state);
    }

    print() {
        console.log("Full.print()");
    }

    // TODO : empty state/print arrays then POST to update record/container hasPrinted boolean
    flush() {
        console.log("flush");
    }

    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={() => <Dashboard addToRecordLabels={this.addToRecordLabels} addToEndTabLabels={this.addToEndTabLabels} addToContainerReports={this.addToContainerReports} addToEnclosureReports={this.addToEnclosureReports} />}/>
                                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                                <Route path="/components/cards" name="Cards" component={Cards}/>
                                <Route path="/components/forms" name="Forms" component={Forms}/>
                                <Route path="/components/modals" name="Modals" component={Modals}/>
                                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                                <Route path="/components/switches" name="Swithces" component={Switches}/>
                                <Route path="/components/tables" name="Tables" component={Tables}/>
                                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                                <Route path="/widgets" name="Widgets" component={Widgets}/>
                                <Route path="/charts" name="Charts" component={Charts}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    <PrintQueue state={this.state} print={this.print} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;