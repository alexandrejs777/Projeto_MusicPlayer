let audio = document.getElementById("audio");
let audioSource = document.getElementById("audioSource");
let btnPlayAndPause = document.getElementById("btnPlayAndPause");
let trackName = document.getElementById("trackName");
let artistName = document.getElementById("artistName");
let timeRange = document.getElementById("timeRange");
let timelapse = document.getElementById("timelapse");
let volumeMute = document.getElementById("btnVolumeMute");
let volumeRange = document.getElementById("volumeRange");
let volumeValue = document.getElementById("volumeValue");
let volumeIcon = document.getElementById("volumeIcon");


/* Objeto tracks com as músicas utilizadas no player */

var tracks = [
    {
        title: "Sonda-me, Usa-me",
        singer: "Aline Barros",
        file: "./Assets/Music/Sonda-me, Usa-me - Aline Barros.mp3",
    }
    ,
    {
        title: "Preciso de Ti",
        singer: "Ana Paula Valadão",
        file: "./Assets/Music/Preciso de Ti - Ana Paula Valadao.mp3",
    }
    ,
    {
        title: "Tua Graça Me Basta",
        singer: "Davi Sacer",
        file: "./Assets/Music/Tua Graça me Basta - Davi Sacer.mp3",
    },
    {
        title: "Raridade",
        singer: "Anderson Freire",
        file: "./Assets/Music/Raridade - Anderson Freire.mp3",
    }
    ,
    {
        title: "Hosana",
        singer: "Gabriela Rocha & Lukas Agustinho",
        file: "./Assets/Music/Hosana - Gabriela Rocha & Lukas Agustinho.mp3",
    }
    ,
    {
        title: "Teu Reino",
        singer: "Cristo Vivo",
        file: "./Assets/Music/Teu Reino - Cristo Vivo.mp3",
    }
    ,
    {
        title: "Deus da Minha Vida",
        singer: "Thalles Roberto",
        file: "./Assets/Music/Deus Da Minha Vida - Thalles Roberto.mp3",
    }
    ,
    {
        title: "Alívio",
        singer: "Jessé Aguiar",
        file: "./Assets/Music/Alivio - Jesse Aguiar.mp3",
    }
    ,
    {
        title: "Deus Proverá",
        singer: "Gabriela Gomes",
        file: "./Assets/Music/Deus Provera - Gabriela Gomes.mp3",
    }
    ,
    {
        title: "Sobre as Águas",
        singer: "Davi Sacer",
        file: "./Assets/Music/Sobre as Aguas - Davi Sacer.mp3",
    }
    ,
    {
        title: "Caminho no Deserto",
        singer: "Soraya Moraes",
        file: "./Assets/Music/Caminho no Deserto - Soraya Moraes.mp3",
    }
    ,
    {
        title: "Maranata",
        singer: "Avivah & Fernanda Madaloni",
        file: "./Assets/Music/Maranata - Avivah & Fernanda Madaloni.mp3",
    },
    {
        title: "Eu Escolho Deus",
        singer: "Thalles Roberto",
        file: "./Assets/Music/Eu Escolho Deus - Thalles Roberto.mp3",
    }    
]

/* Aqui é criado o index que vai ser utilizado para controlar as faixas de música do nosso player, e a função audioPlayer(index) vair carregar estes itens */

let index = 0;

function audioPlayer(index){

    trackName.innerText = tracks[index].title;
    artistName.innerText = tracks[index].singer;
    audioSource.src = tracks[index].file;

    audio.load();

}

audioPlayer(index);             /* Executa a função audioPlayer() */

let audioPlaying = false;       /* Define se e o audio está em execução ou não */


/* Volta para a faixa anterior, faixa seguinte e a função autoMusicChange() troca para a próxima música de forma automática, assim que a anterior atingir o seu tempo máximo */

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

/* Executa o audio atual, e faz a troca do botão play e pause */

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

/* Para a música atual, e muda o botão para o padrão de play */

function stop() {

    audio.pause();
    btnPlayAndPause.setAttribute("src", "./Assets/Images/2x/play.png");
    audio.currentTime = 0;
    return audioPlaying = false;

}


/* Abaixo é feito o controle de tempo das músicas */

timeRange.addEventListener("input", time);

function time(){

    audio.currentTime = timeRange.value;

}

/* Na função timeChange(), é controlado o tempo do audio pelo input range, e padroniza o display do tempo atual e do tempo total da música em execução */

function timeChange(){

    timeRange.max = audio.duration;
    timeRange.value = audio.currentTime;

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.round(audio.currentTime % 60);
    let minutesTotal = Math.floor(audio.duration / 60);
    let secondsTotal = Math.round(audio.duration % 60);

    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (minutesTotal < 10){
        minutesTotal = "0" + minutesTotal;
    }
    if (secondsTotal < 10){
        secondsTotal = "0" + secondsTotal;
    }

    timelapse.innerText = minutes + ":" + seconds + " / " + minutesTotal + ":" + secondsTotal;

    autoMusicChange(); 

}

setInterval(timeChange, 1000)           /* Aqui executa o timeChange a cada segundo */


/* Abaixo são os controles de som e volume */

let mutedSound = false;

function muteSound(){
    
    if (mutedSound == false){
        audio.volume = 0;
        volumeIcon.setAttribute("src", "./Assets/Images/1x/volumeMuted.png");
        volumeMute.style.border = "solid 1px goldenrod";
        return mutedSound = true;
        
    } else {
        audio.volume = volumeRange.value/100;
        volumeIcon.setAttribute("src", "./Assets/Images/1x/volumeUp.png");
        volumeMute.style.border = "solid 1px white";
        return mutedSound = false;
    }
    
}

let volumeStatus;
volumeRange.addEventListener("input", volumeChange);

function volumeChange(){

    volumeStatus = volumeRange.value/100;

    audio.volume = volumeStatus;

    volumeValue.innerText = Math.floor(volumeStatus * 100);

    if (volumeStatus == 0){
        volumeIcon.setAttribute("src", "./Assets/Images/1x/volumeMuted.png");
        return mutedSound = true;
    } else {
        volumeIcon.setAttribute("src", "./Assets/Images/1x/volumeUp.png");
        return mutedSound = false;
    }

}