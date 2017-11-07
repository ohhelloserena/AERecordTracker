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
        //TODO: add location and type of record? eg "BURNABY-PROJECT RECORDS"
        var margin = 12.7;
        var width = 215.9;
        var height = 279.4;
        var headerHeight = 24;
        var headerX = margin + 3;
        var headerWidth = width - (margin * 2.7);
        var topAlign = margin + headerHeight + 7;
        const notesXPad = 25;
        const titlePad = 14;
        const titleFontSize = 13;
        const recordNumFontSize = 14;
        var imgData = "data:image/png;base64,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KogJQBgTwDY2svxnpMfbWE/PIreg1qR0YuI96gvxJgB8652YGG+ZmPhWg4p9CED7x2lfPhk41L8X68DQrqrOTcO54D/iHz9bBdpzHH6RAAABm2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42OTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj41MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrKBybEAAAS40lEQVRoBbXadYwfRRsH8LlecXeHK148QEtwd4dACCGkuAQLtE2BEC5YQoIVCO4hOARv8VBapMXdKe4UKS7H7/PQ597N3t5x/PE+yd7szs488n1kZud3bX/99VfXH3/8UQYOHFja2tpKV1dXtKVF7uv0559/xtjsN/f333+Pvummmy66Pf/6669l5plnzmHdLRlN1Fv/d999V6affvoy00wzNU37v/S1AYVCn376afnxxx/LXHPNVRhHmRlnnLGH0AEDBpTWnPLbb7+V9vb2Mvfcc8f4HAhI74FnbJ16M76p3/xffvkl+GvffffdcJix3pGf+pBZJ86hD128dwGYI+mvH02dOrUstNBCZcUVVwx+A3V+8skn5aGHHgqh88wzTwj78MMPw2DvqySiMP/2229DQYyGDh1azPv5559j6GyzzRaeFS39IUY2gUJxEULWU089VZ544ony8ssvh3704Dwt4xhap59++ilAoW86a5ZZZin6v/rqq2gFQUdHR9l6663L0ksvXWaYYYYS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";

        var testContainer = {"records":[{"number": "SAS-LOP/1",
            "typeId": 10,
            "closedDate":"2017-07-38",
            "clientName": "Client #1",
            "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
            "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
        },
            {"number": "20012183.00.E.05.00:01",
                "typeId": 83,
                "closedDate":"2017-07-38",
                "clientName": "Client #2",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "20172064.00.S.04.00",
                "typeId": 83,
                "closedDate":"2017-07-38",
                "clientName": "Client #3",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "EDM_P_2004.008",
                "typeId": 32,
                "closedDate":"2017-07-38",
                "clientName": "Client #4",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "CEO-2017/019",
                "typeId": 3,
                "closedDate":"2017-07-38",
                "clientName": "Client #5",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "AGL-2006/001",
                "typeId": 3,
                "closedDate":"2017-07-38",
                "clientName": "Client #6",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "BUR_P_2017.706",
                "typeId": 32,
                "closedDate":"2017-07-38",
                "clientName": "Client #7",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            },
            {"number": "AGL-2006/001",
                "typeId": 3,
                "closedDate":"2017-07-38",
                "clientName": "Client #8",
                "title": "ENGINEERING SERVICES - DESIGN - Design Reports - Osoyoos Indian Band - Drinking Water System Improvement Design - _Enclosure Volume 2",
                "notes": "(Enclosed Folder:)\n1. Report, July 2015 - Osoyoos I.R. No. 1 Domestic Water System Improvements (CPMS 11131)"
            }
        ]
        };
        var count = testContainer.records.length;

        function getterTime(date) {
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var pm = false;
            if (h > 12 && h < 24) {
                h = h % 12;
                pm = true;
            }
            if (h === 0 || h === 24) {
                h = 12;
            }
            if (m.toString().length === 1) {
                m = "0" + m;
            }
            if (s.toString().length === 1) {
                s = "0" + s;
            }
            var t = h + ":" + m + ":" + s + (pm ? " PM" : " AM");

            return t;
        }

        function getterDate(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month.toString().length === 1) {
                month = "0" + month;
            }
            var day = date.getDate();
            if (day.toString().length === 1) {
                day = "0" + day;
            }
            var d = year+'-'+(month)+'-'+day;
            return d;
        }

        function createTemplate() {
            // HEADER -------------------------
            doc.setDrawColor(0);
            doc.setFillColor(0,0,0);
            doc.rect(headerX + 1, margin + 1, headerWidth, headerHeight, 'F');    //Header rect
            doc.setFillColor(255,255,255);
            doc.rect(headerX, margin, headerWidth, headerHeight, 'FD');    //Header rect
            doc.addImage(imgData, 'JPEG', headerX + 2, margin + 3, (69/4), (50/4));
            doc.setFontType("bold");
            doc.setFontSize(12);
            doc.text(64, 20, 'AE Records Listing - Basic');
            doc.setFontType("italic");
            doc.setFontSize(9);
            doc.text(152, 20, "Page");
            doc.text(152, 23.5, "Date");
            doc.text(152, 27, "Time");
            doc.text(152, 30.5, "Login Name");

            doc.setDrawColor(168,170,173)
            doc.line(headerX, margin + headerHeight + 2, headerWidth + 17, margin + headerHeight + 2);

            // Set header variables
            doc.setFontType("normal");
            doc.setFontSize(9);
            doc.text(173, 20, page.toString());
            doc.text(173, 23.5, date);
            doc.text(173, 27, time);
            doc.text(173, 30.5, loginName);
            topAlign = margin + headerHeight + 7;
        }

        // header variables
        var page = 1;
        var today = new Date();
        var date = getterDate(today);
        var time = getterTime(today);
        var loginName = "Tamm, Nicole";         // TODO get this

        var doc = new jsPDF('p','mm','letter'); //612 x 792, 216 x 279
        createTemplate();

        for (i = 0; i < count; i++) {
            var record = testContainer.records[i];
            doc.setFontType("bold");             // needed for border calculation

            var recordNumber = record.number;
            var title = record.title;
            doc.setFontSize(titleFontSize);     // needed for border calculation
            var splitTitle = doc.splitTextToSize(title, headerWidth);
            var titleHeight = splitTitle.length * titleFontSize * 1.2 / 72 * 25.4;
            var dateClosed = record.closedDate;
            var clientName = record.clientName;
            var notes = record.notes;
            doc.setFontSize(10);                 // needed for border calculation
            var splitNotes = doc.splitTextToSize(notes, headerWidth - notesXPad);
            var notesHeight = splitNotes.length * 10 * 1.2 / 72 * 25.4;

            // Calculate bottom boundary first and add page if it overflows
            var border = topAlign + titlePad + titleHeight + notesHeight;

            if (border > height - margin) {
                doc.addPage();
                page++;
                createTemplate();
                border = topAlign + titlePad + titleHeight + notesHeight; // re-calculate border in case of overflow
            }

            doc.setFontType("bold");
            doc.setFontSize(recordNumFontSize);
            // Record Number
            doc.text(headerX, topAlign, recordNumber);
            // Title
            doc.setFontSize(titleFontSize);
            doc.text(headerX + 2, topAlign + titlePad, splitTitle);
            // Date Closed
            doc.setFontSize(10);
            doc.text(headerX + 157, topAlign, dateClosed);
            // Client Name
            doc.text(headerX + 25, topAlign + 6, clientName);
            // Notes
            doc.setFontSize(10);
            doc.text(headerX + notesXPad, topAlign + titlePad + titleHeight, splitNotes);

            // static headers
            doc.setFontType("italic");
            doc.setFontSize(9);
            doc.text(headerX + 2, topAlign + 6, "Client Name");
            doc.text(headerX + 144, topAlign, "Dat Clo");
            doc.text(headerX + 2, topAlign + titlePad + titleHeight, "Notes");

            doc.line(headerX, border, headerWidth + 17, border);

            topAlign = border + 7;
        }
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