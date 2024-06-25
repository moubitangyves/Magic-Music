let bg = $("#particles-js");
let audio = null; // Variable globale pour stocker l'objet Audio

$(document).keydown ( function () {
    $(bg).css("background-color", getRandomColor);
})

$(".img").on("click", function() {
    let name = $(this).attr("name");
    const firstLetter = name.charAt(0).toUpperCase();
    const nameCapitalized = firstLetter + name.slice(1);
    $("#titre").text(nameCapitalized);

    $(this).toggleClass("flash")
    
    let music = $(this).attr("name");
    music += ".mp3"
    playMusic(music);
})

$("#btn").click( () => {
    let artiste = $("#input").val();
    let music = artiste + ".mp3"
    playMusic(music);
})

function playMusic(music) {
    if (audio !== null) {
        audio.pause(); // Arrête la musique précédente
    }
    audio = new Audio(music);
    audio.play();
}

function getRandomColor(){
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}
