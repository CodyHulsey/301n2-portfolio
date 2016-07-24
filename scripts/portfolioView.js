var portfolioView = {}

portfolioView.hideView = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();

    $('#' + $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click();
};

portfolioView.adjustNavDisplay = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').fadeToggle("fast");
  });
};

$(document).ready(function() {
  portfolioView.hideView();
  portfolioView.adjustNavDisplay();
});
