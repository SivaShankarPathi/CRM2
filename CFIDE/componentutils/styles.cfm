<cfoutput>
<style>
<!--- Adding this case because few files access opensans.css file from different locations --->
<cfif findNoCase("homepage.cfm",cgi.script_name) NEQ 0 OR findNoCase("topnav.cfm",cgi.script_name) NEQ 0 OR findNoCase("navserver.cfm",cgi.script_name) NEQ 0 OR findNoCase("search-ui.cfm",cgi.script_name) NEQ 0 OR findNoCase("administrator/index.cfm",cgi.script_name) NEQ 0 OR findNoCase("enter.cfm",cgi.script_name) NEQ 0 OR findNoCase("login.cfm",cgi.script_name) NEQ 0 OR findNoCase("logout.cfm",cgi.script_name) NEQ 0 OR findNoCase("resource.cfm",cgi.script_name) NEQ 0>
/* open-sans-300 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: url('fonts/open-sans-v14-latin-300.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url('fonts/open-sans-v14-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('fonts/open-sans-v14-latin-300.woff') format('woff'), /* Modern Browsers */
       url('fonts/open-sans-v14-latin-300.ttf') format('truetype') /* Safari, Android, iOS */
}
/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: url('fonts/open-sans-v14-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url('fonts/open-sans-v14-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('fonts/open-sans-v14-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('fonts/open-sans-v14-latin-regular.ttf') format('truetype') /* Safari, Android, iOS */
}
<cfelse>
/* open-sans-300 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: url('../fonts/open-sans-v14-latin-300.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url('../fonts/open-sans-v14-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/open-sans-v14-latin-300.woff') format('woff'), /* Modern Browsers */
       url('../fonts/open-sans-v14-latin-300.ttf') format('truetype') /* Safari, Android, iOS */
}
/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/open-sans-v14-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url('../fonts/open-sans-v14-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/open-sans-v14-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../fonts/open-sans-v14-latin-regular.ttf') format('truetype') /* Safari, Android, iOS */
}
</cfif>

select{
	font-size: 15px;
}

html *{
	color: ##5E5E5E;
	font-family: 'Open Sans', Helvetica;
}
body, td, form {
	margin: 0px;
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: x-small;
<cfelse>
	font-size: small;
</cfif>
}

.body-main-window{
	padding-left: 125px; 
	padding-right: 125px;
}

@media only screen and (max-width: 1000px) {
    .body-main-window {
        padding-left: 30px; 
		padding-right: 30px;
    }
    .px350 , .px500{
	    padding-right: 30px;
	    padding-bottom: 20px;
    }
}

td *{	
	-o-user-select: text;
	-moz-user-select: text;
	-webkit-user-select: text;
	user-select: text;
}

.product-name{
	color: ##249a6d;
	font-size: 20px;
}

.trial-period{
	color: ##0990ff;
	font-weight: bold;
}

.trial-period-left{
	color: ##e43e36;
	font-weight: bold;
}

.success-message{
	color: ##226600;
}

b{
	color: ##5E5E5E;
}

table{
	border-collapse: collapse;
}

.x-panel-header-text{
	font-size: 16px;
	margin-left: 25px;
}

.info-section{
	display: none;
    position: absolute;
    top: 50px;
    width: 65%;
    min-width: 500px;
    left: 17.5%;
    background-color: ##FFFFFF;
    padding: 20px;
    border-radius: 5px;
}

.cf-version{
	font-size: 17px;
	font-weight: bold;
}

.cf-version-enterprisetrial{
	color: ##ff9b01;
}

.cf-version-developer, .cf-version-enterprise, .cf-version-standard{
	color: ##57b600;
}

.close-action{
	float: right;
}

.close-action:hover{
	cursor: pointer;
}

.left-nav{
    position: fixed;
    height: 100%;
    background-color: ##414141;
    top: 52px; display: none;
    white-space: nowrap;
    z-index: 5;
    width: 50px;
    transition: width 0.5s;
}

.nav-group{
    cursor: pointer;
    color: ##FFFFFF;
    padding: 6px;
    font-size: 14px;
}

.nav-group-selected{
	background-color: ##1b1b1b;
	color: ##FFFFFF;
}

.nav-img-container{
	display: inline-block;
	padding: 6px;
	vertical-align: middle;
	background-color: ##48a0df;
	margin-right: 5px;
	height: 25px;
}

.nav-group-selected .nav-img-container{
	background-color: transparent;
}

.nav-text{
	display: inline-block; 
	vertical-align: middle;
	position: relative;
	display: none; 
	margin-right: 10px;
	transition: opacity 0.5s;
	visibility: hidden;
	opacity: 0;
	transition: visibility 0s, opacity 0.5s;
}

.separator{
	border-bottom: 1px dashed ##C7C7C7;
}

.monitoring-status{
	font-size: 16px;
}

.monitoring-icon{
	height: 25px;
	vertical-align: bottom;
}

.line{
	border-top: dashed 1px ##31C78E;
	margin-top: 15px;
	margin-bottom: 15px;
}

.align-left{
	margin-left: 0px !important;
}

.row1{
	margin-top: 15px;
}

.row2{
	margin-bottom: 35px;
}

.img-cont{
	height: 55px;
	padding-top: 10px;
}

.px350{
	width: 33%;
	padding-right: 60px;
	padding-bottom: 40px;
	vertical-align: top;
}
.px400{
	width: 450px;
	padding-right: 60px;
	padding-bottom: 40px;
	vertical-align: top;
}
.px500{
	width: 50%;
	padding-right: 60px;
	padding-bottom: 40px;
	vertical-align: top;
}

.px350 label, .px500 label{
	vertical-align: middle;
}

.container{
	text-align: center;
	margin: 150px auto 0px auto;
}

.category-text-container{
	width: 119px;
	padding: 0px 5px;
    margin-bottom: 10px;
    height: 36px;
}


.tile{
	display: inline-table;
	background-color: ##51b7ff;
	text-align: center;
	cursor: pointer;
	margin-right: 20px;
	box-shadow: 1px 1px 3px ##777777;
	-moz-box-shadow: 1px 1px 3px ##777777;
	-webkit-box-shadow: 1px 1px 3px ##777777;
}
.tile span{
	color: ##ffffff;
}
.tile:hover{
	box-shadow: 3px 3px 4px ##777777;
}

.clickable-link{
	text-decoration: underline;
	color: ##48a0df;
}

.table-link{
	color: ##5E5E5E;
}

td{
	vertical-align: middle;
}

.columns td{
	vertical-align: top;
}

.margin-left{
	margin-left: 15px;
}

.spacer10{
	margin-top: 10px;
}

.align-middle{
	vertical-align: middle;
}

.spacer15{
	margin-top: 15px;
}

.spacer20bottom{
	margin-bottom: 20px;
}

.label{
	color: ##616161;
	font-size: 13px;
	margin-left: 0px;
}

.label-bold{
	font-weight: bold;
}
<!--- Used in saml --->
.label-padding{
	padding-right:15px;
}
.label-inline{
	width:15%;
	display:inline-block;
}
<!--- for input boxes of various sizes --->
.text-small{
	width: 100px;
}
.text-large{
	width: 200px;
}
.num-small{
	width: 80px;
}
.num-large{
	width: 120px;
}
.description{
	font-size: 13px !important;
}

input {
	margin: 0px;
}

.highlight{
	background-color: yellow;
}

.hide{
	display: none;	
}

.archive-nav a{
	margin-left: 5px;
}

th {
 font-family: Arial, Helvetica, sans-serif;
 font-size: small; ! important;
}

th {
 text-align:left;
}
<!---
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label:before {
  border: 1px solid ##333;
  content: "\00a0";
  display: inline-block;
  font: 16px/1em sans-serif;
  height: 16px;
  margin: 0px;
  padding: 0;
  vertical-align: top;
  width: 16px;
}
input[type="checkbox"]:checked + label:before {
  background: ##fff;
  color: ##333;
  content: "\2713";
  text-align: center;
}
input[type="checkbox"]:checked + label:after {
  font-weight: bold;
}
--->

input[type="checkbox"]{
	vertical-align: middle;
}
input[type="text"],input[type="password"],input[type="number"]{
	padding-left: 10px;
	padding-top: 3px;
	padding-bottom: 3px;
	margin-left: 2px;
}

.description{
	margin-top: 10px;
	text-align: justify;
}


		.buttn
		{
			
			background: ##aeadad;
			padding: 7px 10px;
			border-radius: 3px;
			border-style: solid;
			border: 0px solid grey;
			color: white;
			cursor: pointer;
			margin-right: 5px;
			margin-left: 10px;
		}

		.buttn-grey{
			background: ##aeadad;
			padding: 7px 10px;
			border-radius: 3px;
			border-style: solid;
			border: 0px solid grey;
			color: white;
			cursor: pointer;
			margin-right: 5px;
			margin-left: 10px;
		}

		.buttn-green{
			padding: 7px 20px;
		}

		.buttn-grey:hover{
			background: ##919191;
		}
		
		
		.buttn:disabled 
		{
		  background: ##a5a5a5;
		  color: ##dadada;
		  text-shadow: 0 0 0 ##0;
		}

		.buttn-submit{
			background: ##51b7ff;
			  <cfif not Find("MSIE", CGI.HTTP_USER_AGENT)>			 
			  		filter: progid:dximagetransform.microsoft.gradient(startColorstr='##999999', endColorstr='##666666', GradientType=0);
			  <cfelse>
			  		background: ##7e7e7e;
			  </cfif>
			  
			  border-style: solid;
			  border-radius: 18px;
			  border-width: 1px;
			  color: ##ffffff;
			  font-family: Arial, Helvetica;
			  font-size: 16px;
			  min-width: 100px;
			  outline-style: none;
			  padding: 7px 11px;
			  cursor: pointer;
		}

		
.adminbody {
	background-color: ##c4c4c4;
}

.grey-background-div{
	width: 98%;
	background: ##f6f6f6;
	padding: 10px;
	border-top: 1px dashed ##c3c3c3;
	border-bottom: 1px dashed ##c3c3c3;
}

.resource-column{
	width: 28%;
	width: calc(33% - 51px);
	display: inline-block;
	vertical-align: top;
}

.vertical-line{
	display: inline-block;
	border: 1px dashed ##c2c2c2;
	margin: 0px 25px;
	height: 250px;
}

.resource-column li{
	font-size: 13px;
}

.resourcelist {
	list-style-type: none;
	margin-top:5px;
	margin-bottom:10px;
	padding-left: 10px;
}

.subresource-header{
	color: ##ff9500;
}

.errorText {
	color: ##EE0000; 
}

.successText {
	color: ##008800; 
}

.loginWhiteText {
	color: ##FFFFFF; 
	font-weight: bold;
}

.loginInvalidText *{
	color: ##CC0000; 
	font-weight: bold;
}

.loginCopyrightText {
	color: ##000000;
	font-size: 10px;
	font-family:Arial, Helvetica, sans-serif;
}

a {
	text-decoration: none;
}

a.tableHeader:hover{
	
color: ##333333;
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-weight:bolder;
<cfelse>
	font-weight:inherit;
</cfif>
}

.iconLinkText {
	color: ##FFFFFF;
	font-weight: bold;
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: x-small;
<cfelse>
	font-size: small;
</cfif>
}

.leftMenuLinkText {
	
color: ##666666;
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: x-small;
<cfelse>
	font-size: small;
</cfif>
}

a.leftMenuLinkText:hover{
	
color: ##333333;
font-weight:bold;
}

.leftMenuLinkTextHighlighted {
	
color: ##666666; 
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: x-small;
<cfelse>
	font-size: small;
</cfif>
	font-weight:bold;
}

.topMenuLinkText {
	color: ##000000;
	font-size: x-small; 
}

.menuCFAdminText {
	color: ##000000;
	font-weight: bold;
	
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: x-small;
<cfelse>
	font-size: small;
</cfif>
}

.menuAuxText {
	color: ##6C7A83;
	<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
		font-size: x-small;
	<cfelse>
		font-size: small;
	</cfif>
}

.menuHeaderText {
color: ##333333;
	font-weight: bold;
<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
	font-size: xx-small;
<cfelse>
	font-size: x-small;
</cfif>
	text-transform:uppercase;
}

.show{
	display: block;
}

.hidden{
	display: none;
}

.menuTD {
	/*border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: solid;
	border-left-style: none;
	border-bottom-color: ##CCCCCC;*/
	display: none;
}

.menuTDHeader {
	/* can delete me thinks */
	/*border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: none;
	border-bottom-style: solid;
	border-left-style: none;*/
	background: url('images/cap_menuitem_background.png') repeat-x;
	display: none;
}
.menuTDHeaderLeft {
	border-left-style:solid;
	border-left-width: 1px;
	border-color: ##c4c4c4;
	background: url('images/cap_menuitem_background.png') repeat-x;
	display: none;
}
.menuTDHeaderRight {
	border-right-style:solid;
	border-right-width: 1px;
	border-color: ##c4c4c4;
	background: url('images/cap_menuitem_background.png') repeat-x;
	display: none;
}

h1 {
	color: ##000000;
	font-weight: bold;
	font-size: x-small;
	margin-top: 5px;
	margin-bottom: 5px;
}

.pageHeader {
	color: ##48a0df;
	font-weight: 100;
	font-size: 0px;
	/*margin-top: 5px;
	margin-bottom: 5px;*/
	width: 100%;
	text-align: center;
}
.pageHeaderHomepage{
	color: ##48a0df;
	font-weight: 100;
	font-size: 32px;
	margin-top: 5px;
	margin-bottom: 5px;
	width: 100%;
	text-align: center;
}

.currentuser {
	color: ##0072AC;
	font-weight: bold;
	font-size: x-small;
	margin-top: 5px;
	margin-bottom: 5px;
}

.cellBlueSides {
	border-right-width: 1px;
	border-left-width: 1px;
	border-right-style: solid;
	border-left-style: solid;
	border-right-color: ##C1D9DB;
	border-left-color: ##C1D9DB;
}

.cellLeftBlueSide {
	border-left-width: 1px;
	border-left-style: solid;
	border-left-color: ##D5E3E6;
}

.cellRightAndBottomBlueSide {
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: ##D5E3E6;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##D5E3E6;
}

.cell3BlueSides {
	border-left-width: 1px;
	border-left-style: solid;
	border-left-color: ##D5E3E6;
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: ##D5E3E6;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##D5E3E6;
}

.cell4BlueSides {
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ##D5E3E6;
	border-left-width: 1px;
	border-left-style: solid;
	border-left-color: ##D5E3E6;
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: ##D5E3E6;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##D5E3E6;
}

.cell2BlueSidesAndBlueBkgd {
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ##D5E3E6;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##D5E3E6;
	background-color: ##E8F0F1;
}

.cellBlueTop {
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ##C1D9DB;
}

.cellBlueBottom {
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##C1D9DB;
}

.cellBlueTopAndBottom {
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ##C1D9DB;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ##C1D9DB;
}

.cellBordersBlue {
	border: 1px solid ##C1D9DB;
}

.cellGrayBottom {
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ###request.grayLight#;
}

.copyright {
	color: ##000000;
	<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
		font-size: xx-small;
	<cfelse>
		font-size: x-small;
	</cfif>
}

.copyrightLink {
	color:###request.blueDark#; 
	<cfif Find("MSIE", CGI.HTTP_USER_AGENT)>
		font-size: xx-small;
	<cfelse>
		font-size: x-small;
	</cfif>
}

.disabled {
	color: ##999999;	
}
.updatenotification
{
	color: white;
	font-size: small;
	a:hover{color: white;		
	}
	
}




.color-title		{background-color:888885;color:white;background-color:7A8FA4;}
.color-header		{background-color:ddddd5;}
.color-buttons		{background-color:ccccc5;}
.color-border		{background-color:666666;}
.color-row			{background-color:fffff5;}
.color-rowalert		{background-color:ffddaa;}


.labelbold			{font-weight:bold;}

.fixedWidthColumnInSecureProfile
{
	min-width: 250px;
	word-wrap: break-word;
}

<!--- Login UI --->
.row{
	text-align: center;
}
.login-input-field{
	width: 80%;
	height: 35px;
	vertical-align: middle;
	float: right;
}
.input-row{
	padding-bottom: 20px;
}
.login-main-table{
	 width: 100%;
	 height: 100%;
	 border: 0; 
}
.login-img{
	width: 100%;
	margin-top: 30px;
}
.login-background-container{
	height: 100%;
	width: 60%;
}
.login-background{
	background-image: url(images/loginbackground.png);
    background-repeat: no-repeat;
    height: 100vh;
    display: inline-block;
    width: 80%;
}
.login-form-container{
	vertical-align: top;
	width: 300px;
}
.login-container-cf{
	color: ##c9dcfe;
	padding-top: 30px;
	font-size: 60px;
}
.login-container-administrator{
	color: ##7E7E7E;
	font-size: 25px;
	display: inline-block;
}
.login-table-container{
	width: 100%;
}
.login-table-container input[type="text"],.login-table-container input[type="password"]{
	padding-top: 8px;
	padding-bottom: 8px;
}
.admin_login_id, .admin-login{
	padding: 10px 10px;
	border-radius: 2px;
	border: 1px solid ##BBBBBB;
	width: 300px;
	font-size: 16px;
}
.username-container,.password-container{
	padding-top: 10px;
}
.submit-button{
	background-color: ##26C889;
	border: 0;
	border-radius: 3px;
	padding: 8px 20px;
	font-size: 20px;
	color: white;
	cursor: pointer;
	letter-spacing: 1.2px;
}
.login-button{
	background-color: ##0077CC;
	text-align: right;
	padding: 5px 20px;
	border-radius: 0px;
}
.login-footer-container{
	vertical-align: bottom;
	position: absolute;
	bottom: 0px;
	right: 0%;
}
.footer-container{
	width: 100%;
}
.header {
	height: 100%;
	width: 100%;
	background-color: ##414141;
	border-bottom: 2px solid white;
}
.header a{
	color:##eeeeee;
	font-size:14px;	
	font-weight:bold;
	cursor: pointer;
}
.header .login-container-cf{
	font-size: 32px;
	font-weight: none;
	color: ##0077CC;
}
.header .login-container-administrator{
	font-size: 24px;
	color: white;
	font-weight: normal;
}
<!--- CSS for top navigation bar --->
.topnav-container{
	background-color: black;
}
.clickable-link{
	cursor: pointer;
}
<!--- CSS for actual navigation bar --->
.nav-container{
	background-color: ##31C78E;
}
.menu-container{
	
}
.links-container{
	margin: 0 auto;
	width: 0%;
	height: 0%;
}
.link-holder{
	background-color: white;
	display: none;
	width: 0%;
	height: 0px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	margin-right: 10px;
	border-bottom: 0px solid white;
	position: relative;
}
.link-holder-selected{
	border-bottom: 3px solid ##92a9b9;
	font-weight: bold;
	font-size: 14px;
}
.link{
	pointer-events: none;
	display: none;
}
.img-container{
	width: 20px;
	margin: auto;
	display: none;
	height: 0px;
}
.img-container img{
	padding-top: 5px;
}
.text-container{
	height: 0px;
	margin-top: 10px;
	font-size: 11px;
	display: none;
}
.link-text{
	margin-top: 5px;
	color: ##565656;
	height: 0px;
}
##mainmenu-text{
	background-color: white;
	color: ##48a0df;
	margin-left: 70px;
	font-size: 28px;
	padding: 10px 0px;
	display: inline-block;s
}
##server-name{
    position: absolute;
    top: -17px;
    right: 0px;
}
##server-name-image{
    height: 50px;
}
##server-name-text{
	position: absolute;
	top: 22px;
	left: 33px;
	color: white;
}
##categories-home-container{
	position: absolute;
	top: -5px;
	left: 10%;
	cursor: pointer;
	z-index: 10;
}
##categories-home-link{
	color: white;
	padding: 10px 10px 10px 10px;
}
##submenu-layer{
	background-color: ##F5F4F4;
	font-size: 16px;
	color: ##727272;
}
.subcategory-link{
	text-decoration: none;
	/*padding-bottom: 10px;
	color: ##727272;*/
}
.subcategory-link-holder{
	vertical-align: middle;
	display: inline-block;
}
.subcategory-link-holder-selected{
	color: white;
	font-weight: bold;
	background-color: ##51b7ff;
	/*border-bottom: 2px solid ##434343;*/
}
.subcategory-link-holder-selected a{
	color: white;
}
##submenu-container{
    margin-left: 50px;
}
##submenu-container span{
	font-size: 13px;
    display: inline-block;
    padding: 11px 9px;
}
.triangle{
	width: 0; 
	height: 0; 
	border-top: 5px solid transparent;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 5px solid ##FF9400;
	position: absolute;
	bottom: 0px;
	left: calc(50% - 2.5px);
	display: none;
}
<!--- CSS for main contents window --->
##contents-window table, ##contents-window tr, ##contents-window th, ##contents-window td{
	background-color: white;
}
.admin-tip{
	text-align: justify;
	margin-top: 3px;
}
.wrap40{
	width: 400px;
}
.number{
	color: ##46A1C4;
	font-weight: 600;
	padding: 3px 0px;
	font-size: 15px;
	vertical-align: middle;
	width: 50px;
}
.hr{
	background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%);
	width: 100%;
	background-position: bottom;
	background-size: 3px 1px;
	background-repeat: repeat-x;
}
.subheading, .subheading label{
	color: ##46A1C4;
	font-size: 16px;
	cursor: pointer;
	font-weight: bold;
}
.section-heading, .section-heading label{
	color: ##46A1C4;
	font-size: 14px;
	font-weight: bold;
	padding-top:15px;
}
.main-table{
	width: 100%;
	cellspacing: 0;
	cellpadding: 2;
	bakground-color: white;
	border: 1px solid ##ACACAC;
	padding: 0px;
	margin: 0px;
	color: ##5E5E5E;
}
.main-table td{
	
	border-bottom: 1px solid ##ACACAC;
	border-left: 1px solid ##ACACAC;
	border-right: 1px solid ##ACACAC;
	padding: 10px;
}
.main-table table td{
	border: 0px;
	bakground-color: transparent;
}
.main-table th{
	border-bottom: 1px solid ##ACACAC;
	border-left: 1px solid ##ACACAC;
	border-right: 1px solid ##ACACAC;
	background-color: ##EEEFEF;
	padding: 10px;
}
.main-table table td{
	padding: 5px;
}
.main-table-header{
	height: 40px;
	background-color: ##DFDFDF !important;
}
.main-table .actions{
	border: 0px;
}
.main-table> tbody> tr:nth-child(odd){
    background-color: ##F4F5F5;
}
.main-table>tbody>tr>td>table>tbody>tr>td{
	padding-top: 0px;
	padding-bottom: 0px;
}
.submit-table{
	width: 100%;
	align: right;
}
</style>
</cfoutput>
<!--- CSS for search UI --->
<style>

	.search-icons{
		display: inline-block;
	}
	.imgtest{
		background: url(images/serverupdatesstar.png) 0 0 no-repeat;
		width:20px;
		height:20px;
		display:none;
	}
	#textOverlay {
		position:relative;
		top: -3px;
		left: 15px;
		font-size:12px;	
		font-weight:bold;	
		color: #fff;
		text-shadow: #000 2px 2px 2px;
	}
	#first-row{
		background-color: white;
		border: 1px solid white;
	}
	#search-container{
		width: 100%;
		height: 100%;
    	background: rgba(0, 0, 0, 0.7);
    	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.8);
    	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.8);
    	-moz-box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.8);
    	-webkit-box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.8);
	}
	#search-area{
		padding-top: 150px;
	    margin: 0 auto;
	    width: 50%;
	}
	.search-tr:hover{
		background-color: #cee4e5;
	}
	.search-tr.selected{
		background-color: #cee4e5;
	}
	#search-text{
		width: 90%;
		width: calc(100% - 50px);
		height: 50px;
		border: none;
		font-size: 20px;
		padding-left: 20px;
		color: #7e7e7e;
	}
	#dropdown{
    	color: white;
    	font-size: 16px;
    	background-color: #1c6796;
    	max-width: 150px;
    	padding: 12px 12px;
    	border: none;
    	-webkit-appearance: none;
    	-moz-appearance: none;
    	text-indent: 1px;
    	text-overflow: '';
	}
	#dropdown li{
		background-color: #1c6796;
		padding-left: 120px;
		width: 150px;
	}
	.subcat{
		color: #7e7e7e;
	}
	.cat{
		color: #0096ff;
	}
	*:focus {
    	outline: none;
	}
	.search-td{
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 20px;
		font-size: 16px;
	}
	#search-results{
		background-color: white;
		margin-top: 7px;
		width: 800px;
	}
	#list {
	    display: none;
	    position: absolute;
	    margin: 0;
	    top: 42px;
	    left:0px;
	    list-style-type: none;
	    border-left: 1px solid white;
	    border-right: 1px solid white;
	    border-bottom: 1px solid white;
	    padding-left: 0px;
	}
	#list > li:hover{
		background-color: #3a85b3;
	}
	#list > .option {
    	width: 200px;
	    line-height: 25px;
	    font-size: 14px;
	    padding: 5 9px 5px 20px;
	    cursor: pointer;
	    background-color: #1c6796;
	    color: white;
	}
	#button-categories{
		color: white;
    	font-size: 14px;
    	background-color: #1c6796;
    	width: 200px;
    	padding: 12px 0px;
    	border: none;
    	-webkit-appearance: none;
    	-moz-appearance: none;
    	text-indent: 1px;
    	text-overflow: '';
    	height: 42px;
    	text-align: left;
    	padding-left: 10px;
	}
	#search-results #landing-background{
		padding: 0px 15px 10px 15px;
		overflow-y: auto;
		max-height: 80vh;
	}
	#search-results #landing-category{
		padding: 5px 10px 5px 10px;
		background-color: #c6efff;
		color: #535353;
		border-radius: 5px;
	}
	#search-results #subcategory{
		text-decoration: underline;
		padding-left: 5px;
		display: inline-block;
		padding-top: 10px;
		padding-right: 25px;
		margin-top: 10px;
		margin-bottom: 5px;
	}
	#subcategory a{
		color: #7e7e7e;
	}
	#searchbutton{
		cursor: pointer;
	}
	#search-icon{
		position: absolute;
		right: 5px;
		top: 7px;
	}
	#search-arrow{
		padding-top: 13px;
	}
	#search-arrow-container{
		height: 42px;
    	display: inline-block;
    	vertical-align: middle;
    	background-color: #1c6796;
    	padding-right: 10px;
    	margin-top: -4px;
    	margin-left: -4px;
    	cursor: pointer;
    }
    #close-icon{
    	cursor: pointer;
	    position: absolute;
	    top: 170px;
	    padding-left: 15px;
	}
	#landing-category-body{
		padding-top: 10px;
		margin-top: 10px;
	}
	#landing-background::-webkit-scrollbar
	{
		width: 8px;
		background-color: #DBDBDB;
		margin-right: 5px;
	}
	
	#landing-background::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #c0c0c0;
	}
</style>

<!--- css for modules error --->
<style>
.module-error-div{
	text-align:center;
	font-size: 14px;
}
.module-error-message{
	color: red;
}
.module-error-img{
	padding-top:28px;
}
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
	background-color: #eee;
}
::-webkit-scrollbar-track {
  /*border-radius: 10px;*/
  background: #eee;
  /*border: 1px solid #ccc;*/
}

::-webkit-scrollbar-thumb {
	padding-left: 5px;
  border-radius: 10px;
  background: #aaa;
  /*border: 1px solid #aaa;*/
}

.clearfix:after {
	display: table;
	content: ' ';
	clear: both;
}
</style>