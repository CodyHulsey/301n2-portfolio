var portfolioView = {};

portfolioView.createFilters = function() {
  var templateScript = $('#filter').html();

  var theTemplate=Handlebars.compile(templateScript);

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
      // DEBUG
      console.log($('#category-filter option[value="' + val + '"]').length === 0);
      
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

$(document).ready(function() {
  portfolioView.createFilters();
  portfolioView.hideView();
  portfolioView.handleTitleFilter();
  portfolioView.categoryFilter();
  portfolioView.adjustNavDisplay();
});
