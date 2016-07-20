var projects = [];

function project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn: opts.publishedOn;
  this.image = opts.image;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

  $newProject.attr('data-category', this.category);

  $newProject.find('h2'.html(this.title);

  $newProject.find('time[pubdate]').attr('title',this.publishedOn);

  $newProject.find()
}

//WORK IN PROGRESS
