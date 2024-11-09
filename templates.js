function getCardTemplate(genreNames, movie, indexMovie) {
    return `
    <div id="movieCard">
        <div class="cardBody">
            <img onclick="openMoviePage(${indexMovie})" class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"/>
        </div>
        <div class="cardFooter">
            <span class="releaseDate"><b>Release Date: ${movie.release_date}</span>
        </div>
    </div>`
}
