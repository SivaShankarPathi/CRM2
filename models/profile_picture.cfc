<cfcomponent output="false">

    <!-- Build a consistent data struct for the view -->
    <cffunction name="getData" access="public" returntype="struct" output="false">
        <cfargument name="userId" type="numeric" required="true">
        <cfset var out = { username = "", profile_image = "uploads/default-avatar.png" }>

        <cfquery name="qUser" datasource="#application.datasource#">
            SELECT username, profile_image
            FROM users
            WHERE id = <cfqueryparam value="#arguments.userId#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfif qUser.recordCount>
            <cfset out.username = qUser.username>
            <cfif len(trim(qUser.profile_image))>
                <cfset out.profile_image = qUser.profile_image> <!-- e.g., "uploads/filename.jpg" -->
            </cfif>
        <cfelse>
            <!-- Fallbacks if user not found -->
            <cfset out.username = structKeyExists(session,"username") ? session.username : "User">
            <cfset out.profile_image = "uploads/default-avatar.png">
        </cfif>

        <cfreturn out>
    </cffunction>

    <!-- Upload logic + optional resize; stores a relative URL "uploads/..." in DB -->
    <cffunction name="uploadPicture" access="public" returntype="void" output="false">
        <cfargument name="userId" type="numeric" required="true">

        <cfset var uploadDir = expandPath("./uploads/")>
        <cfset var uploadResult = {} >
        <cfset var resizedName = "">
        <cfset var resizedPath = "">

        <!-- Ensure folder exists -->
        <cfif NOT directoryExists(uploadDir)>
            <cfdirectory action="create" directory="#uploadDir#">
        </cfif>

        <!-- Upload -->
        <cffile 
            action="upload" 
            filefield="profilePic" 
            destination="#uploadDir#" 
            accept="image/jpeg,image/png,image/jpg,image/webp"
            nameconflict="makeunique"
            result="uploadResult">

        <!-- Resize to 200x200 like your original -->
        <cfset resizedName = "resized_" & uploadResult.serverFile>
        <cfset resizedPath = uploadDir & resizedName>

        <cfimage 
            action="resize"
            source="#uploadResult.serverDirectory & '/' & uploadResult.serverFile#"
            destination="#resizedPath#"
            width="200"
            height="200"
            overwrite="true">

        <!-- Delete original -->
        <cffile action="delete" file="#uploadResult.serverDirectory & '/' & uploadResult.serverFile#">

        <!-- Save relative path in DB (exactly like your original: "uploads/resized_X") -->
        <cfquery datasource="#application.datasource#">
            UPDATE users
            SET profile_image = <cfqueryparam value="uploads/#resizedName#" cfsqltype="cf_sql_varchar">
            WHERE id = <cfqueryparam value="#arguments.userId#" cfsqltype="cf_sql_integer">
        </cfquery>
    </cffunction>

    <!-- Delete logic -->
    <cffunction name="deletePicture" access="public" returntype="void" output="false">
        <cfargument name="userId" type="numeric" required="true">

        <!-- Get current file -->
        <cfquery name="q" datasource="#application.datasource#">
            SELECT profile_image
            FROM users
            WHERE id = <cfqueryparam value="#arguments.userId#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfif q.recordCount AND len(trim(q.profile_image))>
            <cfset var fullPath = expandPath("./#q.profile_image#")>
            <cfif fileExists(fullPath)>
                <cffile action="delete" file="#fullPath#">
            </cfif>
        </cfif>

        <!-- Clear DB field -->
        <cfquery datasource="#application.datasource#">
            UPDATE users
            SET profile_image = NULL
            WHERE id = <cfqueryparam value="#arguments.userId#" cfsqltype="cf_sql_integer">
        </cfquery>
    </cffunction>

</cfcomponent>
