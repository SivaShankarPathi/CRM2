<cfparam name="form.username" default="">
<cfparam name="form.email" default="">
<cfset showEmailPrompt = false>
<cfset msg = "">

<cfif structKeyExists(form, "username")>
    <!-- Query the user -->
    <cfquery name="getUser" datasource="#application.datasource#">
        SELECT id, username, email FROM users
        WHERE username = <cfqueryparam value="#form.username#" cfsqltype="cf_sql_varchar">
    </cfquery>

    <cfif getUser.recordCount EQ 0>
        <cfset msg = "notfound">
    <cfelse>
        <cfset userId = getUser.id>
        <cfset userEmail = trim(getUser.email)>

        <!-- If no email in DB -->
        <cfif len(userEmail) EQ 0>
            <!-- If email is now submitted, update it -->
            <cfif len(trim(form.email)) GT 0 AND isValid("email", form.email)>
                <!-- Save new email -->
                <cfquery datasource="user">
                    UPDATE users SET email = <cfqueryparam value="#form.email#" cfsqltype="cf_sql_varchar">
                    WHERE id = <cfqueryparam value="#userId#" cfsqltype="cf_sql_integer">
                </cfquery>
                <cfset userEmail = form.email>
            <cfelse>
                <!-- Email still not entered -->
                <cfset showEmailPrompt = true>
            </cfif>
        </cfif>

        <!-- If email is now available, send OTP -->
        <cfif len(trim(userEmail)) GT 0>
            <cfset session.otp = numberFormat(rand()*1000000, "000000")>
            <cfset session.username = form.username>
            <cfset session.otpEmail = userEmail>
            <cfset session.otpTime = now()>

            <!-- Send OTP -->
            <cfmail 
                to="#userEmail#"
                from="sivashankarpatthi@gmail.com"
                subject="Reset Password OTP"
                type="html">
                Hello #form.username#,<br><br>
                Your OTP for resetting your password is: <strong>#session.otp#</strong><br>
                This OTP is valid for 10 minutes.<br><br>
                Thank you.
            </cfmail>

            <!-- Redirect to reset page -->
            <cflocation url="/CRM2/views/reset_password.cfm" addtoken="no">
        </cfif>
    </cfif>
</cfif>
<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password</title>
     <link rel="stylesheet" type="text/css" href="/CRM2/css/forgot_password.css">
</head>
<body>
<div class="container">
    <h2>Forgot Password</h2>

    <!-- Error Messages -->
    <cfif msg EQ "notfound">
        <p class="error">Username not found.</p>
    <cfelseif msg EQ "emptyemail">
        <p class="error">Email is required to send OTP. Please enter your email.</p>
    </cfif>

    <form method="post">
        <div class="form-group">
            <label>Username:</label>
            <input type="text" name="username" value="<cfoutput>#form.username#</cfoutput>" required>
        </div>

        <!-- Ask for email if not in DB -->
        <cfif showEmailPrompt>
            <div class="form-group">
                <label>Email (not found in your account):</label>
                <input type="email" name="email" required>
            </div>
        </cfif>

        <button type="submit">Send OTP</button>
    </form>
</div>
</body>
</html>

