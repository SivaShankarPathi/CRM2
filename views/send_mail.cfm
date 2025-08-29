<cfquery name="downloadsToday" datasource="user">
    INSERT INTO report_downloads (username, downloaded_at)
    VALUES (
        <cfqueryparam value="#session.username#" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="#now()#" cfsqltype="cf_sql_timestamp">
    )
</cfquery>


<!-- Send email -->
<cfmail 
    to="pathisivashankar@gmail.com"
    from="sivashankarpatthi@gmail.com"
    subject="Customer Report Downloaded"
    type="html">
    <p>User <strong>#session.username#</strong> downloaded the customer report on <strong>#dateFormat(now(), "dd-mmm-yyyy")#</strong> at <strong>#timeFormat(now(), "hh:mm tt")#</strong>.</p>
</cfmail>