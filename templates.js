function getCardTemplate(movie) {
    return `
    <div id="movieCard">
        <div class="cardBody">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"/>
        </div>
        <div class="cardFooter">
            <span class="releaseDate"><b>Release Date: ${movie.release_date}</b></span>
        </div>
    </div>`;
}

function movieTemplate(movie, genreNames, videoLink) {
    return `
    <div class="movieWrapper">
        <div class="movieMainInfoWrapper">
            <div class="movieInfoContent maxWidth">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"/>
                <div class="movieInfoText">
                    <h1>${movie.title}</h1>
                    <span> ${genreNames}
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Overview: ${movie.overview}</p>
                    <a href="${videoLink}">Trailer</a>
                </div>
            </div>
        </div>
    </div>
    `;
}