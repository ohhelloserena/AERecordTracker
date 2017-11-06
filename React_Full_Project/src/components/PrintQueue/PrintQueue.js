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

    endTabLabelPrint(doc) {


        const margin = 10;
        const width = 279.4;
        const divWidth = (width - (margin * 2)) / 6;
        const labelWidth = divWidth - 11;
        const labelHeightXXS = 10.7;
        const labelHeightXS = 13;
        const labelHeightS = 17;
        const labelHeightM = 19;
        const labelHeightL = 24;
        const fontSizeXXS = 28;
        const fontSizeXS = 30;
        const fontSizeS = 38;
        const fontSizeM = 40;
        const fontSizeL = 42;
        const height = 215.9;
        var pos;

        const defaultRGB = [0,0,0]

        // TODO get from/save to server
        var colourLookup = {
            "A":[244,154,153],
            "B":[193,0,63],
            "C":[250,174,37],
            "E":[255,233,5],
            "L":[231,206,149],
            "O":[250,174,37],
            "P":[208,90,2],
            "R":[133,178,2],
            "S":[0,80,54],
            "U":[98,31,146],
            "0":[244,154,153],
            "1":[193,0,63],
            "2":[250,174,37],
            "3":[208,90,2],
            "4":[133,178,2],
            "6":[38,166,195],
            "7":[98,31,146],
            "8":[211,179,254],
            "9":[115,57,33],
            "17":[98,31,146],
            "v":[250,174,37]
        };

        const personnelIds = ["ba", "f"];

        var testRecords = [{"number": "SAS-LOP/1",
            "typeId": 10},
            {"number": "20012183.00.E.05.00:01",
                "typeId": 83},
            {"number": "20172064.00.S.04.00",
                "typeId": 83},
            {"number": "EDM_P_2004.008",
                "typeId": 32},
            {"number": "CEO-2017/019",
                "typeId": 3},
            {"number": "AGL-2006/001",
                "typeId": 3},
            {"number": "BUR_P_2017.706",
                "typeId": 32},
            {"number": "AGL-2006/001",
                "typeId": 3}
        ];




        /*
        Personnel (typeId 10)
        XXX-ZZZ/NN
        GRO-CAI/1
        SAS-LOP/1
        ==> GRO CAI 1
        */
        function personnelRecord(pos, string) {
            var x = margin + 5.5 + (divWidth * (pos - 1));
            var y = margin - 1;

            addLabel(x, y, string.charAt(0), "M");
            addLabel(x, y + labelHeightM, string.charAt(1), "M");
            addLabel(x, y + labelHeightM * 2, string.charAt(2), "M");

            addLabel(x, y + 71.5, string.charAt(4), "L");
            addLabel(x, y + 71.5 + labelHeightL, string.charAt(5), "L");
            addLabel(x, y + 71.5 + labelHeightL * 2, string.charAt(6), "L");

            addLabel(x, y + 150, string.charAt(8), "M");
        }

        /*
        Project record (typeid 83)
        nnnnzzzz.zz.z.nn.xxxxx
        20012183.00.E.05.00
        20012183.00.E.05.00:01 <-- vol
        ==> 01 2183 00 E 05 00 v.01
        */
        function projectRecord(pos, string) {
            var x = margin + 5.5 + (divWidth * (pos - 1));
            var y = margin - 1;
            const pad = 2;

            addLabel(x, y, string.charAt(2) + string.charAt(3), "S");
            addLabel(x, y + labelHeightM, string.charAt(4), "M");
            addLabel(x, y + labelHeightM * 2, string.charAt(5), "M");
            addLabel(x, y + labelHeightM * 3, string.charAt(6), "M");
            addLabel(x, y + labelHeightM * 4, string.charAt(7), "M");

            y = y + labelHeightM * 5 + pad;
            addLabel(x, y, string.charAt(9) + string.charAt(10), "XXS");

            y = y + labelHeightXXS + pad;
            addLabel(x, y, string.charAt(12), "M");

            y = y + labelHeightM + pad;
            addLabel(x, y, string.charAt(14), "XXS");
            addLabel(x, y + labelHeightXXS, string.charAt(15), "XXS");

            y = y + labelHeightXXS * 2 + pad;
            addLabel(x, y, string.charAt(17), "XXS");
            addLabel(x, y + labelHeightXXS, string.charAt(18), "XXS");

            // check if volume is in number
            if (string.charAt(19)) {
                var volumeString = string.charAt(20) + string.charAt(21);
                var char = "v." + volumeString;
                addLabel(x, height - margin + 2 - labelHeightXXS, char, "XXS");
            }
        }

        /*
        Proposal (typeid 32)
        KKK_K_yyyy.ggg
        EDM_P_2004.008
        BUR_P_2017.706
        ==> EDM P 04 008
        */
        function proposalRecord(pos, string) {
            var x = margin + 5.5 + (divWidth * (pos - 1));
            var y = margin - 1;

            addLabel(x, y, string.charAt(0), "XS");
            addLabel(x, y + labelHeightXS, string.charAt(1), "XS");
            addLabel(x, y + labelHeightXS * 2, string.charAt(2), "XS");

            addLabel(x, y + 43, string.charAt(4), "L");

            y = y + 71.5;
            addLabel(x, y, string.charAt(8) + string.charAt(9), "L");

            y = y + 30;
            addLabel(x, y, string.charAt(11), "L");
            addLabel(x, y + labelHeightL, string.charAt(12), "L");
            addLabel(x, y + labelHeightL * 2, string.charAt(13), "L");
        }

        /*
        Subject record (typeid 3, 8, 11, 14, 19, 27, 29, 56, 63, 77, 88, 89, 90, 91, 92)
        KKK-yyyy/ggg
        AGL-2006/001
        CEO-2017/019
        ==> AGL 06 001
        */
        function subjectRecord(pos, string) {
            var x = margin + 5.5 + (divWidth * (pos - 1));
            var y = margin - 1;

            addLabel(x, y, string.charAt(0), "XS");
            addLabel(x, y + labelHeightXS, string.charAt(1), "XS");
            addLabel(x, y + labelHeightXS * 2, string.charAt(2), "XS");

            addLabel(x, y + 43, string.charAt(6) + string.charAt(7), "L");

            y = y + 71.5;
            addLabel(x, y, string.charAt(9), "L");
            addLabel(x, y + labelHeightL, string.charAt(10), "L");
            addLabel(x, y + labelHeightL * 2, string.charAt(11), "L");
        }


        function addLabel(x, y, char, size) {
            var RGB;
            var key;
            var charSpacer = '  ';

            // If two digit char and starts with 0, get colour for second digit
            if (char.charAt(0) === '0' && char.length >= 2) {
                key = char.charAt(1);
            }
            else if (char.charAt(0) === 'v') {
                key = 'v';
            }
            else {
                key = char;
            }
            if (key in colourLookup) {
                RGB = colourLookup[key];
            }
            else {
                RGB = defaultRGB;
            }
            doc.setFillColor(RGB[0],RGB[1],RGB[2]);
            var charYPad;
            var labelHeight;

            switch(size) {
                case "XXS":
                    doc.setFontSize(fontSizeXXS);
                    labelHeight = labelHeightXXS;
                    charYPad = 8.5;
                    // if volume label
                    if (char.charAt(0) === 'v') {
                        doc.setFontSize(fontSizeXXS - 10);
                        charYPad = 7;
                    }
                    if (char.length === 1) {
                        charSpacer = '     ';
                    }
                    break;
                case "XS":
                    doc.setFontSize(fontSizeXS);
                    labelHeight = labelHeightXS;
                    charYPad = 11;
                    if (char.length === 1) {
                        charSpacer = '    ';
                    }
                    break;
                case "S":
                    doc.setFontSize(fontSizeS);
                    labelHeight = labelHeightS;
                    charYPad = 13;
                    if (char.length > 1) {
                        doc.setFontSize(fontSizeS - 8);
                        charSpacer = '  ';
                    }
                    break;
                case "M":
                    doc.setFontSize(fontSizeM);
                    labelHeight = labelHeightM;
                    charYPad = 15;
                    break;
                case "L":
                    doc.setFontSize(fontSizeL);
                    if (char === "O") {
                        doc.setFontSize(fontSizeL - 3);
                    }
                    labelHeight = labelHeightL;
                    charYPad = 18;
                    if (char.length > 1) {
                        doc.setFontSize(fontSizeL - 10);
                        charSpacer = ' ';
                        charYPad = 16;
                    }
            }
            doc.roundedRect(x, y, labelWidth, labelHeight, 1, 1, 'F');
            doc.text(char + charSpacer + char, x + 16, y + charYPad, { stroke: true },'center');
            doc.text(char + charSpacer + char, x + 16, y + charYPad,'center');

        }

        function createTemplate() {
            // Lines above and below each label
            doc.setLineWidth(0.5);

            for (var v = 1; v < 7; v++) {
                doc.line(margin + (divWidth * v) - (divWidth / 2) - 0.5, margin - 5, margin + (divWidth * v) - (divWidth / 2) - 0.5, margin - 1);
                doc.line(margin + (divWidth * v) - (divWidth / 2) + 0.5, margin - 5, margin + (divWidth * v) - (divWidth / 2) + 0.5, margin - 1);
                doc.line(margin + (divWidth * v) - (divWidth / 2) - 0.5, height - margin + 2, margin + (divWidth * v) - (divWidth / 2) - 0.5, height - margin + 6);
                doc.line(margin + (divWidth * v) - (divWidth / 2) + 0.5, height - margin + 2, margin + (divWidth * v) - (divWidth / 2) + 0.5, height - margin + 6);
            }
        }



        var count = this.state.endTabLabels.length;

        doc.setTextColor(255);
        createTemplate();
        doc.setLineWidth(0.8);

        for (var i = 0; i < count; i++) {
            if (pos === 6) {
                doc.addPage();
                createTemplate();
            }
            pos = (i % 6) + 1;

            var record = this.state.endTabLabels[i];
            var recordNum = record.number;
            var typeId = record.typeId;
            console.log(recordNum);
            console.log(typeId);

            switch(typeId) {
                case 10:
                    personnelRecord(pos, recordNum);
                    break;
                case 32:
                    proposalRecord(pos, recordNum);
                    break;
                case 83:
                    projectRecord(pos, recordNum);
                    break;
                case 3:
                case 8:
                case 11:
                case 14:
                case 19:
                case 27:
                case 29:
                case 56:
                case 63:
                case 77:
                case 88:
                case 89:
                case 90:
                case 91:
                case 92:
                    subjectRecord(pos, recordNum);
                    break;
                // display error label if recordtype isn't recognized
                default:
                    var x = margin + 5.5 + (divWidth * (pos - 1));
                    var y = margin - 1;
                    addLabel(x, y, "err", "XS");
                    break;
            }
        }
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
        // TODO: adding pages

        if (recordLabels.length > 0 || containerReports.length > 0 || enclosureReports.length > 0) {
            var doc = new pdfConverter('p','mm','letter');
        }
        else if (endTabLabels.length > 0) {
            var doc = new pdfConverter('l','mm','letter');
        }
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