<!--- Registration Logic --->
<cfif structKeyExists(form, "username")>
    <cfparam name="form.username" default="">
    <cfparam name="form.email" default="">
    <cfparam name="form.password" default="">
    <cfparam name="form.confirmPassword" default="">

    <!-- Check if username or email already exists -->
    <cfquery name="checkUser" datasource="#application.datasource#">
        SELECT username FROM users 
        WHERE username = <cfqueryparam value="#form.username#" cfsqltype="cf_sql_varchar">
    </cfquery>

    <!-- Password validation -->
    <cfset hasSpecialChar = reFind("[@##\$%&*!?]", form.password)>
    <cfset hasUppercase = reFind("[A-Z]", form.password)>
    <cfset isLongEnough = len(form.password) GTE 8>

    <!-- Validation messages -->
    <cfif checkUser.recordCount GT 0>
        <cfset msg = "exists">
    <cfelseif form.password NEQ form.confirmPassword>
        <cfset msg = "nomatch">
    <cfelseif NOT isValid("email", form.email)>
        <cfset msg = "invalidemail">
    <cfelseif NOT isLongEnough>
        <cfset msg = "toolong">
    <cfelseif hasUppercase EQ 0>
        <cfset msg = "noupper">
    <cfelseif hasSpecialChar EQ 0>
        <cfset msg = "nospecial">
    <cfelse>
        <!-- Insert user into database -->
        <cfquery datasource="user">
            INSERT INTO users (username, email, password)
            VALUES (
                <cfqueryparam value="#form.username#" cfsqltype="cf_sql_varchar">,
                <cfqueryparam value="#form.email#" cfsqltype="cf_sql_varchar">,
                <cfqueryparam value="#form.password#" cfsqltype="cf_sql_varchar">
            )
        </cfquery>
        <cfset msg = "success">
        <cfset form = structNew()>
    </cfif>
</cfif>
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
           <link rel="stylesheet" type="text/css" href="/CRM2/css/register.css">

</head>
<body>
    <div class="container">
        <h2>Register</h2>

        <!-- Message Display -->
        <cfif isDefined("msg")>
            <cfif msg EQ "exists">
                <p class="message error">Username or email already exists.</p>
            <cfelseif msg EQ "nomatch">
                <p class="message error">Passwords do not match.</p>
            <cfelseif msg EQ "invalidemail">
                <p class="message error">Please enter a valid email address.</p>
            <cfelseif msg EQ "toolong">
                <p class="message error">Password must be at least 8 characters long.</p>
            <cfelseif msg EQ "noupper">
                <p class="message error">Password must contain at least one uppercase letter.</p>
            <cfelseif msg EQ "nospecial">
                <p class="message error">Password must include at least one special character (@#$%&*!?).</p>
            <cfelseif msg EQ "success">
                <p class="message success">Registration successful!</p>
            </cfif>
        </cfif>

        <!-- Registration Form -->
        <form action="register.cfm" method="post">
            <label for="username">Username:</label>
            <cfoutput>
    <input type="text" id="username" name="username"
        value="#(msg EQ 'success' ? '' : (structKeyExists(form, 'username') ? form.username : ''))#" required>
</cfoutput>
<label for="email">Email:</label>
<cfoutput>
    <input type="email" id="email" name="email"
        value="#(msg EQ 'success' ? '' : (structKeyExists(form, 'email') ? form.email : ''))#" required>
</cfoutput>


            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>

            <input type="submit" value="Register">
        </form>

        <!-- Login Link -->
        <div class="login-link">
            Already have an account? <a href="/CRM2/views/login.cfm">Login here</a>
        </div>
    </div>
</body>
</html>
