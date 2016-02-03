$(function() {
  $.get('/../template.html', function(data) {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      success: function(theta) {
        console.log(theta);
        for (var i = 0; i < theta.length; i += 1) {
          var html = template(theta[i]);
          $('#chords').append(html);
        }

      },
      error: function() { console.log('Device control failed'); },
      processData: false,
      type: 'GET',
      url: '/profile'
    });
  });
});
