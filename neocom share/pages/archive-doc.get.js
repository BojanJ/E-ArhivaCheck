function main(){
	model.jsonModel = {
		    widgets: [{
		        id: "SET_PAGE_TITLE",
		        name: "alfresco/header/SetTitle",
		        config: {
		            title: "Заведување на документ"
		        }
		    }]
		};
	
	var connector = remote.connect("alfresco");
	var registriesData = connector.call("/neocom/get-registry-books.json");
	// create json object from data
	var regResult = eval('(' + registriesData + ')');
	model.registries = regResult["registries"];

	var connectorOrg = remote.connect("alfresco");
	var orgUnitsData = connectorOrg.call("/neocom/get-org-unit.json");
	// create json object from data
	var orgUnitResult = eval('(' + orgUnitsData + ')');
	model.orgunits = orgUnitResult["orgunits"];
}
main();