(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(ctx, next) {
    console.log('repos.requestRepos call');
    $.get('/github/users/codyhulsey/repos?per_page=10$sort=updated')
    .done(function(data) {
      console.log('data', data);
      repos.all = data;
      next();
    });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
