function main(){

  var nodeTest = args.nodeRef;
  var archSign = args.archSign;
  //var archSign = 2;

  //var nodeTest = "workspace://SpacesStore/576fff82-2cb8-455a-9163-783d3d720d4a";
  var registryNode = search.findNode(nodeTest);
  var registryContent = registryNode.children;
  //logger.log(registryNode)

  var docsList = [];

  if (nodeTest != "" && archSign != "" && registryContent.length > 0) {

    for(var i=0; i<registryContent.length; i++){
      
      if(registryContent[i].properties["ncom:archRSign"] == archSign){
        
        for(j=0; j<registryContent[i].children.length  ;j++){

           if(registryContent[i].children[j].properties["ncom:isDeleted"] != true){
          
            var accDate = new Date(registryContent[i].children[j].properties["ncom:date"]);
            var dateRaz = new Date(registryContent[i].children[j].properties["ncom:dataRazvod"]);
            var sendD = new Date(registryContent[i].children[j].properties["ncom:sentDate"]);
            var dateExp = new Date(registryContent[i].children[j].properties["ncom:expireDate"]);
            var archSign = registryContent[i].children[j].properties["ncom:archSign"];

            var acceptDate = accDate.getDate() + "/" + (accDate.getMonth()+1) + "/" + accDate.getFullYear();
            var dateRazvod = dateRaz.getDate() + "/" + (dateRaz.getMonth()+1) + "/" + dateRaz.getFullYear();
            var dateExpire = dateExp.getDate() + "/" + (dateExp.getMonth()+1) + "/" + dateExp.getFullYear();

            var sendDate = sendD.getDate() + "/" + (sendD.getMonth()+1) + "/" + sendD.getFullYear();
            
            if( dateRazvod == "1/1/1970"){
              dateRazvod = "";
            }

            if(sendDate == "1/1/1970"){
              sendDate = "";
            }

            if(dateExpire == "1/1/1970"){
              dateExpire = "";
            }
          

            docsList.push({
              "fullName" : registryContent[i].children[j].properties.name,
              "name" : registryContent[i].children[j].properties.title,
              "archiveSign" : registryContent[i].children[j].properties["ncom:seqIndex"],
             // "archiveSign" : registryContent[i].properties["ncom:seqIndex"],
              "acceptDate" : acceptDate,
              "senderId" : registryContent[i].children[j].properties["ncom:senderId"],
              "sender" : registryContent[i].children[j].properties["ncom:sender"],
              "dateRazvod" : dateRazvod ,
              "oznakaRazvod" : registryContent[i].children[j].properties["ncom:oznakaRazvod"],
              "sendDate" : sendDate,
              "dateExpire" : dateExpire,
              "orgEdinica" : registryContent[i].children[j].properties["ncom:orgUnit"],
              "orgSubUnit" : registryContent[i].children[j].properties["ncom:SuborgUnit"],
              "podBroj" : registryContent[i].children[j].properties["ncom:seqIndex"],
              "note" : registryContent[i].children[j].properties["ncom:note"],
              "nodeRef" : registryContent[i].children[j].nodeRef,
              "fullArchSign" : registryContent[i].children[j].properties["ncom:archSign"]
            });    
          }

        }
      }
    }
  }


  model.documents = docsList;

}

main();