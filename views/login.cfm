<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
 <link rel="stylesheet" type="text/css" href="/CRM2/css/login.css">
</head>
<body>
    <div class="login-box">
        <h2>Login</h2>

        <!-- Show error message if ?msg= is in the URL -->
        <cfif structKeyExists(url, "msg")>
            <div class="error-message"><cfoutput>#url.msg#</cfoutput></div>
        </cfif>

        <form action="/CRM2/views/authenticate.cfm" method="post">
            <label for="username">Username:</label>
            <input type="text" name="username" placeholder="Enter Username" required>
            <label for="Password">Password:</label>
            <input type="password" name="password" placeholder="Enter Password" required>
            <input type="submit" value="Login">
        </form>

        <form action="/CRM2/views/register.cfm">
            <input class="register-btn" type="submit" value="Register">
        </form>
        <p style="text-align:center; margin-top:10px;">
    <a href="/CRM2/views/forgot_password.cfm">Forgot your password?</a>
</p>

    </div>

    <!-- Show logout popup if redirected with ?logout=1 -->
    <cfif structKeyExists(url, "logout")>
        <script>
            window.onload = function() {
                alert("You have been logged out successfully.");
            };
        </script>
    </cfif>
</body>
</html>
