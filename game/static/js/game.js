$(document).ready(function(){
    word = getWord()["word"].toUpperCase();
    console.log(word);
    var word_length = word.length;
    var blanks = ''
    for (var i=0; i<word_length; i++){
        blanks += '_';
    }
    $("#game-stage").html("<div style='height:200px; width:200px'></div><h1 id='blanks'>"+blanks+"</h1>");
    var options = "<h3>";
    for (var i = 65; i <= 90; i++) {
    options += "<button class='options'><span id="+String.fromCharCode(i)+">"+String.fromCharCode(i)+" </button>";
    }
    options += '</h3>'
    $("#game-stage").append(options);
    $("#blanks").css({"font-weight":0, "letter-spacing": "4px"});
    $("#game-stage").css({"background-color":"grey",});

    $(".options").click(function(){
        // alert("you clicked "+ $(this).text());
        var letters = [];
        // indices.push(1);
        for(var i=0; i<word.length;i++) {
                letters.push(word[i]);
        }
        console.log(letters)
        var indices = [];
        letter_clicked = $(this).text().toString().trim();
        for(var j=0; j<letters.length; j++){
            // console.log(letters[j], letter_clicked.trim().length)
            if (letters[j] === letter_clicked){
                console.log("why is it not coming");
                indices.push(j);
            }
        }
        
        console.log(indices);
        if (indices.length == 0){
            $("#"+$(this).text()).css({"color":"red"});
        }
        else{
            $("#"+$(this).text()).css({"color":"green"});            
        }

    });
});

// function loadGame(){
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.font = "20pt 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";
//     // ctx.fontFamily =  ", Helvetica Neue, Helvetica, sans-serif";
//     DATA = getWord()
//     // alert(DATA)
    
//     ctx.fillText(DATA,10,50);
// }