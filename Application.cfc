<cfcomponent output="false">
    <!-- Application Settings -->
    <cfset this.name = "CRMApp">
    <cfset this.sessionManagement = true>
    <cfset this.sessionTimeout = createTimeSpan(0,0,30,0)>
    <cfset this.applicationTimeout = createTimeSpan(1,0,0,0)>
    <cfset this.datasource = "user"> <!-- Replace with your actual datasource name -->
    <cfset this.mappings = { "/cfc" = ExpandPath("./cfc") }>

    <!-- Application Start -->
    <cffunction name="onApplicationStart" returnType="boolean" output="false">
        <cfset application.datasource = this.datasource>
<cfset application.controller = new controller()>

        <cfreturn true>
    </cffunction>

    <!-- Session Start -->
    <cffunction name="onSessionStart" returnType="void" output="false">
        <cfset session.started = now()>
    </cffunction>

    <!-- Session End -->
    <cffunction name="onSessionEnd" returnType="void" output="false">
        <cfargument name="sessionScope" required="true">
        <cflog file="sessionLog" 
               text="Session ended for user: #structKeyExists(arguments.sessionScope, 'username') ? arguments.sessionScope.username : 'Unknown'#">
    </cffunction>

    <!-- Application End -->
    <cffunction name="onApplicationEnd" returnType="void" output="false">
        <cfargument name="applicationScope" required="true">
        <cflog file="appLog" text="Application CRMApp ended at #now()#">
    </cffunction>

    <!-- Runs before every request -->
    <cffunction name="onRequestStart" returnType="boolean" output="false">
        <cfargument name="targetPage" required="true">

        <!-- Ensure datasource -->
        <cfif NOT structKeyExists(application, "datasource")>
            <cfset application.datasource = this.datasource>
        </cfif>

        <cfset var currentPage = lcase(cgi.script_name)>

        <!-- Public pages -->
        <cfif findNoCase("login.cfm", currentPage) OR
              findNoCase("authenticate.cfm", currentPage) OR
              findNoCase("register.cfm", currentPage) OR
              findNoCase("reset_password.cfm", currentPage) OR
              findNoCase("forgot_password.cfm", currentPage)>
            <cfreturn true>
        </cfif>

       <cfif structKeyExists(url, "ajax") AND url.ajax EQ "true">
            <cfreturn true>
        </cfif>

        <!-- Redirect if not logged in -->
        <cfif NOT structKeyExists(session, "userID")>
            <cflocation url="/CRM2/views/login.cfm?msg=Please+login+first" addtoken="false">
            <cfreturn false>
        </cfif>

        <cfreturn true>
    </cffunction>
</cfcomponent>
