(function() {
    $(document).ready(function() {
        bootstrapSpotifySearch();
    });
})();

function bootstrapSpotifySearch() {
    var userInput, searchUrl, results;
    var outputArea = $("#q-results");
    $('#spotify-q-button').on("click", function() {
        var spotifyQueryRequest;
        spotifyQueryString = $('#spotify-q').val();
        searchUrl = "https://api.spotify.com/v1/search?type=artist&q=" + spotifyQueryString;
        spotifyQueryRequest = $.ajax({
            type: "GET",
            dataType: 'json',
            url: searchUrl
        });

        spotifyQueryRequest.done(function(data) {
            var artists = data.artists;
            outputArea.html('');
            artists.items.forEach(function(artist) {
                var artistLi = $("<li>" + artist.name + " - " + artist.id + "</li>");
                artistLi.attr('data-spotify-id', artist.id);
                outputArea.append(artistLi);
                artistLi.click(displayAlbumsAndTracks);
            });
        });

        // Attach the callback for failure
        // (Again, we could have used the error callback direcetly)
        spotifyQueryRequest.fail(function(error) {
            console.log("Something Failed During Spotify Q Request:");
            console.log(error);
        });
    });
}

function displayAlbumsAndTracks(event) {
    var appendToMe = $('#albums-and-tracks');
    var artistSelect = $(event.target).attr('data-spotify-id');
    var artistAlbumURL = 'https://api.spotify.com/v1/artists/' + artistSelect + '/albums';
    spotifyArtistAlbumsRequest = $.ajax({
        type: "GET",
        dataType: 'json',
        url: artistAlbumURL,
    });

    spotifyArtistAlbumsRequest.done(function(albums) {
        var artistAlbumLi = $("<li>" + data.items.name + "</li>");
        $(data.items.name).each(function() {
            console.log('testing');
        });
        var artistAlbums = data.items[0].name;
        //console.log(albums);
        console.log(data.items);
    });
}


// artists.items.forEach(function(artist) {
//     var artistLi = $("<li>" + artist.name + " - " + artist.id + "</li>");
//     artistLi.attr('data-spotify-id', artist.id);
//     outputArea.append(artistLi);
//     artistLi.click(displayAlbumsAndTracks);
});
/* YOU MAY WANT TO CREATE HELPER FUNCTIONS OF YOUR OWN */
/* THEN CALL THEM OR REFERENCE THEM FROM displayAlbumsAndTracks */
/* THATS PERFECTLY FINE, CREATE AS MANY AS YOU'D LIKE */
