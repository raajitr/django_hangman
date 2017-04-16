var letter;
var hint;
var word;

$(document).ready(function(){
    getNewWord();
});

function getNewWord(){
    var resp = getWord()
    word = resp['word'].toUpperCase();
    hint = resp['meaning'];
    console.log(hint);
    var word_length = resp['length'];
    var blanks = resp['blanks'];
    gamestage='<div id="outer"><img id="hangman"><span id="button-holder1" ><h3><button id="hint"><span id="hint-span" class="glyphicon">&#xe101;</span></button></h3> </span><span id="button-holder2" ><h3><button id="reset"><span id="reset-span" class="glyphicon">&#xe030;</span></button></h3> </span>';
    $("#game-stage").html(gamestage);
    $('#hangman').fadeOut("slow", function(){
      $(this).attr('src',IMAGES[0]).bind('onreadystatechange load', function(){
         if (this.complete) $(this).fadeIn("slow").css({"background-color": "white"});
      });
   });
    blank_space = "<h1 id='blanks'>"+blanks+"</h1>";
    $("#game-stage").append(blank_space);
    var options = "<h2>";
    for (var i = 65; i <= 90; i++) {
    options += "<button class='options'><span id="+String.fromCharCode(i)+">"+String.fromCharCode(i)+" </button></div>";
    }
    options += '</h2>'
    $("#game-stage").append(options);
    $("#blanks").css({"font-weight":0, "letter-spacing": "4px"});
    $("#game-stage").css({"background-color":"black",});

    $(".options").click(function(){
        letter = $(this).text().trim();
        $(this).prop('disabled', true);
        sendLetter();
    });
    $("#hint").on('click', function(){
        if ($('#hint-text').text() === ''){
        $('#hint-text').animate("slow", function(){
            $('#hint-text').text(hint);
        })
    }
    else{
        $('#hint-text').fadeIn("slow").html("<br><br>");
    }});
    $("#reset").on('click', function(){
        console.log();
        $('#hint-text').fadeIn("slow").html("<br><br>");
        $("#hangman").attr("src", IMAGES[7])
        $("#hangman").animate({backgroundColor: "red"}, 'slow')
        .fadeOut("slow", function(){
        $("#blanks").text(word);
            getNewWord();})
    });
}

function sendLetter(){
    $.ajax({
        url : "/word", // the endpoint
        type : "GET", // http method
        dataType : 'json',
        global: false,
        data: {"letter":letter},
        async: false,
        // handle a successful response
        success : function(json){
            console.log(json); // log the returned json to the console
            console.log(json['blanks']);
            $("#"+letter).css({"color":json['color']});
            
            // $("#"+letter).button('disable');
            $("#blanks").text(json['blanks']);
            updateHangman(json['guesses'], json['word'], json['winning']);
        },
        error: function(xhr, status, error) {
        var err = eval("(" + xhr.responseText + ")");
        alert(err.Message);
        }})};

function updateHangman(guesses, word, winning){
    $("#hangman").attr("src", IMAGES[7-guesses]);
    if (guesses === 0 || winning===true){ 
        $(".options").prop('disabled', true);
        $("#blanks").text(word);
        $("#hangman").attr("src", IMAGES[7-guesses])
        if (winning===true){$("#hangman").animate({backgroundColor: "green"}, 'slow');}
        else {$("#hangman").animate({backgroundColor: "red"});}
        $("#hangman").fadeOut("slow", function(){
            getNewWord();}
        )}
}