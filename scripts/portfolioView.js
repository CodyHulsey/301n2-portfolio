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
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#title-filter').append(optionTag);

      val =$(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if($('#category-filter option[value="' + val + '"]').length === 0) {
        $('category-filter').append(optionTag);
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
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();

    $('#' + $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click();
};

portfolioView.adjustNavDisplay = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').fadeToggle('fast');
  });
};

$(document).ready(function() {
  portfolioView.createFilters();
  portfolioView.hideView();
  portfolioView.categoryFilter();
  portfolioView.adjustNavDisplay();
});
