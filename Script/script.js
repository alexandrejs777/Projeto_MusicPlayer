let audio = document.getElementById("audio");
let audioSource = document.getElementById("audioSource");
let btnPlayAndPause = document.getElementById("btnPlayAndPause");
let trackName = document.getElementById("trackName");
let artistName = document.getElementById("artistName");
let timeRange = document.getElementById("timeRange");
let volumeRange = document.getElementById("volumeRange");

var tracks = [
    {
        title: "Sonda-me, Usa-me",
        singer: "Aline Barros",
        file: "./Assets/Music/Aline barros - Sonda-me, Usa-me.mp3",
    }
    ,
    {
        title: "Preciso de Ti",
        singer: "Ana Paula Valadão",
        file: "./Assets/Music/PRECISO DE TI - DIANTE DO TRONO.mp3",
    }
    ,
    {
        title: "Tua Graça Me Basta",
        singer: "Davi Sacer",
        file: "./Assets/Music/yDavi Sacer - Tua Graça me Basta.mp3",
    }
]

let index = 0;

function audioPlayer(index){

    trackName.innerText = tracks[index].title;
    artistName.innerText = tracks[index].singer;
    audioSource.src = tracks[index].file;

    audio.load();
}

audioPlayer(index);

let audioPlaying = false;

function previousTrack() {
    if (index == 0){
        index = tracks.length;
        audioPlayer(index);
        audioPlaying = false;
        play();
    } else {
        index--;
        audioPlayer(index);
        audioPlaying = false;
        play();
    }
}

function play() {

    if (audioPlaying == false){
        audio.play();
        btnPlayAndPause.setAttribute("src", "./Assets/Images/2x/pause.png");
        return audioPlaying = true;
    } else {
        audio.pause()
        btnPlayAndPause.setAttribute("src", "./Assets/Images/2x/play.png");
        return audioPlaying = false;
    }
    
}

function stop() {
    audio.pause();
    btnPlayAndPause.setAttribute("src", "./Assets/Images/2x/play.png");
    audio.currentTime = 0;
    return audioPlaying = false;
}

function nextTrack() {
    if (index == tracks.length){
        index = 0;
        audioPlayer(index);
        audioPlaying = false;
        play();    
    } else {
        index++;
        audioPlayer(index);
        audioPlaying = false;   
        play();
    }
}

function autoMusicChange(){
    let totalTime = audio.duration;
    let currentTime = audio.currentTime;

    if (currentTime == totalTime){
        nextTrack();
    }
}

timeRange.addEventListener("input", time);

function time(){
    audio.currentTime = timeRange.value; 
}

function timeChange(){
    timeRange.max = audio.duration;
    timeRange.value = audio.currentTime;

    autoMusicChange();
}

setInterval(timeChange, 1000)

let volumeStatus = 0;
volumeRange.addEventListener("input", volumeChange);

function volumeChange(){

    volumeStatus = volumeRange.value/100;

    audio.volume = volumeStatus;
}