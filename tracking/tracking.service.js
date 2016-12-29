function fillProjects() {
    for(var i = 0; i < $data.length; i++) {
        $d = $data[i];
        appendToList($('#projects'), $d, 'project-item');
    }
}

function appendToList(list, item, className) {
    $str  = '<li class="'+className+'" data-id="'+item.id+'">';
    $str += '<h3 style="color:#'+item.colour+'" class="title">'+item.name+'</h3> ';
    $str += '<span class="duration">('+(item.workingTime/3600)+'h)</span><br />';
    $str += '<span class="desc">'+item.description+'</span>';
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
    for(var i = 0; i < $data.length; i++) {
        if($data[i].id == id) return $data[i];
    }
    return false;
}

function findActivityById(id) {
    for(var i = 0; i < $data.length; i++) {
        for(var j = 0; j < $data[i].activity.length; j++) {
            if(id == $data[i].activity[j].id) {
                return $data[i].activity[j];
            }
        }
        if($data[i].id == id) return $data[i];
    }
    return false;
}

function saveProjectData(id) {
    if(id === undefined) {
        // save
    } else if(findProjectById(id) !== false) {
        
    } else {
        return false;
    }

    // business logic ...

}

function saveActivityData(project, id) {
    if(findProjectById(project) == false) return false;

    if(id === undefined) {
        // save
    } else {

    }

    // business logic ...
}