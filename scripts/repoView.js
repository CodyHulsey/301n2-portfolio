(function(module) {
  var repoView = {};

  var interface = function() {
    var $about = $('#about');

    $about.find('ol').empty();
    $about.show().siblings().hide();
  };

  var render = Handlebars.compile($('#git-template').html());

  repoView.index = function() {
    interface();
    $('#about ol').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
