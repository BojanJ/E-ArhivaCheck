/*
 * Copied from https://issues.alfresco.com/jira/browse/ALF-19930
 * because of https://issues.alfresco.com/jira/browse/ALF-20384
 * For 4.2.e it's simply not possible to remove stuff from the header
 */
 function getArchiveSite()
{
    var json = remote.call("/neocom/get-site");
    
    // create json object from data
    if (json.status == 200)
    {
        var values = eval('('+json+')');
        return values["sites"];
    }
    else
    {
        return null;
    }
}


function main(){

    var widget = widgetUtils.findObject(model.jsonModel.widgets, "id", "HEADER_SHARED_FILES");
    if(widget !== undefined && widget !== null){
         widget.name = null; 
        // CreateWebScriptsWidgetsDirective checks name and only creates WidgetData if name is a string 
    }

    function findAndRemoveIn(obj, arrContext, arrIdx, id) {
        var idx, max, key;
        if (obj !== undefined && obj !== null) {
            if (Object.prototype.toString.apply(obj) === "[object Object]") {
                if (obj.hasOwnProperty("id") && obj.id === id) {
                    if (arrContext !== null && arrIdx !== null) {
                        arrContext.splice(arrIdx, 1); }
                    
                    else
                    {
                        logger.debug("Unexpected match outside of array structure: " + jsonUtils.toJSONString(obj));
                    }
                } else {
                    for (key in obj) {
                        if (obj.hasOwnProperty(key))
                        {
                            findAndRemoveIn(obj[key], null, null, id);
                        }
                    }
                }
            } else if (Object.prototype.toString.apply(obj) === "[object Array]") {
                for (idx = 0, max = obj.length; idx < max; idx++)
                {
                    findAndRemoveIn(obj[idx], obj, idx, id);
                }
            }
        }
    }

    var connector = remote.connect('alfresco');
    var groupsData = connector.call("/neocom/get-groups.json");

    var groupsResult = eval("(" + groupsData + ")");

    var groups = groupsResult["groups"];


    var headerMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_APP_MENU_BAR");

    var headerMenu1;


    function archiveMenu(){
        if (headerMenu != null) {
            /* Add menu item to My profile */

            /* Dropdown example */
            headerMenu.config.widgets.push({
                id: "HEADER_CUSTOM_DROPDOWN",
                name: "alfresco/header/AlfMenuBarPopup",
                config: {
                    id: "HEADER_ARCHIVE",
                    label: "header.menu.archive.label", //label: "Архива",
                    widgets: [
                    ]
                }
            });
        }
        headerMenu1 = widgetUtils.findObject(model.jsonModel, "id", "HEADER_CUSTOM_DROPDOWN"); 
    }


// var headerMenu1 = widgetUtils.findObject(model.jsonModel, "id", "HEADER_CUSTOM_DROPDOWN");  

    function documentsMenuSection(){
        headerMenu1.config.widgets.push(
        { 
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "header.menu.documents.labelSubTitle", // 
                widgets: [
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_DOCUMENT",
                            label: "header.menu.document.label", //label: "Архивирај документ",
                            targetUrl: "hdp/ws/archive-doc"
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_DOCUMENT",
                            label: "header.menu.editDocument.label", //label: "Uredi dokument",
                            targetUrl: "hdp/ws/edit-archive-doc"
                        }
                    }
                ]
             }
          }
        );
    }





    function addMenuSection(){
    // if(groups[0].name != "Архивари"){
        headerMenu1.config.widgets.push(  
        { 
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "header.menu.signsSet.labelSubTitle", // 
                widgets: [
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_ORGUNIT_SIGNS",
                            label: "header.menu.orgunitsigns.label", //label: "Внеси архивски знак-организациона единица",
                            targetUrl: "hdp/ws/create-orgunit"
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_TEMPLATE_SIGNS",
                            label: "header.menu.templatesigns.label", //label: "Внеси архивски знак-организациона подединица",
                            targetUrl: "hdp/ws/create-template"
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_REGISTRY",
                            label: "header.menu.registry.label", // "Креирај деловодник"
                            targetUrl: "hdp/ws/create-registry"
                            // iconClass: "alf-registry-icon",
                        }
                    },

                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_UPLOAD_SIGNS",
                            label: "header.menu.uploadsigns.label", //label: "Вчитај архивски знаци",
                            targetUrl: "hdp/ws/create-signs"
                        }
                    }
                ]
             }
          }
        );
    // }
    }





    function reportsMenuSection(){
        headerMenu1.config.widgets.push(

        { 
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "header.menu.reports.labelSubTitle", //
                widgets: [
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_REPORT",
                            label: "header.menu.report.label", //label: "Креирај репорт",
                            targetUrl: "hdp/ws/select-report"  //create-report
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            id: "HEADER_ARCHIVE_DELIVERY_BOOK",
                            label: "header.menu.deliveryBook.label", //label: "Креирај репорт",
                            targetUrl: "hdp/ws/select-delivery-book"  //create-report
                        }
                    }
                ]
             }
          }
          );
        }

    var siteJSON = getArchiveSite();
   

     if( siteJSON != null && siteJSON[0].shortName.indexOf("arhiva") > -1){
         var site = siteJSON[0].shortName;
        if(typeof groups != 'undefined' ){
            archiveMenu();
            for(var i=0; i<groups.length; i++){
                var groupName = groups[i].name.toLowerCase();
                if(groupName.indexOf("administrators") > -1){
                    // archiveMenu();
                    documentsMenuSection();
                    addMenuSection();
                    // reportsMenuSection();
                    break;
                }
                else if(groupName.indexOf("arhivari") > -1 ){
                  //  archiveMenu();
                    documentsMenuSection();
                    // reportsMenuSection();
                    break;
                }else{
                    // reportsMenuSection();
                }     
            }
                    

                    reportsMenuSection();

        }

     }else{

     }


// }
    /* Remove Shared files */
    findAndRemoveIn(model.jsonModel.widgets, null, null, "HEADER_SHARED_FILES");

}
main();