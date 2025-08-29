<cfif NOT ( structKeyExists(URL, "crm") AND URL.crm EQ "submitRequest" )>
   <cfinclude template="/CRM2/includes/header.cfm">
</cfif>
<link rel="stylesheet" type="text/css" href="/CRM2/css/index.css">
<div id="dropdown" class="dropdown-menu">
    <a href="index.cfm?crm=profile">Go to My Profile</a>
    <a href="index.cfm?crm=submitRequest">Submit Requests</a>
    <a href="index.cfm?crm=viewRequests">View Requests</a>
    <cfif structKeyExists(session, "username") AND session.username EQ "Admin">
        <a href="index.cfm?crm=logs">View Logs</a>
        <a href="index.cfm?crm=customers">Customer Management</a>
        <a href="index.cfm?crm=users">Registered Users</a>
    </cfif>
</div>

<cfinclude template="/CRM2/router.cfm">
<script src="/CRM2/js/index.js"></script>
<cfinclude template="/CRM2/includes/footer.cfm">
