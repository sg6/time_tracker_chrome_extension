$(function() {

    $(document).on('click', '#add-project', function() {
        saveProjectData();
        fillProjects();
    });

    $(document).on('click', '#save-activity', function() {
        saveActivityData($currentProject);
    });

    $(document).on('click', '#stop-activity', function() {
        stopActivity();
    });

    $(document).on('click', '#new-project', function() {
        toggleAddProject();
    });

    $(document).on('click', '.project-item', function(e) {
        var _this = $(this);
        showProject(findProjectById(_this.data('id')));
        $('.projects-wrapper').slideUp(150);
        $('#project-details').slideDown(150);

        $currentProject = _this.data('id');
        
    });

    $(document).on('click', '#refresh', function() {
        $('#debug').html(JSON.stringify(loadFromStorage()));
    });

    $(document).on('click', '#backToHome', function() {
        $('.projects-wrapper').slideDown(150);
        $('#project-details').slideUp(150);
    });

    $(document).on('click', '#activity-name', function() {
        $(this).select();
    });

});