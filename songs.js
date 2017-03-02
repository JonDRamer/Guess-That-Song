"use strict";

$(function() {

    var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
        "982388023", "907242704", "201281527", "656801339", "910038357",
        "250038575", "878000348", "794095205", "1645339", "400835962",
        "325618", "169003415", "51958108",
        "192688540", "684811768", "344799464", "217633921",
        "192811017", "71068886", "640047583", "517438248",
        "656479859", "310237", "991390352", "901614155",
        "344799727", "162337613", "121695005", "159293848", "305118379"
    ];

    var itunesdata = {};

    $('#button')
        .on('click', function() {
            let randomIndex = Math.floor(Math.random() * (songIds.length - 1));
            let randomSong = songIds[randomIndex];

            let itunesRequest = $.ajax({
                url: 'http://itunes.apple.com/us/lookup?id=' + randomSong,
                dataType: "jsonp"
            });

            itunesRequest.done(function(data) {
                itunesdata.collectionName = data.results[0].collectionName;
                itunesdata.artistName = data.results[0].artistName;
                itunesdata.trackName = data.results[0].trackName;

                console.log(itunesdata.collectionName);
                var songUrl = data.results[0].previewUrl;
                $('audio')
                    .attr('src', songUrl);
                $('audio')[0].play();
            });
        });

    $('#check-guess')
        .on('click', function() {
            let correctGuesses = 0;
            let incorrectGuesses = 0;
            let userGuess = $('#guess')
                .val();
            let guessCorrect = false;

            for (let key in itunesdata) {
                if (itunesdata[key] === userGuess) {
                    guessCorrect = true;
                    correctGuesses++;
                }
                incorrectGuesses++;
            }
            console.log(correctGuesses);
            console.log(incorrectGuesses);


            alert('your guess was ' + guessCorrect)
        });

});
