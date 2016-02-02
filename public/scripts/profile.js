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
        // for (var i = 0; i < theta.length; i += 1) {
        //   var chord = {};
        //   chord.name = theta[i].name;
        //   chord.chord1 = dictionary[theta[i].chords[0]];
        //   chord.chord2 = dictionary[theta[i].chords[1]];
        //   chord.chord3 = dictionary[theta[i].chords[2]];
        //   chord.chord4 = dictionary[theta[i].chords[3]];
        //
        //   var html = template(chord);
        //   $('#chords').append(html);
        // }
        console.log(theta.chord1.image);
        var html = template(theta);
        $('#chords').append(html);

      },
      error: function() { console.log('Device control failed'); },
      processData: false,
      type: 'GET',
      url: '/profile'
    });
  });
});
