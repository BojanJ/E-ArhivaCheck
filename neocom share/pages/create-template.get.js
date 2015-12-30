function main(){
	model.jsonModel = {
	    widgets: [{
	        id: "SET_PAGE_TITLE",
	        name: "alfresco/header/SetTitle",
	        config: {
	            title: "Креирај организациона подединица"
	        }
	    }]
	}

	var connectorOrg = remote.connect("alfresco");
	var orgUnitsData = connectorOrg.call("/neocom/get-org-unit.json");
	// create json object from data
	var orgUnitResult = eval('(' + orgUnitsData + ')');
	model.orgunits = orgUnitResult["orgunits"];
}
main();