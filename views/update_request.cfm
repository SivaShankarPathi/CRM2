<cfparam name="form.id" default="">
<cfparam name="form.title" default="">
<cfparam name="form.description" default="">
<cfparam name="form.department" default="">
<!-- Sanitize input -->
<cfset requestID = trim(form.id)>
<cfset title = trim(form.title)>
<cfset description = trim(form.description)>
<cfset department = trim(form.department)>
<cfset username = session.username>

<!-- Update the request -->
<cfquery datasource="#application.datasource#">
    UPDATE requests
    SET title = <cfqueryparam value="#title#" cfsqltype="cf_sql_varchar">,
        description = <cfqueryparam value="#description#" cfsqltype="cf_sql_longvarchar">,
        department = <cfqueryparam value="#department#" cfsqltype="cf_sql_longvarchar">
    WHERE id = <cfqueryparam value="#requestID#" cfsqltype="cf_sql_integer">
</cfquery>

<!-- Log the update -->
<cfquery datasource="user">
    INSERT INTO user_logs (username, action, request_id, timestamp, details)
    VALUES (
        <cfqueryparam value="#username#" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="UPDATE" cfsqltype="cf_sql_varchar">,
        <cfqueryparam value="#requestID#" cfsqltype="cf_sql_integer">,
        NOW(),
        <cfqueryparam value="Updated request ID #requestID# with title '#title#'" cfsqltype="cf_sql_varchar">
    )
</cfquery>

<!-- Redirect to view page with message -->
<cfset requestID = form.id>
<cflocation url="/CRM2/views/view_requests.cfm?id=#requestID#&msg=updated" addToken="false">

