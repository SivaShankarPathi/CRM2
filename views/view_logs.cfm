<!-- Only allow admin user -->
<cfif NOT structKeyExists(session, "username") OR session.username NEQ "Admin">
    <cfoutput>
        <h2 style="color:red; text-align:center;">Access Denied</h2>
        <p style="text-align:center;">Only the admin can view this page.</p>
        <div style="text-align:center;"><a href="index.cfm">Back to Home</a></div>
    </cfoutput>
    <cfabort>
</cfif>

<!-- Try to log access and fetch logs -->
<cftry>
    <!-- Log access -->
    <cflog file="access_logs" text="Admin #session.username# accessed user logs at #now()#">

    <cfcatch type="any">
        <cfoutput>
            <h2 style="color:red; text-align:center;">An error occurred while loading logs.</h2>
            <p style="text-align:center;">#cfcatch.message#</p>
            <div style="text-align:center;"><a href="index.cfm">Back to Home</a></div>
        </cfoutput>
        <cfabort>
    </cfcatch>
</cftry>

<!DOCTYPE html>
<html>
<head>
    <title>User Activity Logs</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/view_logs.css">
    <link rel="stylesheet" type="text/css" href="/CRM2/css/common.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> 
    <script src="/CRM2/js/pagination.js"></script>
    <script>
        window.onload = function() {
            initPagination("logsTable");
        };
    </script>
</head>
<body>

    <h2>User Activity Logs</h2>

    <table id="logsTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Action</th>
                <th>Request ID</th>
                <th>Timestamp</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <cfoutput query="data.getLogs">
                <tr>
                    <td>#id#</td>
                    <td>#username#</td>
                    <td>#action#</td>
                    <td><cfif NOT len(request_id) OR request_id EQ 0>N/A<cfelse>#request_id#</cfif></td>
                    <td>#dateFormat(timestamp, "yyyy-mm-dd")# #timeFormat(timestamp, "HH:mm:ss")#</td>
                    <td>#details#</td>
                </tr>
            </cfoutput>
        </tbody>
    </table>

    <!-- Back Button -->
    <div class="back-home">
        <form action="/CRM2/index.cfm">
            <button type="submit">Back to Home</button>
        </form>
    </div>

</body>
</html>
