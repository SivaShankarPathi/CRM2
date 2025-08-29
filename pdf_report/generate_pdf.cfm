<!-- Department Filter -->
<cfparam name="url.department" default="">
<cfset selectedDept = trim(url.department)>

<!-- Log Download -->
<cfquery datasource="user">
    INSERT INTO report_downloads (user_id, username, downloaded_at)
    VALUES (
        <cfqueryparam value="#session.userID#" cfsqltype="cf_sql_integer">,
        <cfqueryparam value="#session.username#" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="#now()#" cfsqltype="cf_sql_timestamp">
    )
</cfquery>

<!-- Fetch filtered requests (removed user_id filter) -->
<cfquery name="getRequests" datasource="user">
    SELECT title, description, department
    FROM requests
    <cfif selectedDept NEQ "">
        WHERE department LIKE <cfqueryparam value="%#selectedDept#%" cfsqltype="cf_sql_varchar">
    </cfif>
    ORDER BY id DESC
</cfquery>

<!-- Output PDF in browser -->
<cfheader name="Content-Disposition" value="inline; filename=Submitted_Requests.pdf">
<cfcontent type="application/pdf">

<!-- PDF Generation -->
<cfdocument format="PDF" pagetype="A4" orientation="portrait">
    <cfdocumentsection>
        <cfdocumentitem type="header">
            <h2 style="text-align:center; font-family:Arial;">Submitted Requests Report</h2>
            <p style="text-align:center;">
                Department: <cfoutput>#selectedDept EQ "" ? "All" : selectedDept#</cfoutput>
            </p>
        </cfdocumentitem>

        <table border="1" cellpadding="6" cellspacing="0" width="100%" style="font-family:Arial; font-size:12px;">
            <thead>
                <tr style="background-color:#007bff; color:white;">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Department</th>
                </tr>
            </thead>
            <tbody>
                <cfoutput query="getRequests">
                    <tr>
                        <td>#encodeForHTML(title)#</td>
                        <td>#encodeForHTML(description)#</td>
                        <td>#encodeForHTML(department)#</td>
                    </tr>
                </cfoutput>
                <cfif getRequests.recordCount EQ 0>
                    <tr>
                        <td colspan="3" style="text-align:center; color:red;">No data found for this department.</td>
                    </tr>
                </cfif>
            </tbody>
        </table>

        <cfoutput>
            <p style="text-align:right; font-size:10px; margin-top:30px;">
                Generated on #dateFormat(now(), "dd-mmm-yyyy")# at #timeFormat(now(), "hh:mm tt")#
            </p>
        </cfoutput>
    </cfdocumentsection>
</cfdocument>
