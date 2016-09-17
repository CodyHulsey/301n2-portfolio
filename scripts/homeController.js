(function(module) {
  var homeController = {};

  homeController.init = function(ctx, next) {
    portfolioView.showHome();
    next();
  };

  module.homeController = homeController;
})(window);
