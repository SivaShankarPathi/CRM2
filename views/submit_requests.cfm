<!DOCTYPE html>
<html>
<head>
    <title>Submit Request</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/submit_requests.css">
</head>
<body>
    <!-- Navbar -->
    <div class="navbar">
        <div class="menu-right">
            <a href="/CRM2/index.cfm">Home</a>
            <a href="/CRM2/index.cfm?crm=viewRequests">View Requests</a>
            <a href="/CRM2/views/logout.cfm">Logout</a>
        </div>
    </div>

    <!-- Form Container -->
    <div class="container">
        <h2>Submit a New Request</h2>
        <form action="/CRM2/views/submit_requests.cfm" method="post">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Enter title" required>

            <label for="description">Description:</label>
            <textarea name="description" id="description" placeholder="Enter description" rows="5" required></textarea>

            <label for="department">Department:</label>
            <select name="department" id="department" required>
                <option value="">-- Select Department --</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Admin">Admin</option>
            </select>

            <input type="submit" name="submit" value="Submit Request">
        </form>

        <!-- Success Message -->
        <cfif structKeyExists(url, "msg")>
            <div class="message"><cfoutput>#url.msg#</cfoutput></div>
        </cfif>
    </div>

</body>
</html>

<!-- Backend Logic -->
<cfif structKeyExists(form, "submit")>
    <cfset title = trim(form.title)>
    <cfset description = trim(form.description)>
    <cfset department = trim(form.department)>
    <cfset userID = session.userID>
    <cfset username = session.username>

    <!--- Insert request 
    <cfquery name="insertRequest" datasource="user">
        INSERT INTO requests (user_id, title, description, department)
        VALUES (
            <cfqueryparam value="#userID#" cfsqltype="cf_sql_integer">,
            <cfqueryparam value="#title#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#description#" cfsqltype="cf_sql_longvarchar">,
            <cfqueryparam value="#department#" cfsqltype="cf_sql_varchar">
        )
    </cfquery>--->

    <!-- Get inserted request ID -->
    <cfquery name="getLastId" datasource="user">
        SELECT LAST_INSERT_ID() AS id
    </cfquery>

    <!-- Insert log entry -->
    <cfquery datasource="user">
        INSERT INTO user_logs (username, action, request_id, timestamp, details)
        VALUES (
            <cfqueryparam value="#username#" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="SubmitRequest" cfsqltype="cf_sql_varchar">,
            <cfqueryparam value="#getLastId.id#" cfsqltype="cf_sql_integer">,
            NOW(),
            <cfqueryparam value="Submitted request with title '#title#'" cfsqltype="cf_sql_varchar">
        )
    </cfquery>

    <!-- Redirect with message -->
    <cfoutput>
        <script>
            alert("Request submitted successfully!");
            window.open("submit_requests.cfm?msg=Request+submitted+successfully", "_blank");
        </script>
    </cfoutput>
</cfif>
