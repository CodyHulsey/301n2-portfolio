var portfolioView = {}

portfolioView.hideView = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();

    $('#' + $(this).data('content')).show();
  });

  $('.main-nav .tab:first').click();
};

$(document).ready(function() {
  portfolioView.hideView();
});
