$(function() {

    $(document).on('click', '#add-project', function() {
        saveProjectData();
        fillProjects();
    });

    $(document).on('click', '#save-activity', function() {
        saveActivityData(3);
    });

    $(document).on('click', '.project-item', function(e) {
        var _this = $(this);
        showProject(findProjectById(_this.data('id')));
        $('#projects').slideUp(150);
        $('#project-details').slideDown(150);
        
    });

    $(document).on('click', '#refresh', function() {
        $('#debug').html(JSON.stringify($data));
    });

    $(document).on('click', '#backToHome', function() {
        $('#projects').slideDown(150);
        $('#project-details').slideUp(150);
    });

});