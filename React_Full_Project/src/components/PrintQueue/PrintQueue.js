import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Progress, Label, Input} from 'reactstrap';
import classnames from 'classnames';



//TODO: deletion of record/containers for printing

class PrintQueue extends Component {
    constructor(props) {
        super(props);
        this.print = this.print.bind(this);
        this.state = this.props.state;
        /*this.state = {
            recordLabels: [],
            endTabLabels: [],
            containerReports: [],
            enclosureReports: []
        };*/
    }

    recordLabelPrint(doc) {
        const margin = 12.7;
        const width = 215.9;
        const height = 279.4;
        const middle = width / 2;
        const labelWidth = middle - (margin * 2);
        const labelHeight = (height - margin) / 5;
        const locationTitlePad = labelHeight / 2.4;
        const locationNumberPad = labelWidth / 1.1;
        const locationSchNumPad = labelWidth / 6;
        const locationClientNamePad = labelWidth / 4;
        const locationPrevPartPad = labelWidth / 2.5;
        const statLocationSchNumPad = labelHeight / 9;
        const statLocationClientPad = statLocationSchNumPad * 2;
        const statLocationPrevPartPad = labelWidth / 3.2;
        var leftAlign = margin;
        var topAlign = margin;
        var count = this.state.recordLabels.length;

        for(var i=0; i<count; i++) {
            // set these to params
            var record = this.state.recordLabels[i];
            var location = String(record.locationId);   // TODO: NEED REAL LOCATION
            var number = record.number;
            var volumeNum;  // TODO
            var schedNum = String(record.scheduleId);
            var prevVolume;  // TODO
            var clientName;  // TODO
            var classificationPath = "TODO CLASSIFICATION PATH *** " // TODO
            var title = record.title;

            // add a new page if over limit
            if (i % 10 === 0 && i > 0) {
                doc.addPage();
                leftAlign = margin;
                topAlign = margin;
            }

            doc.setFontSize(8.5);
            doc.setFontStyle('bold');
            // Record Location
            doc.text(leftAlign, topAlign, "TODO");
            // Record Number
            var volumeNum = "~" + "TODO";
            var numberAndVolume = number + volumeNum;
            doc.text(leftAlign + locationNumberPad, topAlign, numberAndVolume,null,null,"right");
            // Client Name
            doc.text(leftAlign + locationClientNamePad, topAlign + statLocationClientPad, "TODO");
            // Schedule Number
            doc.text(leftAlign + locationSchNumPad, topAlign + statLocationSchNumPad, schedNum);
            // Classification Path + Title
            var classPathTitle = classificationPath + title;
            var splitTitle = doc.splitTextToSize(classPathTitle, labelWidth);
            doc.text(leftAlign, topAlign + locationTitlePad, splitTitle);
            // Previous Part
            doc.setFontStyle('normal');
            doc.text(leftAlign + labelWidth, topAlign + statLocationSchNumPad, "TODO prev part", null,null,"right");


            // Static headers
            doc.setFontStyle('italic');
            doc.text(leftAlign, topAlign + statLocationSchNumPad, "Sch Num");
            doc.text(leftAlign + statLocationPrevPartPad, topAlign + statLocationSchNumPad, "Previous Part");
            doc.text(leftAlign, topAlign + statLocationClientPad, "Client Name");

            // right side
            if (i % 2 === 0) {
                leftAlign = middle;
            }
            // left side
            else {
                leftAlign = margin;
                topAlign += labelHeight;
            }
        }
        return doc;
    }

    // TODO
    endTabLabelPrint(doc) {
        return doc;
    }
    // TODO
    containerReportPrint(doc) {
        return doc;
    }
    // TODO
    enclosureReportPrint(doc) {
        return doc;
    }

    print() {
        const recordLabels = this.state.recordLabels;
        const endTabLabels = this.state.endTabLabels;
        const containerReports = this.state.containerReports;
        const enclosureReports = this.state.enclosureReports;
        console.log(this.state);

        var pdfConverter = require('jspdf');
        var doc = new pdfConverter('p','mm','letter');
        // TODO: adding pages
        if (recordLabels.length > 0) {
            doc = this.recordLabelPrint(doc);
        }
        if (endTabLabels.length > 0) {
            doc = this.endTabLabelPrint(doc);
        }
        if (containerReports.length > 0) {
            doc = this.containerReportPrint(doc);
        }
        if (enclosureReports.length > 0) {
            doc = this.enclosureReportPrint(doc);
        }

        doc.autoPrint();
        var blob = doc.output('blob');

        // Check if IE or other browser,then open the PDF file
        if ('msSaveOrOpenBlob' in window.navigator) {
            window.navigator.msSaveOrOpenBlob(blob, blob.name || "detailPDF" + ".pdf");
        }
        else {
            var objectUrl = URL.createObjectURL(blob);
            var pdfWindow = window.open(objectUrl);
        }
    }


    showPrint() {
        document.body.classList.toggle('aside-menu-hidden', false);
    }



    render() {
        const recordLabels = this.state.recordLabels;
        const endTabLabels = this.state.endTabLabels;
        const containerReports = this.state.containerReports;
        const enclosureReports = this.state.enclosureReports;

        const hr = <hr className="mx-3 my-0"/>;
        let recordLabelHeader = null;
        let endTabLabelHeader = null;
        let containerReportHeader = null;
        let enclosureReportHeader = null;
        const printButton = <button className="btn-block" onClick={this.print}>Print</button>;
        const rLabels = [];         // Rows of the print screen - only for visual purposes
        const eTabLabels = [];      //
        const cReports = [];        //
        const eReports = [];        //


        if(typeof recordLabels != "undefined" && recordLabels != null && recordLabels.length > 0){
            recordLabelHeader = <div>
                <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                    <small><b>Record Labels</b></small>
                </div>
                {hr}
            </div>;
            recordLabels.forEach((record) => {
                rLabels.push(
                    <div key={record.id}>
                        <div className="m-1"> Record {record.id} </div>
                        {hr}
                    </div>
                );
            });
        }

        if(typeof endTabLabels != "undefined" && endTabLabels != null && endTabLabels.length > 0){
            endTabLabelHeader =
                <div>
                    <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                        <small><b>End Tab Labels</b></small>
                    </div>
                    {hr}
                </div>;
            endTabLabels.forEach((record) => {
                eTabLabels.push(
                    <div key={record.id}>
                        <div className="m-1"> Record {record.id} </div>
                        {hr}
                    </div>
                );
            });
        }

        if(typeof containerReports != "undefined" && containerReports != null && containerReports.length > 0){
            containerReportHeader =
                <div>
                    <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                        <small><b>Container Reports</b></small>
                    </div>
                    {hr}
                </div>;
            containerReports.forEach((container) => {
                cReports.push(
                    <div key={container.id}>
                        <div className="m-1"> Container {container.id} </div>
                        {hr}
                    </div>
                );
            });
        }

        if(typeof enclosureReports != "undefined" && enclosureReports != null && enclosureReports.length > 0){
            enclosureReportHeader =
                <div>
                    <div className="callout m-0 py-2 text-muted text-left bg-light text-uppercase">
                        <small><b>Enclosure Reports</b></small>
                    </div>
                    {hr}
                </div>;
            enclosureReports.forEach((container) => {
                eReports.push(
                    <div key={container.id}>
                        <div className="m-1"> Container {container.id} </div>
                        {hr}
                    </div>
                );
            });
        }

        if (rLabels.length > 0 || eTabLabels.length > 0 || cReports.length > 0 || eReports.length > 0) {
            this.showPrint();
        }

        return (
            <aside className="aside-menu" >
                <TabContent>
                    <div className="callout m-0 py-2 text-muted text-center bg-light text-uppercase">
                        <b>Print</b>
                    </div>
                    {hr}
                    {recordLabelHeader}
                    {rLabels}
                    {endTabLabelHeader}
                    {eTabLabels}
                    {containerReportHeader}
                    {cReports}
                    {enclosureReportHeader}
                    {eReports}
                </TabContent>
                {printButton}
            </aside>
        )
    }
}

export default PrintQueue;