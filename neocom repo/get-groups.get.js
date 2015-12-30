function main(){

	var username = person.properties.userName;
	var user = people.getPerson(username);

	var groups = [];
    if(user){
        
      var peopleFromGroup = people.getContainerGroups(user);
            for(person in peopleFromGroup){
              groups.push({
                'name' : peopleFromGroup[person].properties.authorityName
              });
      }
      model.groups = groups;
    }  
}
main();