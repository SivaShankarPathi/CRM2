<cfsilent>
<!--- Initialize settings structure  --->
<cfset settings = StructNew()>
<!--- absolute path to User's File storage folder  --->
<cfset settings.UserFiles 		= ExpandPath("/cf_scripts/scripts/ajax/ckeditor/plugins/filemanager/uploadedFiles")> <!--- like #ExpandPath('../../../../UserFiles')# --->
<!--- URL to user's file storage folder            --->
<cfset settings.UserFilesURL	= "/cf_scripts/scripts/ajax/ckeditor/plugins/filemanager/uploadedFiles"> <!--- like : http://myste.com/UserFiles --->
<!--- image size for thubnail images    --->
<cfset settings.thumbSize		= 120>
<!--- image size for medium size images --->
<cfset settings.middleSize		= 250>
<!--- Permision for linux               --->
<cfset settings.chomd			= "777">
<!--- disallowed file types             --->
<cfset settings.disfiles		= "as,asp,aspx,bin,cfc,cfm,cfml,cfr,cfsw,class,dmg,exe,hbxml,jar,jsp,jspx,jwx,msxml,php,swc,sws,asmx,ashx">
<!--- Disable file uploads by default--->
<cfset settings.AllowUploads = "false">
<!--- Disable Directory Creation by default --->
<cfset settings.AllowDirectoryCreation = "false">
<!--- Disable File Manager Directory Navigation By Default --->
<cfset settings.AllowDirectoryNavigation = "false">
</cfsilent>
