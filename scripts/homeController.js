(function(module) {
  var homeController = {};

  homeController.init = function(ctx, next) {
    next();
  };

  module.homeController = homeController;
})(window);
