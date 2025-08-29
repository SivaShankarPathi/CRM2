	var x;
	function add_data(data_from_popup) {
				 document.getElementById(x).value = data_from_popup; 
		}
	function wopen(formelem)
	{
		var type = 'all';
		wopentype(formelem,type);
	}

	function wopentype(formelem,type)
	{
		
		defpath = document.getElementById(formelem).value;
		var dialogResults ="";
		x=formelem;
		if (window.showModalDialog) 
		{
			dialogResults = window.showModalDialog("../filedialog/index.cfm?type=" +  type +   "&fromjscript=true&dialogStyle=selectDirectory&formelem=" + formelem + "&defaultPath=" + escape(defpath), "NewWindow","unadorned:yes;dialogWidth:550px;dialogHeight:440px");
		
		   
		}
        else
		{
			var windowObjectReference;
			var left = (window.innerWidth / 2) - ((550 / 2));
    		var top = (window.innerHeight / 2) - ((460 / 2));
		    windowObjectReference = window.open("../filedialog/index.cfm?type=" +  type +   "&fromjscript=true&dialogStyle=selectDirectory&formelem=" + formelem + "&defaultPath=" + escape(defpath), "_blank","height=440,width=550,top="+top+",left="+left+",dependent=true,resizable=no,modal=yes,center=yes");
		    windowObjectReference.cfpopup = true;
		}
		
		if ( (dialogResults != undefined) && (dialogResults != '') && (dialogResults != false) )
             {
               document.getElementById(formelem).value = dialogResults;
             }
	
	return false;
	}


   function showhide(ref) {

    var ele = document.getElementById(ref);
	
	if(ele.style.display == '') {
    		ele.style.display = "none";
		
  	}
	else {
		ele.style.display = '';
	}
		
	}

	
   function toggletext(id,text1,text2)
   {
     var element = document.getElementById(id)
     var text = element.value;
     if(text == text1)
        {
             text = text2;
	}
	else
	{
             text = text1;
	}

       element.value = text;
   }
 
 	function handleSecurityRedirect(){
        window.alert("There was an error accessing this page. Check logs for more details. ")
        window.location.href = "../securityerror.cfm";
    }

	// ColdFusion allows to preserve case for struct with ""Preserve case of structure keys for serialization".
	// Adding JS function to access values of struct irresepctive of case of the key provided.
	function getValueCaseInsensitive(str,key){
		const asUpperCase = key.toUpperCase();
			return str[Object.keys(str).filter(function(k) {
			return k.toUpperCase() === asUpperCase;
		})[0]];
	}

