function main(){
	model.jsonModel = {
	    widgets: [{
	        id: "SET_PAGE_TITLE",
	        name: "alfresco/header/SetTitle",
	        config: {
	            title: "Извештај за Деловодник"
	        }
	    }]
	};


	var formData = {
		nodeRef : "create node"
	};

	var jsonData = jsonUtils.toJSONString(formData);




	var nodeCreatemodel = "";

	if(typeof formdata != "undefined"){
				for each(field in formdata.fields){
			if(field.name == registry_book){
				nodeCreatemodel = field.value;
			}
		}
	}


	var connector = remote.connect("alfresco");
	var registriesData = connector.call("/neocom/get-report-books?nodeRef=" + nodeCreatemodel + "&format=json"); ///neocom/get-report-books.json
	// create json object from data
	var regResult = eval('(' + registriesData + ')');
	model.registries = regResult["registries"];

	var connectorReg = remote.connect("alfresco");
	var regs = connectorReg.call("/neocom/get-registry-books.json");
	//create json object from data
	var allRegistries = eval('(' + regs + ')');
	model.getAllRegistries = allRegistries["registries"];


}
main();

