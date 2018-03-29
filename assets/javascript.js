// make array of 90s shows (eventually change to "topics")
var topics = ["Friends", "Seinfeld", "Roseanne", "Frasier", "Beavis and Butthead"];
// make buttons (want to learn renderButton function)
function makeButtons() {
    // deletes prior shows to avoid repeat buttons
    $('#buttonsView').empty();
    // loops through var shows
    for (var i = 0; i < topics.length; i++) {
        // dynamic button maker
        var a = $('<button>')
        // add a class
        a.addClass('show');
        // add a data-attribute
        a.attr('data-name', topics[i]);
        // make button text
        a.text(topics[i]);
        // append the button to buttonsView div
        $('#buttonsView').append(a);
    }
}
// handles addShow button event
$("#addShow").on("click", function () {
    // grabs the user's show input
    var show = $("#show-input").val().trim();
    // that input is now added to the array
    topics.push(show);
    // calls the makeButtons function to make buttons for original array plus the user input
    makeButtons();
    // this line is so users can hit "enter" instead of clicking the submit button
    return false;
})

// function to display gifs
function displayGifs() {
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=10&api_key=LQFIGMRbmKBzlubR6Jplr4X3FF0HXZMg";

    // ajax
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        console.log(response.data);
        // save results as a variable
        var results = response.data;
        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
            // creates a generic div to hold the results
            var gifDiv = $('<div class="gif">');
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            // shows the rating on hover
            showGif.attr('title', "Rating: " + results[i].rating);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);
            var rating = results[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            gifDiv.append(showGif)
            gifDiv.append(p)
            $("#gifsView").prepend(gifDiv);
        }

    });
}

// function for animating gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});

// function for displaying show gifs
$(document).on("click", ".show", displayGifs);
// initially calls the makeButtons function
makeButtons();

