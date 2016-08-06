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

Project.all = [];
//Going to refactor the code below
Project.prototype.toHtml = function() {
  var theTemplate = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return theTemplate(this);
};

Project.loadAll = function(projectData) {
  projectData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};
//semicolons might be throwing it off


// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.

Project.fetchAll = function() {
  if (localStorage.projectData) {
    // When rawData is already in localStorage,
    // we can load it by calling the .loadAll function,
    // and then render the index page (using the proper method on the articleView object).
    Project.loadAll(JSON.parse(localStorage.projectData));
    portfolioView.initIndexPage(); //probably need to make sure this works in the portfolioView page.
  } else {
    $.getJSON('../data/projectData.json', function(data) {
      Project.loadAll(data);
      localStorage.setItem('projectData', JSON.stringify(Project.all));
      portfolioView.initIndexPage();
    });
  }
};
