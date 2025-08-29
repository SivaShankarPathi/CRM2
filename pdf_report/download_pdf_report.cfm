<!-- Get customer records -->
<cfquery name="getCustomers" datasource="user">
    SELECT id, name, email, phone FROM customers ORDER BY id ASC
</cfquery>

<!-- Optional: Output PDF directly in browser -->
<cfheader name="Content-Disposition" value="inline; filename=Customer_Report.pdf">
<cfcontent type="application/pdf">

<!-- Generate PDF -->
<cfdocument format="PDF" pagetype="A4" orientation="portrait">
    <cfdocumentsection>
        <cfdocumentitem type="header">
            <h2 style="text-align:center; font-family:Arial;">Customer Management Report</h2>
        </cfdocumentitem>

        <table border="1" cellpadding="6" cellspacing="0" width="100%" style="font-family:Arial; font-size:12px;">
            <thead>
                <tr style="background-color:#f2f2f2;">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <cfoutput query="getCustomers">
                    <tr>
                        <td>#id#</td>
                        <td>#encodeForHTML(name)#</td>
                        <td>#encodeForHTML(email)#</td>
                        <td>#encodeForHTML(phone)#</td>
                    </tr>
                </cfoutput>
            </tbody>
        </table>
<cfoutput>
        <p style="text-align:right; font-size:10px; margin-top:30px;">
            Generated on #dateFormat(now(), "dd-mmm-yyyy")# at #timeFormat(now(), "hh:mm tt")#
        </p></cfoutput>
    </cfdocumentsection>
</cfdocument>
