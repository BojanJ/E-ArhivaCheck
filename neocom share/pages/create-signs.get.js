function main(){
	model.jsonModel = {
	    widgets: [{
	        id: "SET_PAGE_TITLE",
	        name: "alfresco/header/SetTitle",
	        config: {
	            title: "Креирај архивски знаци"
	        }
	    }]
	};


	var connector = remote.connect("alfresco");
	var archiveSignData = remote.call("/neocom/get-archive-sign.json");
	// create json object from data
	var archSignResult = eval('(' + archiveSignData + ')');
	model.archiveSign = archSignResult["archiveSign"];
}
main();