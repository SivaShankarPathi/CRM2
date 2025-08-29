<cfif structKeyExists(application, "controller")>
    <cfset data = application.controller.dashboard()>
    <div class="content">
        <cfoutput>
   #data.message#</cfoutput>
    <p>Use the menu to submit or view your requests.</p>
    </div>
<cfelse>
    <cfoutput>Controller is NOT initialized</cfoutput>
</cfif>