(function(module) {
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
  Project.prototype.toHtml = function() {
    var theTemplate = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return theTemplate(this);
  };

  Project.loadAll = function(projectData) {
    console.log('Entering Loadall');
    projectData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Project.All = projectData.map(function(ele) {
      console.log(ele);
      return new Project(ele);
    });
  };

  Project.fetchAll = function(callback) {
    console.log('fetch started');
    if (localStorage.projectData) {
      console.log('localStorage exists. Loading...');
      Project.loadAll(JSON.parse(localStorage.projectData));
      callback();
      // Project.numImages();
    } else {
      console.log('localStorage does not exist. Loading...');
      $done = $.getJSON('data/projectData.json', function(projectData) {
        Project.loadAll(projectData);
        localStorage.projectData = JSON.stringify(projectData);
        callback();
      }).done(function(){
        // Project.numImages();
        Project.allProjects();
        Project.numWordsByProject();
      });
    }
  };

//Chaining together a map and reduce so that I can get a rough estimate of word count.
  Project.numWords = function() {
    return Project.all.map(function(project) {
      var newArr = Project.body.split(' ');
      return newArr.length;
    })
    .reduce(function(a, b) {
      return a + b;
    },0);
  };
// Creating an array of unique project titles
  Project.allProjects = function() {
    return Project.all.map(function(project) {
      return project.title;
    })
    .filter(function(project, arr, index) {
      return arr.indexOf(project) === index;
    });
  };

  Project.getProjectWords = function() {
    return Project.all.filter(function(project) {
      return Project.title === title;
    })
    .map(function(projectTitle) {
      return projectTitle.body;
    })
    .map(function(body) {
      return body.split(' ').length;
    })
    .reduce(function(acc, b) {
      return acc + b;
    }, 0);
  };

  Project.numWordsByProject = function() {
    return Project.allProjects().map(function(project) {
      return {
        name: title,
        numWords: Project.getProjectWords(project)
      };
    });
  };

  module.Project = Project;
})(window);
