$(function() {

    $data = {
        "lastProjectId" : 0,
        "lastActivityId" : 100000,
        "projects" : []
    };

    $project = {
        "id" : -1,
        "name" : "",
        "description" : "",
        "url" : "",
        "colour" : "#000000",
        "isArchived" : false,
        "workingTime" : 0,
        "activity" : []
    };

    $activity = {
        "id" : -1,
        "name" : "",
        "begin" : new Date(),
        "end" : new Date(),
        "billable" : true,
        "isDeleted" : false
    };

    $currentProject = -1;

    init();
    function init() {
        if(loadFromStorage() == null) saveToStorage($data);
        else $data = loadFromStorage();

        console.log(loadFromStorage());

        fillProjects();
        $('#project-details').hide();
    }

});