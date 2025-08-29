<!--- Get all users at once 
<cfquery name="getUsers" datasource="#application.datasource#">
    SELECT id, username, admin_status
    FROM users
    ORDER BY id ASC
</cfquery> --->

<!DOCTYPE html>
<html>
<head>
    <title>Registered Users</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/registered_users.css">
    <link rel="stylesheet" type="text/css" href="/CRM2/css/common.css">
    <script src = "https://code.jquery.com/jquery-3.6.0.min.js" > </script> 
    <script src="/CRM2/js/pagination.js"></script> <!-- Your shared JS file -->
</head>
<body>

    <h2 style="text-align:center;">Registered Users</h2>

    <table id="userTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Admin Status</th>
            </tr>
        </thead>
        <tbody>
            <cfoutput query="data.getUsers">
                <tr>
                    <td>#id#</td>
                    <td>#username#</td>
                    <td>#admin_status#</td>
                </tr>
            </cfoutput>
        </tbody>
    </table>

    <div class="back-home">
        <form action="/CRM2/index.cfm">
            <button type="submit">Back to Home</button>
        </form>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            initPagination("userTable", 8); // Adjust rows per page as needed
        });
    </script>

</body>
</html>
