$(function() {

    $data = {
        "lastProjectId" : 2,
        "lastActivityId" : 1000004,
        "projects" : [
            {
                "id" : 1,
                "name" : "google",
                "description" : "web project google",
                "url" : "http://google.com",
                "colour" : "0000cc",
                "isArchived" : false,
                "workingTime" : 7200,
                "activity" : [
                    {
                        "id" : "1000001",
                        "name" : "setup google server",
                        "begin" : "2016-12-28 16:00:00",
                        "end" : "2016-12-28 17:00:00",
                        "billable" : true,
                        "isDeleted" : false
                    },
                    {
                        "id" : "1000002",
                        "name" : "setup google services",
                        "begin" : "2016-12-28 18:00:00",
                        "end" : "2016-12-28 19:00:00",
                        "billable" : true,
                        "isDeleted" : false
                    }
                ]
            },
            {
                "id" : 2,
                "name" : "yahoo",
                "description" : "web project yahoo",
                "url" : "http://yahoo.com",
                "colour" : "00cc00",
                "isArchived" : false,
                "workingTime" : 5400,
                "activity" : [
                    {
                        "id" : "1000003",
                        "name" : "setup yahoo files",
                        "begin" : "2016-12-29 16:00:00",
                        "end" : "2016-12-29 17:00:00",
                        "billable" : true,
                        "isDeleted" : false
                    },
                    {
                        "id" : "1000004",
                        "name" : "setup yahoo database",
                        "begin" : "2016-12-29 18:00:00",
                        "end" : "2016-12-29 18:30:00",
                        "billable" : true,
                        "isDeleted" : false
                    }
                ]
            }
        ]
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

    init();
    function init() {
        fillProjects();
        $('#project-details').hide();
    }

});