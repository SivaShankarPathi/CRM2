<link rel="stylesheet" type="text/css" href="/CRM2/css/header.css">
<div class="navbar">
    <cfif cgi.script_name CONTAINS "/CRM2/index.cfm">
    <button class="menu-toggle" onclick="toggleMenu()">☰</button>
    </cfif>
    <cfoutput>
        <span class="logged-in">Logged in as: #session.username#</span>
    </cfoutput>
    <a class="logout-link" href="/CRM2/views/logout.cfm">Logout</a>
</div>