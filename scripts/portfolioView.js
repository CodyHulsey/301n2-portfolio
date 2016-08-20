(function(module) {

  var portfolioView = {};

  portfolioView.createFilters = function() {
    $('#projects').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('h2').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        $('#title-filter').append(optionTag);
        val =$(this).data('category');
        optionTag = '<option value="' + val + '">' + val + '</option>';

        if($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };
    // var templateScript = $('#filter').html();
    //
    // var theTemplate = Handlebars.compile(templateScript);
    //
    // var filters = [{
    //   id: 'title-filter',
    //   defaultVal:'-- Filter by Title --'},
    //   { id: 'category-filter',
    //   defaultVal:'-- Filter by Categories --' }];
    //
    // filters.forEach(function(filter) {
    //   $('#filters').append(theTemplate(filter));
    // });

  portfolioView.handleTitleFilter = function() {
    $('#title-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-title="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this). val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#title-filter').val('');
    });
  };

  portfolioView.handleMainNav = function() {
    $('.navContent').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.navContent .tab:first').click();
  };

  // portfolioView.hideView = function() {
  //   $('.navContent').on('click', '.tab', function() {
  //     $('.tab-content').hide();
  //
  //     $('#' + $(this).data('content')).show();
  //   });
  //
  //   $('.navContent .tab:first').click();
  // };

  portfolioView.adjustNavDisplay = function() {
    $('.icon-menu').on('click', function() {
      $('.navContent ul').toggle('fast');
    });
  };

  portfolioView.initNewProjectPage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#project-json').on('focus', function() { //look into this...
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', portfolioView.create);
  };

  portfolioView.create = function() {
    var project;
    $('#projects').empty();

    project = new Project({
      title: $('#project-title').val(),
      category: $('#project-category').val(),
      source: $('#project-source').val(),
      sourceUrl: $('#project-sourceUrl').val(),
      publishedOn: $('#project-publishedOn').length ? util.today() : null,
      body: $('#project-body').val()
    });

    $('#projects').append(project.toHtml());
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#project-json').val(JSON.stringify(article) + ', ');
  };

  portfolioView.initIndexPage = function() {
    Project.all.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });
    Project.numWords();
    portfolioView.createFilters();
    portfolioView.handleTitleFilter();
    portfolioView.handleCategoryFilter();
    portfolioView.handleMainNav();
    portfolioView.adjustNavDisplay();
  };

  // portfolioView.initAdminPage = function() {
  //   var theTemplate = Handlebars.compile($('#write').text());
  //
  //   Project.numWordsByProject().forEach(function(stat) {
  //     $('.cody-stats').append(template(stat));
  //   });
  //
  //   $('#project-stats .projects').text(Project.all.length);
  //   $('#project-stats .words').text(Project.numWords());
  // };

  module.portfolioView = portfolioView;
})(window);
