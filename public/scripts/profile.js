$(function() {
  $.get('/../template.html', function(data) {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2YjBmZmUzNDVmYzU3NjQwZmU2MTgzNCIsImlhdCI6MTQ1NDQ0MDQxOX0.WMT6XcEQ6PzVOF45Kr33jo4k0wd12BOXK2Bxua-i660'
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
