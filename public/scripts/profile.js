$(() => {
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
       
        $('#chords img').click(function(e){
          selected = $(e.target).attr('class');
          document.getElementById('load').disabled = false; 
          // console.log(selected);
        });



        $('#load').click(function(){
          //player js
          var audio;
          var playlist;
          var tracks;
          var current;
          var bpmTime = 2000;
          var doItAgain;
          var playing = true;
          $(() => {
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
                  selected = undefined;
                  document.getElementById('load').disabled = true; 

                  var html = template(theta);
                  //stop!
                  window.clearTimeout(doItAgain);
                  //empty!
                  $('#player').empty();
                  //add again
                  $('#player').append(html);

                  var audio;
                  var playlist;
                  var tracks;
                  var current;
                  var bpmTime = 2000;
                  var doItAgain;

                  init();
                  function init(){
                    current = 0;
                    audio = $('#audio');
                    playlist = $('#playlist');
                    tracks = playlist.find('li a');
                    audio[0].play();
                    playlist.find('a').click(function(e){
                        e.preventDefault();
                        link = $(this);
                        current = link.parent().index();
                        run(link, audio[0]);
                    });
                    doItAgain = window.setTimeout(nextSample, bpmTime);
                  }
                  function run(link, player){
                    player.src = link.attr('href');
                    par = link.parent();
                    par.addClass('active').siblings().removeClass('active');
                    audio[0].play();
                  }
                  function nextSample(){
                    current = (current + 1) % tracks.length;
                    link = playlist.find('a')[current];   
                    run($(link),audio[0]);
                    doItAgain = window.setTimeout(nextSample, bpmTime);
                  }

                  $('#bpm').change(() => {
                    window.clearTimeout(doItAgain);
                    bpmTime = 60000/Number($('#bpm').val()) * 4;
                    nextSample();
                    playing = true;
                  });

                  $('#load').on('click', function(){
                    window.clearTimeout(doItAgain);
                  });

                  $('#pause').on('click', function(){
                    if (playing){
                      window.clearTimeout(doItAgain);
                      playing = false;
                    }
                  });

                  $('#play').on('click', function(){
                    if(!playing){
                      playing = true;
                      nextSample();
                    }
                  });

                  $(window).keydown(function (e) {
                    if (e.keyCode === 32) {
                      e.preventDefault();

                      if (playing){
                      window.clearTimeout(doItAgain);
                      audio[0].pause();
                      playing = false;
                      } 
                      else {
                      playing = true;
                      nextSample();
                      }
                    }
                  });

                },
                error: function(data) { console.log(data); }
              });
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

  $('.button').click(function() {
      window.location.href = '/chordsInKey';
      return false;
  });

});
