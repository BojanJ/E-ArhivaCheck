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

	var connectorReg = remote.connect("alfresco");
	var regs = connectorReg.call("/neocom/get-all-registry-books.json");
	//create json object from data
	var allRegistries = eval('(' + regs + ')');
	model.getAllRegistries = allRegistries["registries"];
}
main();

