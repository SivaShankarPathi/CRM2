<cfset  crm = structKeyExists(url, "crm") ? url.crm : "dashboard">
<cfset  data = {} />

<cfif crm eq "dashboard">
    <cfset data = application.controller.dashboard() />
    <cfinclude template="views/dashboard.cfm" />
<cfelseif crm EQ "profile">
    <cfset data = application.controller.profile(url, form) />
    <cfinclude template="views/profile_picture.cfm" />
<cfelseif crm eq "submitRequest">
    <cfset data = application.controller.submitRequests(url, form) />
    <cfinclude template="views/submit_requests.cfm" />
<cfelseif crm eq "viewRequests">
    <cfset data = application.controller.Requests(url, form) />
    <cfinclude template="views/view_requests.cfm" />
<cfelseif crm eq "pdf">
    <cfinclude template="pdf_report/generate_pdf.cfm" />
<cfelseif crm eq "pdf2">
    <cfinclude template="pdf_report/download_pdf_report.cfm" />
<cfelseif crm eq "edit">
    <cfinclude template="views/edit_request.cfm" />
<cfelseif crm eq "update">
    <cfinclude template="views/update_request.cfm" />
<cfelseif crm eq "delete">
    <cfinclude template="views/delete_request.cfm" />
<cfelseif crm eq "logs">
    <cfset data = application.controller.logs(url, form) />
    <cfinclude template="views/view_logs.cfm" />
<cfelseif crm eq "users">
     <cfset data = application.controller.users(url, form) />
    <cfinclude template="views/registered_users.cfm" />
<cfelseif crm eq "customers">
        <cfinclude template="views/customer.cfm" />
</cfif>