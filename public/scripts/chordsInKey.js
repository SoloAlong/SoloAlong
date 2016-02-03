$(function() {
  var key;
  var orientation;
  function dropChange(){
    key = $('#letter').val(); 
    orientation = $('#orientation').val();
    console.log(key);
    //get 7 chords
    $.get('/../template_chordsInKey.html', function(data) {
      var template = Handlebars.compile(data);

      $.ajax({
        type: 'GET',
        url: '/chordsInKeyz',
        contentType: 'application/json',
        headers: {
          token: $.cookie('token'),
          key: key,
          orientation: orientation
        },
        processData: false,
        //dataType: 'string',
        success: function(theta) {
          console.log(theta);
          var html = template(theta);
          $('#chords').empty();
          $('#chords').append(html);
        },
        error: function() { console.log('Device control failed'); }
        
      });
    });

  }
  $('#letter').change(dropChange);
  $('#orientation').change(dropChange);

  // $.get('/../template_chordsInKey.html', function(data) {
  //   var template = Handlebars.compile(data);
  //   $.ajax({
  //     contentType: 'application/json',
  //     headers: {
  //       token: $.cookie('token')
  //     },
  //     dataType: 'json',
  //     success: function(theta) {
  //       console.log(theta);
  //       for (var i = 0; i < theta.length; i += 1) {
  //         var html = template(theta[i]);
  //         $('#chords').append(html);
  //       }
  //     },
  //     error: function() { console.log('Device control failed'); },
  //     processData: false,
  //     type: 'GET',
  //     url: '/profile'
  //   });
  // });
});
