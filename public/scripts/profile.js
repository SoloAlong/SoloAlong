$(() => {
  $.get('/../user_template.html', (data) => {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      processData: false,
      type: 'GET',
      url: '/profile',
      success: function(theta) {
        console.log(theta);
        var userinfo = theta.userinfo[0];
        console.log(userinfo);
        var user = template(userinfo);
        $('#userinfo').append(user);
      },
      error: function(data) { console.log(data); },
      processData: false,
      type: 'GET',
      url: '/profile'
    });
  });
  $.get('/../template.html', (data) => {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      success: function(theta) {
        console.log(theta);
        var chord = theta.chord;
        for (var i = 0; i < chord.length; i += 1) {
          var chordm = template(chord[i]);
          $('#chords').append(chordm);
        }
      },
      error: function(data) { console.log(data); },
      processData: false,
      type: 'GET',
      url: '/profile'
    });
  });
});
