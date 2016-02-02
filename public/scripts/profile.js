$(function() {
  $.get('/../template.html', function(data) {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2YjBmNTYxMmVjZmIyNDAxYzgwMDcxNCIsImlhdCI6MTQ1NDQzNzcyOX0.H40J-MCk6V3cxv_04HtkV3U1McZ0sM8z0MbskgTom7Q'
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
