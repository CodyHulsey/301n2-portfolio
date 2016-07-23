var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.image = opts.image;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

  $newProject.attr('data-category', this.category);

  $newProject.find('h2').html(this.title);

  $newProject.find('.project-body').html(this.body);

  $newProject.find('time[pubdate]').attr('title',this.publishedOn);

  $newProject.find('time').html(' about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.append('<hr>');

  $newProject.removeClass('template');

  return $newProject;
}
//rawData.sort sorts stuff. It's giving you some flexibility on how you want something sorted. A callback is a function as an argument. It's expecting two parameters. We are just doing math. We are comparing the two. .sort is an interation tool. .sort is just an array method.
projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});
//Another array method that has another call back. For the length of this array, do something with this element. articles.push pushes that object into the articles array.
projectData.forEach(function(ele) {
  projects.push(new Project(ele));
})

projects.forEach(function(a){
  $('#projects').append(a.toHtml())
});
