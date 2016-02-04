$(() => {

  var playing = true;

  $.get('/../template_userinfo.html', (data) => {
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

  $.get('/../template_chords.html', (data) => {
    var template = Handlebars.compile(data);
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

        $('#load').click(() => {
          // player js

          var selected = $('#chords div.active img').attr('class');
            $.get('/../template_player.html', (data) => {
              var template = Handlebars.compile(data);
              $.ajax({
                contentType: 'application/json',
                headers: {
                  token: $.cookie('token'),
                  chordId: selected
                },
                dataType: 'json',
                processData: false,
                type: 'GET',
                url: '/player2',
                success: function(theta) {
                  var html = template(theta);
                  // stop!
                  window.clearTimeout(doItAgain);
                  // empty!
                  $('#player').empty();
                  // add again
                  $('#player').append(html);

                  var audio;
                  var playlist;
                  var tracks;
                  var current;
                  var bpmTime = 2000;
                  var doItAgain;
                  var link;
                  var par;

                  init();
                  function init() {
                    current = 0;
                    audio = $('#audio');
                    playlist = $('#playlist');
                    tracks = playlist.find('li a');
                    audio[0].play();
                    playlist.find('a').click(function(e) {
                        e.preventDefault();
                        link = $(this);
                        current = link.parent().index();
                        run(link, audio[0]);
                    });
                    doItAgain = window.setTimeout(nextSample, bpmTime);
                  }
                  function run(link, player) {
                    player.src = link.attr('href');
                    par = link.parent();
                    par.addClass('active').siblings().removeClass('active');
                    audio[0].play();
                  }
                  function nextSample() {
                    current = (current + 1) % tracks.length;
                    link = playlist.find('a')[current];
                    run($(link), audio[0]);
                    doItAgain = window.setTimeout(nextSample, bpmTime);
                  }

                  $('#bpm').change(() => {
                    window.clearTimeout(doItAgain);
                    bpmTime = 60000 / Number($('#bpm').val()) * 4;
                    nextSample();
                    playing = true;
                  });

                  $('#load').on('click', () => {
                    playing = true;
                    window.clearTimeout(doItAgain);
                  });

                  $('#pause').on('click', () => {
                    if (playing) {
                      window.clearTimeout(doItAgain);
                      playing = false;
                    }
                  });

                  $('#play').on('click', () => {
                    if (!playing) {
                      playing = true;
                      nextSample();
                    }
                  });
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

  $('.button').click(() => {
      window.location.href = '/chordsInKey';
      return false;
  });

  $('.button-logout').click(() => {
    $.cookie('token', '', -1);
    window.location.href = '/';
  });
});
