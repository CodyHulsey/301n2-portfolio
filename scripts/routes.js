page('/', homeController.init);
page('/about', aboutController.init, repos.requestRepos, repoView.index);
page('/projects', projectsController.init);

page();
