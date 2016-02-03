$(function() {
  var key;
  var orientation;
  var playing;
  function dropChange(){
    key = $('#letter').val(); 
    orientation = $('#orientation').val();
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

  $('#chords').click(function(e) {
    var targetString = $(e.target);
    targetString = targetString[0].id
    targetString = targetString.replace(' ', '_');
    targetString = '/img/sound/'+targetString+'.mp3';
    if (playing) {
      playing.pause();
    }
    playing = new Audio(targetString);
    playing.play();
  });
});
