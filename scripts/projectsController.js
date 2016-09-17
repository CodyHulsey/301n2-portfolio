(function(module) {

  var projectsController = {};

  localStorage.projectData;
  Project.fetchAll(portfolioView.initIndexPage);

  projectsController.init = function(ctx, next) {
    portfolioView.showProjects();
    next();
  };

  module.projectsController = projectsController;
})(window);
