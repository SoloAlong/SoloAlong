var audio;
var playlist;
var tracks;
var current;
var flag = true;
var bpmTime = 1200;
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


$('#p').on('click', function(){
  window.clearTimeout(doItAgain);
});

$('#r').on('click', function(){
  nextSample();
});