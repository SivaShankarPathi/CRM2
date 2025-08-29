<cfsilent>
<!---
	<admin:l10n>
	Localization utility tag.

	This custom tag wraps default content in order to invoke a localization
	service. The custom tag attempts to find matching content for a given
	locale, and if successful, replaces the body of the tag with the
	localized content.

	The result can also be saved to a variable, in which case no body content
	is shown, functionality similar to the cfsavecontent tag.

	@param id The resource id to return. (Required)
	@param file The resource file to look up.
	@param locale The locale to translate content into.
	@param var The caller variable name to hold the result (stops tagbody output).
	@param type Content return type.
	@param charset Content return charset.

	@author Peter Farland
	@author Mike Nimer
--->

<cfparam name="attributes.id" type="string">
<cfparam name="attributes.file" default="" type="string">
<cfparam name="attributes.locale" default="ja" type="string">
<cfparam name="attributes.var" default="">
<cfparam name="attributes.jscript" default="false" type="boolean">
<cfparam name="attributes.type" default="text/html">
<cfparam name="attributes.charset" default="UTF-8">

<cfset ReplaceNoCase(request.localefile,"en","ja")>
<cfif thisTag.executionMode IS "end">
	<cfset bSuccess = true>
	<!--- Determine locale --->
	<cfif Len(attributes.locale) GT 0>
		<cfset locale = Trim(attributes.locale)>
	<cfelseif IsDefined("request.locale")>
		<cfset locale = Trim(request.locale)>
	<cfelse>
		<cfset systemLocale = Trim(GetLocale()) >
		<cftry>
			<cfswitch expression="#systemLocale#">
			<cfcase value="English (US)"><cfset locale="en"></cfcase>
			<cfcase value="English (UK)"><cfset locale="en"></cfcase>
			<cfcase value="English (Australian)"><cfset locale="en"></cfcase>
			<cfcase value="English (New Zealand)"><cfset locale="en"></cfcase>
			<cfcase value="English (Canadian)"><cfset locale="en"></cfcase>
			<cfcase value="French (Standard)"><cfset locale="fr"></cfcase>
			<cfcase value="French (Canadian)"><cfset locale="fr"></cfcase>
			<cfcase value="French (Belgian)"><cfset locale="fr"></cfcase>
			<cfcase value="French (Swiss)"><cfset locale="fr"></cfcase>
			<cfcase value="German (Standard)"><cfset locale="de"></cfcase>
			<cfcase value="German (Austrian)"><cfset locale="de"></cfcase>
			<cfcase value="German (Swiss)"><cfset locale="de"></cfcase>
			<cfcase value="Dutch (Standard)"><cfset locale="nl"></cfcase>
			<cfcase value="Dutch (Belgian)"><cfset locale="nl"></cfcase>
			<cfcase value="Norwegian (Bokmal)"><cfset locale="no"></cfcase>
			<cfcase value="Norwegian (Nynorsk)"><cfset locale="no"></cfcase>
			<cfcase value="Swedish"><cfset locale="sv"></cfcase>
			<cfcase value="Spanish (Standard)"><cfset locale="es"></cfcase>
			<cfcase value="Spanish (Modern)"><cfset locale="es"></cfcase>
			<cfcase value="Spanish (Mexican)"><cfset locale="es"></cfcase>
			<cfcase value="Portuguese (Standard)"><cfset locale="pt"></cfcase>
			<cfcase value="Portuguese (Brazilian)"><cfset locale="pt"></cfcase>
			<cfcase value="Italian (Standard)"><cfset locale="it"></cfcase>
			<cfcase value="Italian (Swiss)"><cfset locale="it"></cfcase>
			</cfswitch>
			<cfcatch type="Any"><cfset locale="en"></cfcatch>
		</cftry>
	</cfif>

	<!--- Bug 3196149, If locale has any value more than 2 characters, set it to English --->
	<cfif Len(locale) GT 2>
		<cfset locale = "en">
		<cflog text="Unexpected characters found in locale."  type="warning">
	</cfif>
	
	<!--- If it's not english, load the resource with requested id - the english text is inline. --->
	<cfif locale neq "en">
		<!--- Determine the resource file --->
		<cfif Len(attributes.file) GT 0>
			<cfset attributes.file = Trim(attributes.file)>
		<cfelseif IsDefined("request.localeFile")>
			<cfset cfidePath = ExpandPath("..")>
            <cfset filePath = ExpandPath(request.localeFile)>
            <cfset pathFound = Find(cfidePath,filePath)>
            <cfif pathFound GT 0>
            	<cfset attributes.file = Trim(request.localeFile)>
            <cfelse>
            	<cfabort>
            </cfif>
		<cfelse>
			<cfset attributes.file = Replace(GetFileFromPath(CGI.Script_Name), ".cfm", "_#locale#.cfm", "One")>
			<cfdump var="3">
		</cfif>

		<cfset defaultContent = thisTag.generatedContent>
		
		<!--- bug 3555962, by exploiting attributes.file one can get code from any file on the server. --->
        <cftry>
			<cfif Len(attributes.file) GT 0>
				<!--- Bug 3196149, GetParentFile does not return accurate results if mixed path are used in unix based environments. Setting OS specific paths.--->
				<cfif attributes.file contains "\">
					<cfset attributes.file = Replace(attributes.file, "\", createObject("java", "java.io.File").separator ,"ALL")>
				</cfif>
				<cfset currenttempdirpath = "#GetDirectoryFromPath(getCurrentTemplatePath())#">
				<cfset resourcesfolderpath = "#currenttempdirpath#resources">
				<cfset resourcescanonicalpath = createObject("java","java.io.File").init(resourcesfolderpath).getCanonicalPath() >
				<cfset urlfile = createObject("java","java.io.File").init("#currenttempdirpath##attributes.file#")>
				<cfset urlparentfile = urlfile.getParentFile()>
				<cfset urlcanonicalpath = urlparentfile.getCanonicalPath() >
				<cfif urlcanonicalpath neq resourcescanonicalpath>
					<cfset attributes.file = "" >
				</cfif>
			</cfif>
        <cfcatch type="any">
        <!--- ingore exceptions ---->
        <!--- If there are illegal characters in the path getCanonicalPathis throwing IOException,in that case also we set attributes.file to empty String--->
			<cfset attributes.file = "" >
        </cfcatch>
        </cftry>


		<cfif Len(attributes.file)>

			<!--- Save the default content --->
			<cfset thisTag.generatedContent = "">

			<cftry>
				<!--- Include the file and save the output as a temporary variable --->
				<cfsavecontent variable="newContent">
					<cfinclude template="#attributes.file#">
				</cfsavecontent>

				<cfcatch type="Any">
					<cfset bSuccess="false">
				</cfcatch>
			</cftry>

			<!--- Restore the default content if id not found --->
			<cfif NOT bSuccess>
				 <cfset newContent = defaultContent>
			</cfif>
		<cfelse>
			<cfset newContent = defaultContent>
		</cfif>

		<!--- Escape single quotes for JavaScript strings --->
		<cfif attributes.jscript>
			<cfset newContent = Replace(newContent, "'", "\'", "ALL")>
		</cfif>

		<!--- Check if we need to save content to a variable --->
		<cfif Len(attributes.var) GT 0>
			<cfset "caller.#attributes.var#" = Trim(newContent)>
			<cfset thisTag.generatedContent = "">
		<cfelse>
			<cfset thisTag.generatedContent = Trim(newContent)>
		</cfif>
	<cfelse>
		<cfif Len(attributes.var) GT 0>
			<cfset "caller.#attributes.var#" = Trim(thisTag.generatedContent)>
			<cfset thisTag.generatedContent = "">
		</cfif>
	</cfif>
</cfif>
</cfsilent>
