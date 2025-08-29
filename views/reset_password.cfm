<cfparam name="form.otp" default="">
<cfparam name="form.newPassword" default="">
<cfparam name="form.confirmPassword" default="">

<cfset errorMsg = "">
<cfset successMsg = "">

<cfif structKeyExists(form, "otp")>
    <!-- Check OTP -->
    <cfif NOT structKeyExists(session, "otp") OR NOT structKeyExists(session, "otpEmail") OR NOT structKeyExists(session, "otpTime")>
        <cfset errorMsg = "Session expired. Please start over.">
    <cfelseif form.otp NEQ session.otp>
        <cfset errorMsg = "Invalid OTP.">
    <cfelseif dateDiff("n", session.otpTime, now()) GT 10>
        <cfset errorMsg = "OTP expired. Please try again.">
    <cfelseif form.newPassword NEQ form.confirmPassword>
        <cfset errorMsg = "Passwords do not match.">
    <cfelse>
        <!-- Password validation -->
        <cfset hasSpecialChar = reFind("[@##\\$%&*!?]", form.newPassword)>
        <cfset hasUppercase = reFind("[A-Z]", form.newPassword)>
        <cfset isLongEnough = len(form.newPassword) GTE 8>

        <cfif NOT isLongEnough>
            <cfset errorMsg = "Password must be at least 8 characters long.">
        <cfelseif hasUppercase EQ 0>
            <cfset errorMsg = "Password must contain at least one uppercase letter.">
        <cfelseif hasSpecialChar EQ 0>
            <cfset errorMsg = "Password must contain at least one special character (@##\\$%&*!?).">
        <cfelse>
            <!-- Update password in database -->
            <cfquery datasource="#application.datasource#">
                UPDATE users
                SET password = <cfqueryparam value="#form.newPassword#" cfsqltype="cf_sql_varchar">
                WHERE username = <cfqueryparam value="#session.username#" cfsqltype="cf_sql_varchar">
            </cfquery>

            <cfset successMsg = "Password reset successfully!">
            <!-- Clear session OTP -->
            <cfset structDelete(session, "otp")>
            <cfset structDelete(session, "otpEmail")>
            <cfset structDelete(session, "otpTime")>
            <cfset structDelete(session, "username")>
        </cfif>
    </cfif>
</cfif>
<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
               <link rel="stylesheet" type="text/css" href="/CRM2/css/reset_password.css">
</head>
<body>
<div class="container">
    <h2>Reset Your Password</h2>

    <cfif len(errorMsg)>
        <p class="error"><cfoutput>#errorMsg#</cfoutput></p>
    </cfif>
    <cfif len(successMsg)>
        <p class="success"><cfoutput>#successMsg#</cfoutput></p>
        <a href="/CRM2/views/login.cfm">Login here</a>
    </cfif>

    <cfif NOT len(successMsg)>
    <form method="post">
        <label>Enter OTP:</label>
        <input type="text" name="otp" required>

        <label>New Password:</label>
        <input type="password" name="newPassword" required>

        <label>Confirm New Password:</label>
        <input type="password" name="confirmPassword" required>

        <button type="submit">Reset Password</button>
    </form>
    </cfif>
</div>
</body>
</html>

