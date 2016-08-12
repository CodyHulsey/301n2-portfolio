var portfolioView = {};

portfolioView.createFilters = function() {
  var templateScript = $('#filter').html();

  var theTemplate = Handlebars.compile(templateScript);

  var filters = [{
    id: 'title-filter',
    defaultVal:'-- Filter by Title --'},
    { id: 'category-filter',
    defaultVal:'-- Filter by Categories --' }];

  filters.forEach(function(filter) {
    $('#filters').append(theTemplate(filter));
  });

  $('article').each(function() {
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
portfolioView.categoryFilter = function() {
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

portfolioView.hideView = function() {
  $('.navContent').on('click', '.tab', function() {
    $('.tab-content').hide();

    $('#' + $(this).data('content')).show();
  });

  $('.navContent .tab:first').click();
};

portfolioView.adjustNavDisplay = function() {
  $('.icon-menu').on('click', function() {
    $('.navContent ul').fadeToggle('fast');
  });
};

portfolioView.initNewProjectPage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#project-json').on('focus', function() {
    this.select();
  });

  $('#new-form').on('change', 'input, textarea', portfolioView.create);
};

portfolioView.create = function() {
  var project;
  $('#projects').empty();

  project = new Project({
    title: $('#project-title').val(),
    about: $('#project-about').val(),
    category: $('#project-category').val(),
    source: $('#project-source').val(),
    sourceUrl: $('#project-sourceUrl').val(),
    publishedOn: $('#project-publishedOn').length ? util.today() : null,
    image: $('#project-image').val(),
    body: $('#project-body').val()
  });

  $('#projects').append(article.toHtml());

  $('#export-field').show();
  $('#article-json').val(JSON.stringify(article) + ', ');
};

portfolioView.initIndexPage = function() {
  Project.all.forEach(function(a) {
    $('#projects').append(a.toHtml());
  });

  portfolioView.createFilters();
  portfolioView.handleTitleFilter();
  portfolioView.categoryFilter();
  portfolioView.hideView();
  portfolioView.adjustNavDisplay();
};
