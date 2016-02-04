//make a get request to player2 to pass in chords, and name
var audio;
        var playlist;
        var tracks;
        var current;
        var bpmTime = 2000;
        var doItAgain;
$(() => {
  $.get('/../template_player.html', (data) => {
    var template = Handlebars.compile(data);
    $.ajax({
      contentType: 'application/json',
      headers: {
        token: $.cookie('token')
      },
      dataType: 'json',
      processData: false,
      type: 'GET',
      url: '/player2',
      success: function(theta) {
        console.log(theta);
        var html = template(theta);
        $('#chords').append(html);

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
          //console.log($('#bpm').val() );
          nextSample();
        });

        $('#pause').on('click', function(){
          window.clearTimeout(doItAgain);
        });

        $('#play').on('click', function(){
          // init();
          nextSample();
      });

      },
      error: function(data) { console.log(data); }
    });
  });
});
