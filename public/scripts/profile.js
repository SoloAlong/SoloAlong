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
        var userinfo = theta.userinfo[0];
        var user = template(userinfo);
        $('#userinfo').append(user);
      },
      error: function(data) { console.log(data); }
    });
  });
  $.get('/../template.html', (data) => {
    var template = Handlebars.compile(data);
    var selected;
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      success: function(theta) {
        var chord = theta.chord;
        for (var i = 0; i < chord.length; i += 1) {
          var chordm = template(chord[i]);
          $('#chords').append(chordm);
        }
        $('#chords').children().first().attr('class', 'item active');

       
        $('#chords').click(function(e){
          selected = $(e.target).attr('class');
          document.getElementById('load').disabled = false; 
          console.log(selected);
        });

        // $('button').click(function(){
        //   //ajax to template
        //   console.log(selected);
        //   var _id = selected;
        // });

        $('button').click(function(){
          //ajax to template
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
                var userinfo = theta.userinfo[0];
                var user = template(userinfo);
                $('#userinfo').append(user);
              },
              error: function(data) { console.log(data); }
            });
          });
        });

      },
      error: function(data) { console.log(data); },
      processData: false,
      type: 'GET',
      url: '/profile'
    });
  });
});
