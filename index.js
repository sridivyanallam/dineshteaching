const express = require('express');
var http = require('follow-redirects').http;
var request = require('request');
var fs = require('fs');
var convert = require('xml-js');

const app = express();
app.use("/public", express.static("public"));
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    res.render("pages/add");
});


app.post('/emp' , (req ,res)=> {

// let eid = req.body.username;
 var eid = "SRI DIVYA";

    var options = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EMPLOYEE&receiverParty=&receiverService=&interface=SI_EMPLOYEE_DISPLAY&interfaceNamespace=http%3A%2F%2Femployeeportal.com',
        'headers': {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOmthYXIyMDIw',
            // 'Accept': '*/*',
            'Cache-Control': 'no-cache'
        },
        'maxRedirects': 20
    };
    var postData = `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <SOAP-ENV:Body>
      <yq1:ZBAPI_EMPLOYEE xmlns:yq1="urn:sap-com:document:sap:rfc:functions">
        <EMPLOYEE_NAME>${eid}</EMPLOYEE_NAME>
        <ITEMTAB/>
      </yq1:ZBAPI_EMPLOYEE>
    </SOAP-ENV:Body>
  </SOAP-ENV:Envelope>
  `;
    var req1 = http.request(options, function (res1) {
        var chunks = [];
        res1.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res1.on("end", function (chunk) {
            var body = Buffer.concat(chunks);

            var yd = body.toString();
            var result2 = convert.xml2json(yd, { compact: true, spaces: 4, ignoreAttributes: true, fullTagEmptyElement: true, alwaysChildren: true });
            var result34 = JSON.parse(result2);
            console.log(result2);
             var empdetails = result34["SOAP:Envelope"]["SOAP:Body"]["ns0:ZBAPI_EMPLOYEE.Response"]["ITEMTAB"]["item"];
            // console.log(yd);
            // console.log(lotdetails);
            console.log(result34);
            
          
            res.render('pages/empd', { empdetails: empdetails });
        });
        res1.on("error", function (error) {
            console.error(error);
        });
    });
    req1.write(postData);
    req1.end();

});



app.listen(4000, () => {
    console.log("server running on the port 4000");
});
