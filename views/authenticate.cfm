<cfparam name="form.username" default="">
<cfparam name="form.password" default="">

<cfset form.username = trim(form.username)>
<cfset form.password = trim(form.password)>

<!-- Prevent empty fields -->
<cfif form.username EQ "" OR form.password EQ "">
    <cflocation url="/CRM2/views/login.cfm?msg=Please+enter+both+username+and+password" addtoken="no">
</cfif>

<!-- Query to check user credentials -->
<cfquery name="getUser" datasource="#application.datasource#">
    SELECT id, username
    FROM users
    WHERE username = <cfqueryparam value="#form.username#" cfsqltype="cf_sql_varchar">
      AND password = <cfqueryparam value="#form.password#" cfsqltype="cf_sql_varchar">
</cfquery>

<!-- If match found, set session and redirect -->
<cfif getUser.recordCount EQ 1>
    <cfset session.userID = getUser.id>
    <cfset session.username = getUser.username>
    <cflocation url="/CRM2/index.cfm" addtoken="no">
<cfelse>
    <cflocation url="/CRM2/views/login.cfm?msg=Incorrect+username+or+password" addtoken="no">
</cfif>
