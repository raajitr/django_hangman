var DATA;
function getWord() {
    var DATA = $.ajax({
        url : "/word", // the endpoint
        type : "GET", // http method
        dataType : 'json',
        global: false,
        async:false,
        // handle a successful response
        success : function(json) {
            // $('#post-text').val(''); // remove the value from the input
            // alert(json)
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    }).responseJSON;
    console.log(DATA);
    return DATA;
};