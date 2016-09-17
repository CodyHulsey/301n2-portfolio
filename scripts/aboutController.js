(function(module) {
  var aboutController = {};

  aboutController.init = function(ctx, next) {
    $('#about').show().siblings().hide();
    repos.requestRepos(repoView.index);
    next();
  };

  module.aboutController = aboutController;
})(window);
