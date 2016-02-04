$(function() {
  var key;
  var orientation;
  var playing;
  function dropChange() {
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
          $( '.drag' ).draggable({
            revert: 'invalid',
            helper: 'clone'
          });
          $('.drop').droppable({
            drop: function(ev, ui) {
              $(this).first().empty();
              $(this).append($(ui.draggable).clone());
            }
          });
        },
        error: function() { console.log('Device control failed'); }
      });
    });
  }
  $('#letter').change(dropChange);
  $('#orientation').change(dropChange);
  dropChange();

  $('#chords').click(function(e) {
    var targetString = $(e.target);
    targetString = targetString[0].id;
    targetString = targetString.replace(' ', '_');
    targetString = '/img/sound/' + targetString + '.mp3';
    if (playing) {
      playing.pause();
    }
    playing = new Audio(targetString);
    playing.play();
  });

  $('#button').on('click', function(e) {
    e.preventDefault();

    var obj = {};

    var name = $('#name').val();
    var chords = [];

    if (!($('#d1 img').prop('id') && $('#d2 img').prop('id') && $('#d3 img').prop('id') && $('#d4 img').prop('id'))) {
      return $('#er').show();
    }

    chords.push($('#d1 img').prop('id').toLowerCase());
    chords.push($('#d2 img').prop('id').toLowerCase());
    chords.push($('#d3 img').prop('id').toLowerCase());
    chords.push($('#d4 img').prop('id').toLowerCase());

    obj.name = name;
    obj.chords = chords;

    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      success: function(theta) {
        console.log('success');
        window.location.href = '/profiles';
      },
      error: function(data) { console.log(data); },
      processData: false,
      type: 'POST',
      data: JSON.stringify(obj),
      url: '/newCP'
    });
  });
});
