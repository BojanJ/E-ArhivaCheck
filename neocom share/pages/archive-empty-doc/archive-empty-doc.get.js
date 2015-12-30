function main(){
	model.jsonModel = {
		    widgets: [{
		        id: "SET_PAGE_TITLE",
		        name: "alfresco/header/SetTitle",
		        config: {
		            title: "Архивирање документ"
		        }
		    }]
		};
	
	var connector = remote.connect("alfresco");
	//var registriesData = remote.call("/neocom/get-registry-books.json");
	var registriesData = connector.call("/neocom/get-registry-books.json");
	// create json object from data
	var regResult = eval('(' + registriesData + ')');
	model.registries = regResult["registries"];

	var connectorOrgUnit = remote.connect("alfresco");
	var orgUnitData = connectorOrgUnit.call("/neocom/get-org-unit.json");
	// create json object from data
	var orgUnitResult = eval('(' + orgUnitData + ')');
	model.orgunits = orgUnitResult["orgunits"];
}
main();