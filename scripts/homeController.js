(function(module) {
  var homeController = {};

  homeController.index = function() {
    portfolioView.showHome();
  };

  module.homeController = homeController;
})(window);
