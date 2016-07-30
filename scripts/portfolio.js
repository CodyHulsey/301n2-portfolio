var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.about = opts.about;
  this.category = opts.category;
  this.source = opts.source;
  this.sourceUrl = opts.sourceUrl;
  this.publishedOn = opts.publishedOn;
  this.image = opts.image;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {

  var templateScript = $('#article-template').html();

  var theTemplate = Handlebars.compile(templateScript);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return theTemplate(this);

};

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
