<cfcomponent output="false">
<cfsetting enablecfoutputonly="true">
<cfsetting showdebugoutput="no">
<cfcontent type="application/json">

    <cffunction name="addCustomer" access="remote" returntype="any" returnformat="json">
        <cfargument name="name" required="true">
        <cfargument name="email" required="true">
        <cfargument name="phone" required="true">

        <cftry>
            <!-- Check email exists -->
            <cfquery name="checkEmail" datasource="#application.datasource#">
                SELECT id FROM customers WHERE email = <cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">
            </cfquery>

            <cfif checkEmail.recordCount GT 0>
                <cfreturn { "success" = false, "message" = "Email already exists!" }>
            </cfif>

            <!-- Insert customer -->
            <cfquery datasource="#application.datasource#">
                INSERT INTO customers (name, email, phone)
                VALUES (
                    <cfqueryparam value="#arguments.name#" cfsqltype="cf_sql_varchar">,
                    <cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">,
                    <cfqueryparam value="#arguments.phone#" cfsqltype="cf_sql_varchar">
                )
            </cfquery>

            <cfreturn { "success" = true, "message" = "Customer added successfully!" }>

        <cfcatch>
            <cfreturn {
                "success" = false,
                "message" = "Error: #cfcatch.message#"
            }>
        </cfcatch>
        </cftry>
    </cffunction>

    <!--- Get all customers --->
      <cffunction name="getCustomers" access="remote" returntype="struct" returnformat="json">
    <cfset var result = {} />
    <cfset var customers = [] />

    <cfquery name="getAll" datasource="#application.datasource#">
        SELECT id, name, email, phone
        FROM customers
        ORDER BY id DESC
    </cfquery>

    <cfloop query="getAll">
        <cfset arrayAppend(customers, {
            id = getAll.id,
            name = getAll.name,
            email = getAll.email,
            phone = getAll.phone
        })>
    </cfloop>

    <cfset result.customers = customers>
    <cfreturn result>
</cffunction>



<!-- Edit Customer -->
<cffunction name="editCustomer" access="remote" returntype="any" returnformat="json">
    <cfargument name="id" required="true">
    <cfargument name="name" required="true">
    <cfargument name="email" required="true">
    <cfargument name="phone" required="true">

    <cftry>
        
        <cfquery datasource="#application.datasource#">
            UPDATE customers
            SET name = <cfqueryparam value="#arguments.name#" cfsqltype="cf_sql_varchar">,
                email = <cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">,
                phone = <cfqueryparam value="#arguments.phone#" cfsqltype="cf_sql_varchar">
            WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfreturn { "success" = true, "message" = "Customer updated successfully!" }>

    <cfcatch>
        <cfreturn {
            "success" = false,
            "message" = "Update failed: #cfcatch.message#",
            "detail" = "#cfcatch.detail#"
        }>
    </cfcatch>
    </cftry>
</cffunction>

<!-- Delete Customer -->
<cffunction name="deleteCustomer" access="remote" returntype="any" returnformat="json">
    <cfargument name="id" required="true">

    <cftry>
        <cfquery datasource="#application.datasource#">
            DELETE FROM customers
            WHERE id = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfreturn { "success" = true, "message" = "Customer deleted successfully!" }>

    <cfcatch>
        <cfreturn {
            "success" = false,
            "message" = "Delete failed: #cfcatch.message#",
            "detail" = "#cfcatch.detail#"
        }>
    </cfcatch>
    </cftry>
</cffunction>

<cffunction name="searchCustomers" access="remote" returntype="any" returnformat="json">
    <cfargument name="query" required="false" default="">
    <cfset var data = []>

    <cfquery name="results" datasource="#application.datasource#">
        SELECT id, name, email, phone
        FROM customers
        WHERE name LIKE <cfqueryparam value="%#arguments.query#%" cfsqltype="cf_sql_varchar">
           OR email LIKE <cfqueryparam value="%#arguments.query#%" cfsqltype="cf_sql_varchar">
           OR phone LIKE <cfqueryparam value="%#arguments.query#%" cfsqltype="cf_sql_varchar">
        ORDER BY id DESC
    </cfquery>

    <cfloop query="results">
        <cfset arrayAppend(data, {
            "id" = results.id,
            "name" = results.name,
            "email" = results.email,
            "phone" = results.phone
        })>
    </cfloop>

    <cfreturn {
        "success" = true,
        "customers" = data
    }>
</cffunction>


<!-- Check if Email Already Exists -->
<cffunction name="checkEmail" access="remote" returntype="any" returnformat="json">
    <cfargument name="email" required="true">
    <cfquery name="checkEmail" datasource="#application.datasource#">
        SELECT id FROM customers WHERE email = <cfqueryparam value="#arguments.email#" cfsqltype="cf_sql_varchar">
    </cfquery>
    <cfif checkEmail.recordCount GT 0>
        <cfreturn { "success" = false, "message" = "Email already exists!" }>
    <cfelse>
        <cfreturn { "success" = true, "message" = "Email is available." }>
    </cfif>
</cffunction>

</cfcomponent>
