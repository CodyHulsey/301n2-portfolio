(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    portfolioView.showAbout();
  };

  module.aboutController = aboutController;
})(window);
