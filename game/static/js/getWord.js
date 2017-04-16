
function getWord() {
    var DATA = $.ajax({
        url : "/word", // the endpoint
        type : "GET", // http method
        dataType : 'json',
        global: false,
        // data: {"got":"it"},
        async: false,
        // handle a successful response
        success : function(json) {
            // $('#post-text').val(''); // remove the value from the input
            // alert(json)
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        }
    });
    console.log(DATA.responseJSON);
    return DATA.responseJSON;
};