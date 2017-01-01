$(function() {

    $data = {
        "lastProjectId" : 0,
        "lastActivityId" : 100000,
        "projects" : [],
        "currentlyRunning" : {
            "projectId" : -1,
            "activityId" : -1
        }
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

        fillProjects();
        if($data.currentlyRunning.projectId > -1) {
            showProject(findProjectById($data.currentlyRunning.projectId));
        } else $('#project-details').hide();

        var b = findActivityById(100007).begin;
        var e = findActivityById(100007).end;
    }

});