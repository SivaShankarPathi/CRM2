<!--- daily_customer_report.cfm --->
<cfsetting enablecfoutputonly="true">

<!--- Format current date --->
<cfset today = dateFormat(now(), "dd-mmm-yyyy")>

<!--- Query downloads from today --->
<cfquery name="downloadsToday" datasource="user">
    SELECT username, downloaded_at
    FROM report_downloads
    WHERE CAST(downloaded_at AS DATE) = <cfqueryparam value="#dateFormat(now(), 'yyyy-mm-dd')#" cfsqltype="cf_sql_date">
</cfquery>

<!--- Build Email Body --->
<cfif downloadsToday.recordCount EQ 0>
    <cfset mailBody = "<p><strong>No user downloaded the requests today (#today#).</strong></p>">
<cfelse>
    <cfset mailBody = "<p><strong>The following users downloaded the submitted requests report on #today#:</strong></p><ul>">
    
    <cfloop query="downloadsToday">
        <cfset mailBody &= "<li>" & username & " at " & timeFormat(downloaded_at, "hh:mm tt") & "</li>">
    </cfloop>
    
    <cfset mailBody &= "</ul>">
</cfif>

<!--- Send Email --->
<cfmail 
    to="pathisivashankar@gmail.com"
    from="sivashankarpatthi@gmail.com"
    subject="Daily Report Download Summary - #today#"
    type="html">
    #mailBody#
</cfmail>