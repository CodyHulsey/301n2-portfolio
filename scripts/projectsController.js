(function(module) {

  var projectsController = {};

  localStorage.projectData;
  Project.fetchAll(portfolioView.initIndexPage);

  projectsController.index = function() {
    portfolioView.showProjects();
  };

  module.projectsController = projectsController;
})(window);
