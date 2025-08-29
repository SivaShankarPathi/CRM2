<cfcomponent output="false">
    <cffunction name="init" access="public" returntype="controller">
        <cfreturn this>
    </cffunction>

    <cffunction name="dashboard" access="public" returntype="struct">
        <cfset var data = {} />
        <cfset data.message = "Welcome to the CRM Dashboard" />
        <cfreturn data />
    </cffunction>
    <!-- Profile orchestration: decide action, delegate to model, always return a full data struct -->
    <cffunction name="profile" access="public" returntype="struct" output="false">
        <cfargument name="urlScope" required="false" default="#url#">
        <cfargument name="formScope" required="false" default="#form#">

        <cfset var svc   = createObject("component","CRM2.models.profile_picture")>
        <cfset var userId = session.userID>
        <cfset var msg   = "">
        <cfset var data  = {}>

        <!-- Decide action -->
        <cfif structKeyExists(arguments.urlScope, "delete")>
            <cfset svc.deletePicture(userId)>
            <cfset msg = "deleted">
        <cfelseif structKeyExists(arguments.formScope, "uploadBtn") AND structKeyExists(arguments.formScope, "profilePic")>
            <cfset svc.uploadPicture(userId)>
            <cfset msg = "uploaded">
        </cfif>

        <!-- Always fetch latest data for the view -->
        <cfset data = svc.getData(userId)>

        <!-- Add message if any -->
        <cfif len(msg)>
            <cfset data.msg = msg>
        </cfif>

        <cfreturn data>
    </cffunction>
   
    <!-- Customer page loader -->
<cffunction name="customer" access="public" returntype="struct" output="false">
    <cfset var local = {} />
    <cfset local.data = {
        page = "views/customer.cfm"
    } />
    <cfreturn local.data />
</cffunction>
<!-- Customer JSON API -->
<cffunction name="customers" access="remote" returntype="any" returnformat="json">
    <cfargument name="form" type="struct" required="false" default="#structNew()#">

    <cfset var customerService = createObject("component", "components.customer")>
    <cfset var result = {} />

    <cfif structKeyExists(arguments.form, "method")>
        <cfswitch expression="#arguments.form.method#">
            <cfcase value="addCustomer">
                <cfset result = customerService.addCustomer(arguments.form.name, arguments.form.email, arguments.form.phone)>
            </cfcase>
            <cfcase value="editCustomer">
                <cfset result = customerService.editCustomer(arguments.form.id, arguments.form.name, arguments.form.email, arguments.form.phone)>
            </cfcase>
            <cfcase value="deleteCustomer">
                <cfset result = customerService.deleteCustomer(arguments.form.id)>
            </cfcase>
            <cfcase value="searchCustomers">
                <cfset result = customerService.searchCustomers(arguments.form.query)>
            </cfcase>
            <cfcase value="checkEmail">
                <cfset result = customerService.checkEmail(arguments.form.email)>
            </cfcase>
            <cfdefaultcase>
                <cfset result = { "success" = false, "message" = "Unknown method" } />
            </cfdefaultcase>
        </cfswitch>
    <cfelse>
        <!-- Default: return all customers -->
        <cfset result = customerService.getCustomers()>
    </cfif>

    <cfreturn result>
</cffunction>

<!--- registered user --->
<cffunction name="users" access="public" returntype="struct" output="false">
        <cfargument name="url" required="false">
        <cfargument name="form" required="false">
        <cfset var data = {} />
        <!--- Query to get all users --->
        <cfquery name="getUsers" datasource="#application.datasource#">
            SELECT id, username, admin_status
            FROM users
            ORDER BY id ASC
        </cfquery>
        <!--- Put query into struct so router can pass to view --->
        <cfset data = { getUsers = getUsers } />
        <cfreturn data />
    </cffunction>

    
    <cffunction name="logs" access="public" returntype="struct" output="false">
        <cfargument name="url" required="false">
        <cfargument name="form" required="false">
    <cfset var data = {} />
    <!--- Query to get all logs --->
    <cfquery name="getLogs" datasource="#application.datasource#">
        SELECT id, username, action, request_id, timestamp, details
        FROM user_logs
        ORDER BY timestamp DESC
    </cfquery>
    <!--- Package the query into struct so router can pass to the view --->
    <cfset data = { getLogs = getLogs } />
    <cfreturn data />
</cffunction>

    <cffunction name="Requests" access="public" returntype="struct" output="false">
    <cfargument name="url" required="false">
    <cfargument name="form" required="false">

    <cfset var data = {} />

    <cfquery name="getRequests" datasource="#application.datasource#">
        SELECT id, title, description, department
        FROM requests
        WHERE user_id = <cfqueryparam value="#session.userID#" cfsqltype="cf_sql_integer">

        <!--- Only check search if it exists --->
        <cfif structKeyExists(url, "search") AND len(trim(url.search))>
            AND (
                title LIKE <cfqueryparam value="%#url.search#%" cfsqltype="cf_sql_varchar"> OR
                description LIKE <cfqueryparam value="%#url.search#%" cfsqltype="cf_sql_varchar">
            )
        </cfif>

        <!--- Only check department if it exists --->
        <cfif structKeyExists(url, "department") AND len(trim(url.department))>
            AND department = <cfqueryparam value="#url.department#" cfsqltype="cf_sql_varchar">
        </cfif>

        ORDER BY id DESC
    </cfquery>

    <cfset data = { getRequests = getRequests } />
    <cfreturn data />
</cffunction>


    <cffunction name="submitRequests" access="public" returntype="any" output="false">
         <cfargument name="url" required="false">
        <cfargument name="form" required="false">
        <cfset var data = {} />
       <cfif structKeyExists(arguments.form, "submit") AND len(trim(arguments.form.title))>
        <!-- Insert request -->
        <cfquery datasource="#application.datasource#">
            INSERT INTO requests (user_id, title, description, department)
            VALUES (
                <cfqueryparam value="#arguments.session.userid#" cfsqltype="cf_sql_integer">,
                <cfqueryparam value="#trim(arguments.form.title)#" cfsqltype="cf_sql_varchar">,
                <cfqueryparam value="#trim(arguments.form.description)#" cfsqltype="cf_sql_longvarchar">,
                <cfqueryparam value="#trim(arguments.form.department)#" cfsqltype="cf_sql_varchar">
            )
        </cfquery>
    </cfif>

    </cffunction>

    
</cfcomponent>
