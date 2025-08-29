<html>
	<head>
		<cfoutput>
		<script type="text/javascript" #GetCSPNonce(true)#>
			function sendRequest()
			{
				var form = document.forms[0];
				setTimeout(function(){
					form.submit();
				}, 3000);
			}
		</script>
		</cfoutput>
	</head>
	<body onload="sendRequest()">
		<cfoutput>
		<form action="#VARIABLES.IDPURL#" method="POST">
			<input type="hidden" name="SAMLRequest" value="#VARIABLES.SAMLREQUEST#" /> 
			<input type="hidden" name="RelayState" value="#VARIABLES.RELAYSTATE#" />
		</form>
		</cfoutput>
	</body>
</html>