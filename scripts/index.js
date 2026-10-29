const apikey = "apikey=9041fb6f";
const input = document.querySelector(".name");
const btnSearch = document.querySelector("#btnSearch");

// Function
const getMovie = async (name) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${name}}&${apikey}`);

        const data = await response.json();
        
        if (data.Response === "False") {
            const movieContainer = document.querySelector("#movie");
            movieContainer.innerHTML = "";  

            const errorDiv = `
            <div class="errorDiv">Not Found Movie, try another name</div>
            `;

            movieContainer.insertAdjacentHTML("beforeend", errorDiv);
        } 
        else {
            render(data);
        }
    }
    catch (error) {
        console.error(error.message);
    }
}

const render = (data) => {
    const movieContainer = document.querySelector("#movie");
    movieContainer.innerHTML = "";
    const container = `<div class="movie-info">
    <h3>${data.Title}</h3>
    <div class="movie-info">
    <p>Released: ${data.Released} </p>
    <p>Rated: ${data.Rated}</p>
    <p>Runtime: ${data.Runtime}</p>
    <div>`;

    movieContainer.insertAdjacentHTML("beforeend", container);
}

// Event Listener
input.addEventListener("input", (event) => {
    const searchQuery = event.target.value.trim();

    if (searchQuery === "") {
        document.getElementById("movie").innerHTML = "";
        return;
    }

    getMovie(input.value);
});

btnSearch.addEventListener("click", () => {
    getMovie(input.value);
});