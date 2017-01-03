function fillProjects() {
    $data = loadFromStorage();

    $('#projects').html('');

    if($data.projects.length < 1) {
        $('#projects').html('<li>No projects added');
        toggleAddProject();
    }

    for(var i = $data.projects.length-1; i >= 0; i--) {
        $d = $data.projects[i];
        appendToList($('#projects'), $d, 'project-item');
    }
}

function appendToList(list, item, className) {
    var workingTime = Math.floor(item.workingTime / 3600) + "h " + Math.ceil((item.workingTime % 3600)/60) + "m";
    $str  = '<li class="'+className+'" data-id="'+item.id+'">';
    $str += '<h3 style="color:#'+item.colour+'" class="title">'+item.name+'</h3> ';
    $str += '<span class="desc">'+item.description+'</span> ';
    $str += '<span class="duration">('+workingTime+')</span>';
    $str += '</li>';
    list.append($str);
}

function toggleAddProject() {
    $('.new-project').slideToggle(150);
    $('#new-project').find('span').toggle();
}

function showProject(item, data) {
    $data = data || loadFromStorage();
    var p = $('#project-details');
    var workingTime = Math.floor(item.workingTime / 3600) + "h " + Math.ceil((item.workingTime % 3600)/60) + "m";
    $('.projects-wrapper').hide();
    p.find('h2').html(item.name);
    p.find('h2').css('color', '#'+item.colour);
    p.find('#desc').html(item.description);
    p.find('#url').html('<a href="'+item.url+'" target="_blank">'+item.url+'</a>');
    p.find('#workingTime').html(workingTime);

    if($data.currentlyRunning.projectId == item.id) {
        $('#save-activity').hide();
        $('#stop-activity').show();
        $('#project-details .form').show();

    } else if($data.currentlyRunning.projectId > -1) {
        $('#project-details .form').hide();
    } else {
        $('#project-details .form').show();
        $('#save-activity').show();
        $('#stop-activity').hide();
    }

    $act = "";
    for(var i = item.activity.length -1; i >= 0; i--) {
        end = moment(item.activity[i].end);
        beg = moment(item.activity[i].begin);

        dur = moment.duration(end.diff(beg));

        if(dur.asHours() < 1) dur = Math.ceil(dur.asMinutes()) + "m";
        else dur = Math.floor(dur.asHours()) + "h " + Math.ceil((dur.asHours() - Math.floor(dur.asHours())) * 60) + "m";


        $act +="<li>";
        $act +="<h3>"+item.activity[i].name+"</h3>";
        $act +="<span>"+beg.format('YYYY-MM-DD, H:mm')+": "+dur+"</span>";
        $act +="</li>";
    }

    $('#activities').html($act);

}

function findProjectById(id, data) {
    $data = data || loadFromStorage();

    for(var i = 0; i < $data.projects.length; i++) {
        if($data.projects[i].id == id) return $data.projects[i];
    }
    return false;
}

function findActivityById(id, data) {
    $data = data || loadFromStorage();

    for(var i = 0; i < $data.projects.length; i++) {
        for(var j = 0; j < $data.projects[i].activity.length; j++) {
            if(id == $data.projects[i].activity[j].id) {
                return $data.projects[i].activity[j];
            }
        }
        if($data.projects[i].id == id) return $data.projects[i];
    }
    return false;
}

function saveProjectData(id) {
    $data = loadFromStorage();

    if(id === undefined) {
        // save
        $p = $.extend({}, $project);
        $fields = ["name", "description", "url", "colour"];
        $p.id = ++$data.lastProjectId;
        for(var i = 0; i < $fields.length; i++) {
            if($('#project-'+$fields[i]).val().length > 0) $p[$fields[i]] = $('#project-'+$fields[i]).val();
        }

        if($data.projects.push($p)) return saveToStorage($data);
    } else if(findProjectById(id) !== false) {
        // update
        $p = findProjectById(id);
        $fields = ["name", "description", "url", "colour"];
        for(var i = 0; i < $fields.length; i++) {
            if($('#project-'+$fields[i]).val().length > 0) $p[$fields[i]] = $('#project-'+$fields[i]).val();
        }

        return saveToStorage($data)
    } else {
        return false;
    }

}

function saveActivityData(project, id) {
    $data = loadFromStorage();
    
    if(findProjectById(project) == false) return false;

    if(id === undefined) {
        // save
        if($('#activity-name').val().length < 1) return false;

        $a = $.extend({}, $activity);

        $a.id = ++$data.lastActivityId;
        $a.name = $('#activity-name').val();

        $p = findProjectById(project, $data);
        $p.activity.push($a);

        $data.currentlyRunning.projectId = project;
        $data.currentlyRunning.activityId = $data.lastActivityId;

        showProject($p, $data);

        return saveToStorage($data)

    } else {
        return saveToStorage($data)
    }
}

function stopActivity() {
    $data = loadFromStorage();

    $('.activity-trigger').toggle();

    if($data.currentlyRunning.activityId == -1) return false;
    var $a = findActivityById($data.currentlyRunning.activityId);
    $a.end = new Date();

    $p = $data.currentlyRunning.projectId;
    $data.currentlyRunning.projectId  = -1;
    $data.currentlyRunning.activityId = -1;

    saveCurrentDurationToProject($p, $data);

    saveToStorage($data);

    showProject(findProjectById($p));
    
    return true;
}

function saveCurrentDurationToProject(projectId, $data) {
    $project = findProjectById(projectId, $data);
    var duration = 0;
    var $a;
    for(var i = 0; i < $project.activity.length; i++) {
        $a = $project.activity[i];
        duration += moment($a.end) - moment($a.begin);
    }
    duration = Math.floor(duration/1000);
    $p.workingTime = duration;
}

function saveToStorage(data) {
    return localStorage.setItem('timeTrackerData', JSON.stringify(data));
}

function loadFromStorage() {
    $storage = localStorage.getItem('timeTrackerData');
    return JSON.parse($storage);
}