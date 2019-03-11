var busqueda = "" //searchTerm
var nextPage = ""
var prevPage = "" //previousPage

$("#submitButton").on("click", event=>{
	event.preventDefault();
    busqueda = $("#busqueda").val();
    if (busqueda != "") {
        buildFetch(busqueda, displayVideos);
    }
});

$("#prevButton").on("click", event=>{ //previousButton
	event.preventDefault();
    changePage(prevPage, busqueda, displayVideos);
});

$("#nextButton").on("click", event=>{
	event.preventDefault();
    changePage(nextPage, busqueda, displayVideos);
});

function buildFetch(busqueda, callback) {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${busqueda}&type=video&maxResults=10&order=relevance&key=AIzaSyDctvtTXM2bKn0oWVsvR0N9C_Ig-Jfgbqs`;
    fetch(url)
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then(responseJson => callback(responseJson))
    .catch(err => console.log(err));
}

function changePage(page, busqueda, callback) {
    let url = `https://www.googleapis.com/youtube/v3/search?pageToken=${page}&q=${busqueda}&type=video&part=snippet&maxResults=10&order=relevance&key=AIzaSyDctvtTXM2bKn0oWVsvR0N9C_Ig-Jfgbqs`;
    fetch(url)
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then(responseJson => callback(responseJson))
    .catch(err => console.log(err));
}

function displayVideos(data) {
    console.log(data);
    if (data.hasOwnProperty('nextPageToken')) {
        nextPage = data.nextPageToken;
        console.log(nextPage);
        $("#nextButton").prop("disabled", false);
    } else {
        $("#nextButton").prop("disabled", true);
    }
    if (data.hasOwnProperty('prevPageToken')) {
        prevPage = data.prevPageToken;
        console.log(prevPage);
        $("#prevButton").prop("disabled", false);
    } else {
        $("#prevButton").prop("disabled", true);
    }
    $(".results").html('');
    data.items.forEach((item,index) => {
        let videoURL = "https://www.youtube.com/watch?v=" + item.id.videoId;
        $('.results').append(`
        <div class="Style">
            <div class="imgStyle">
                <a href="${videoURL}" target="_blank">
                <img src="${item.snippet.thumbnails.default.url}">
                </a>
            </div>
            <div class="textStyle">
                <a href="${videoURL}" target="_blank">
                <p>${item.snippet.title}</p>
                </a>
            </div>
        </div>`
        );
    })
}

$("#nextButton").prop("disabled", true);
$("#prevButton").prop("disabled", true);