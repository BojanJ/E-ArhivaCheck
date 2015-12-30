function main(){
	// check that nodeRef has been provided
	if (args.nodeRef == undefined || args.nodeRef.length == 0)
	{
	   status.code = 400;
	   status.message = "Search term has not been provided.";
	   status.redirect = true;
	}
	else
	{
	   // perform count
	   var node = search.findNode(args.nodeRef);
	   var num = node.children.length;
	   model.number = num;


		var archSignList =[]; 

		for(var i=0; i<node.children.length; i++){
		  
		  archSignList.push({
		    "archSign" : node.children[i].properties["ncom:archRSign"],
		    "archSignName" : node.children[i].properties.name
		  });

		}

		model.archSigns = archSignList;


	}
}
main();