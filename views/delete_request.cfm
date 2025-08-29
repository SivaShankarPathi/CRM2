
<cfparam name="url.id" default="0">

<!-- Delete the request -->
<cfquery datasource="#application.datasource#">
    DELETE FROM requests
    WHERE id = <cfqueryparam value="#url.id#" cfsqltype="cf_sql_integer">
</cfquery>

<!-- Log the delete action -->
<cfquery datasource="user">
    INSERT INTO user_logs (username, action, request_id, timestamp, details)
    VALUES (
        <cfqueryparam value="#session.username#" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="DELETE" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="#url.id#" cfsqltype="cf_sql_integer">,
        NOW(),
        <cfqueryparam value="Deleted request ID #url.id#" cfsqltype="cf_sql_varchar">
    )
</cfquery>

<!-- Redirect -->
<cflocation url="/CRM2/views/view_requests.cfm?msg=deleted">
