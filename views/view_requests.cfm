<cfparam name="url.search" default="">
<cfparam name="url.department" default="">
<cfset data = application.controller.Requests(url, form)>
<!-- Show popup if redirected with ?msg=updated -->
<cfif structKeyExists(url, "msg") AND url.msg EQ "updated">
    <script>
        window.onload = function() {
            alert("Request updated successfully.");
        };
    </script>
</cfif>

<!--- Get all filtered data (no limit/offset) 
<cfquery name="getRequests" datasource="#application.datasource#">
    SELECT id, title, description, department
    FROM requests
    WHERE user_id = <cfqueryparam value="#session.userID#" cfsqltype="cf_sql_integer">
    <cfif len(trim(url.search))>
        AND (
            title LIKE <cfqueryparam value="%#url.search#%" cfsqltype="cf_sql_varchar"> OR
            description LIKE <cfqueryparam value="%#url.search#%" cfsqltype="cf_sql_varchar">
        )
    </cfif>
    <cfif len(trim(url.department))>
        AND department = <cfqueryparam value="#url.department#" cfsqltype="cf_sql_varchar">
    </cfif>
    ORDER BY id DESC
</cfquery>--->

<!DOCTYPE html>
<html>
<head>
    <title>Your Submitted Requests</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/view_requests.css">
    <link rel="stylesheet" type="text/css" href="/CRM2/css/common.css">
    <script src="/CRM2/js/pagination.js"></script>
    <script src = "https://code.jquery.com/jquery-3.6.0.min.js" > </script> 

</head>
<body>
<div class="container">
    <h2>Your Submitted Requests</h2>

    <!-- Department Filter -->
    <form class="filter-box" method="get" action="/CRM2/views/view_requests.cfm">
        <cfoutput>
        <label for="department">Department</label>
        <select id="department" name="department">
            <option value="">-- All Departments --</option>
            <option value="HR" <cfif url.department EQ "HR">selected</cfif>>HR</option>
            <option value="Finance" <cfif url.department EQ "Finance">selected</cfif>>Finance</option>
            <option value="IT" <cfif url.department EQ "IT">selected</cfif>>IT</option>
            <option value="Sales" <cfif url.department EQ "Sales">selected</cfif>>Sales</option>
            <option value="Admin" <cfif url.department EQ "Admin">selected</cfif>>Admin</option>
        </select>
        <input type="hidden" name="search" value="#url.search#">
        <input type="submit" value="Filter" value="#url.department#">

        <!-- PDF Report -->
        <form action="/CRM2/views/daily_report.cfm" method="post">
        <!--<a href="/CRM2/pdf/generate_pdf.cfm?department=#url.department#" target="_blank" class="pdf-btn" onclick="showPopup()">PDF Report</a>-->
        <a href="/CRM2/index.cfm?crm=pdf&department=#url.department#" target="_blank" class="pdf-btn" onclick="showPopup()">PDF Report</a>
    
        <script>
            function showPopup() {
                alert("Your PDF report is being generated and will open in a new tab!");
            }
        </script>
        </form>
        </cfoutput>
    </form>

    <!-- Search Bar -->
    <form class="search-bar-container" method="get" action="view_requests.cfm">
        <cfoutput>
        <input type="text" name="search" placeholder="Search title or description" value="#url.search#">
        <input type="hidden" name="department" value="#url.department#">
        <input type="submit" value="Search">
        </cfoutput>
    </form>

    <!-- Display Table -->
    <cfif data.getRequests.recordCount EQ 0>
        <p style="text-align: center;">No requests found.</p>
    <cfelse>
        <table id="requestTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <cfoutput query="data.getRequests">
                    <tr>
                        <td>#title#</td>
                        <td>#left(description, 60)#...</td>
                        <td>#department#</td>
                        <td>
                            <a class="edit-btn" href="/CRM2/views/edit_request.cfm?id=#id#">Edit</a>
                            <a class="delete-btn" href="/CRM2/views/delete_request.cfm?id=#id#" onclick="return confirm('Are you sure?');">Delete</a>
                        </td>
                    </tr>
                </cfoutput>
            </tbody>
        </table>

    </cfif>

    <!-- Back Button -->
   <div class="back-home">
        <form action="/CRM2/index.cfm">
            <button type="submit">Back to Home</button>
        </form>
    </div>

<!-- Include your pagination script -->
<script>
    document.addEventListener("DOMContentLoaded", function () {
        initPagination("requestTable", 10);
    });
</script>

</body>
</html>
