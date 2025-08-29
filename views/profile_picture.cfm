<!DOCTYPE html>
<html>
<head>
    <title>Upload Profile Picture</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/profile_picture.css">
    <link rel="stylesheet" type="text/css" href="/CRM/style/common.css">
</head>
<body>

<cfset msg = "" />

<!--- Handle Upload --->
<cfif structKeyExists(form, "uploadBtn")>
    <cffile action="upload"
            filefield="profilePic"
            destination="#expandPath('/CRM2/uploads/')#"
            nameconflict="makeunique"
            accept="image/jpeg,image/png,image/gif" />

    <!-- Save uploaded filename in session -->
    <cfset session.profile_image = "uploads/#cffile.serverFile#">
    <cfset msg = "uploaded">
</cfif>

<!--- Handle Delete --->
<cfif structKeyExists(url, "delete")>
    <cfif structKeyExists(session, "profile_image")>
        <cfset profilePath = expandPath("/CRM2/#session.profile_image#")>
        <cfif fileExists(profilePath)>
            <cffile action="delete" file="#profilePath#">
        </cfif>
        <cfset structDelete(session, "profile_image")>
    </cfif>
    <cfset msg = "deleted">
</cfif>

<cfif msg NEQ "">
    <script>
        <cfoutput>
            <cfif msg EQ "uploaded">
                alert("Profile picture uploaded successfully!");
            <cfelseif msg EQ "deleted">
                alert("Profile picture deleted successfully!");
            </cfif>
        </cfoutput>
    </script>
</cfif>

<div class="container">
    <cfoutput>
        <h2>Welcome, #session.username#</h2>
        <img src="#session.profile_image ?: '/CRM2/images/default.png'#" 
             alt="Profile Picture" width="150" height="150">

        <!-- Upload form -->
        <form action="index.cfm?crm=profile" method="post" enctype="multipart/form-data">
            <label>Upload New Profile Picture:</label>
            <div class="upload-row">
                <input type="file" name="profilePic" accept="image/*" required>
                <input type="submit" name="uploadBtn" value="Upload">
            </div>
        </form>

        <!-- Delete form -->
        <form action="index.cfm?crm=profile&delete=true" method="post">
            <button type="submit">Delete Profile Picture</button>
        </form>

        <div class="back-home">
            <form action="/CRM2/index.cfm">
                <button type="submit">Back to Home</button>
            </form>
        </div>
    </cfoutput>
</div>

</body>
</html>
