<cfparam name="url.id" default="0">
<cfquery name="getReq" datasource="user">
    SELECT id, title, description, department FROM requests
    WHERE id = <cfqueryparam value="#url.id#" cfsqltype="cf_sql_integer">
</cfquery>

<cfif getReq.recordCount EQ 0>
    <cflocation url="view_requests.cfm?msg=notfound">
</cfif>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Request</title>
        <link rel="stylesheet" type="text/css" href="/CRM2/css/edit_request.css">
</head>
<body>
    <div class="container">
        <h2>Edit Request</h2>
        <cfoutput>
        <form action="/CRM2/views/update_request.cfm?id=#url.id#" method="post">
            <input type="hidden" name="id" value="#getReq.id#">

            <label for="title">Title</label>
            <input type="text" id="title" name="title" value="#getReq.title#" required>

            <label for="description">Description</label>
            <textarea id="description" name="description" required>#getReq.description#</textarea>
            <label for="department">Department:</label>
           <label for="department">Department:</label>
<select name="department" id="department" required>
    <option value="">-- Select Department --</option>
    <option value="HR" #getReq.department EQ "HR" ? "selected" : ""#>HR</option>
    <option value="Finance" #getReq.department EQ "Finance" ? "selected" : ""#>Finance</option>
    <option value="IT" #getReq.department EQ "IT" ? "selected" : ""#>IT</option>
    <option value="Sales" #getReq.department EQ "Sales" ? "selected" : ""#>Sales</option>
    <option value="Admin" #getReq.department EQ "Admin" ? "selected" : ""#>Admin</option>
</select>

            <div class="btn-row">
                <input type="submit" value="Update">
                <a href="/CRM2/views/view_requests.cfm" class="back-btn">Back</a>
            </div>
        </form>
        </cfoutput>
    </div>
</body>
</html>