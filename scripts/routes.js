page('/', homeController.init);
page('/about', aboutController.init, repos.requestRepos);
page('/projects', projectsController.init);

page();
