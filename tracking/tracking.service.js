function fillProjects() {
    $('#projects').html('');
    for(var i = 0; i < $data.projects.length; i++) {
        $d = $data.projects[i];
        appendToList($('#projects'), $d, 'project-item');
    }
}

function appendToList(list, item, className) {
    $str  = '<li class="'+className+'" data-id="'+item.id+'">';
    $str += '<h3 style="color:#'+item.colour+'" class="title">'+item.name+'</h3> ';
    $str += '<span class="desc">'+item.description+'</span> ';
    $str += '<span class="duration">('+(item.workingTime/3600)+'h)</span>';
    $str += '</li>';
    list.append($str);
}

function showProject(item) {
    var p = $('#project-details');
    p.find('h2').html(item.name);
    p.find('h2').css('color', '#'+item.colour);
    p.find('#desc').html(item.description);
    p.find('#url').html('<a href="'+item.url+'" target="_blank">'+item.url+'</a>');
    p.find('#workingTime').html(item.workingTime+"s");

    $act = "";
    for(var i = 0; i < item.activity.length; i++) {
        $act +="<li>";
        $act +="<h3>"+item.activity[i].name+"</h3>";
        $act +="<span>"+item.activity[i].begin+" ("+item.activity[i].end+")</span>";
        $act +="</li>";
    }

    $('#activities').html($act);

}

function findProjectById(id) {
    for(var i = 0; i < $data.projects.length; i++) {
        if($data.projects[i].id == id) return $data.projects[i];
    }
    return false;
}

function findActivityById(id) {
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
    if(id === undefined) {
        // save
        $p = $.extend({}, $project);
        $fields = ["name", "description", "url", "colour"];
        $p.id = ++$data.lastProjectId;
        for(var i = 0; i < $fields.length; i++) {
            if($('#project-'+$fields[i]).val().length > 0) $p[$fields[i]] = $('#project-'+$fields[i]).val();
        }

        if($data.projects.push($p)) return true;
    } else if(findProjectById(id) !== false) {
        // update
        $p = findProjectById(id);
        $fields = ["name", "description", "url", "colour"];
        for(var i = 0; i < $fields.length; i++) {
            if($('#project-'+$fields[i]).val().length > 0) $p[$fields[i]] = $('#project-'+$fields[i]).val();
        }


    } else {
        return false;
    }

}

function saveActivityData(project, id) {
    if(findProjectById(project) == false) return false;

    if(id === undefined) {
        // save
        if($('#activity-name').val().length < 1) return false;

        $a = $.extend({}, $activity);
        $a.id = ++$data.lastActivityId;
        $a.name = $('#activity-name').val();

        $p = findProjectById(project);

        $p.activity.push($a);
        showProject($p);

    } else {
        
    }
}