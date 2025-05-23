const input = document.getElementById("searchinput");
const personajesDiv = document.getElementById("characters");
const loadingDiv = document.getElementById("loading");
const botonPrev = document.getElementById("buttonPrev");
const botonNext = document.getElementById("buttonNext");
// url: https://rickandmortyapi.com/api/character/?name=rick

let actualPage = 1;
let totalPages = 1;

async function obtenerPersonajes(nombrePersonaje = "", page = 1) {
    loadingDiv.textContent = "Cargando...";
    personajesDiv.innerHTML = "";
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/?name=' + nombrePersonaje + '&page=' + page);
        console.log(response);
        if(!response.ok){
            console.error("Error en la respuesta de la API");
            return;
        }
        const data = await response.json();
        console.log(data);
        console.log("páginas:",data.info.pages)
        totalPages = data.info.pages;
        mostrarPersonajes(data.results)
        actualizarPaginado();

    } catch (error) {
        personajesDiv.innerHTML = "Error al cargar los personajes";
        totalPages = 1;
    } finally {
        loadingDiv.textContent = "";
    }
}
function actualizarPaginado(){
    if(actualPage== 1){
        botonPrev.disabled = true;
    }else{
        botonPrev.disabled = false;
    }
    if(actualPage>=totalPages){
        botonNext.disabled = true;
    }else{
        botonNext.disabled = false;
    }
}

function mostrarPersonajes(personajes) {
    personajesDiv.innerHTML = "";
    personajes.forEach((personaje) => {
        personajesDiv.innerHTML += `
        <div class="card">
            <img src="${personaje.image}" alt="${personaje.name}">
            <h3>${personaje.name}</h3>
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
        </div>
        `;

    });
}

input.addEventListener("keyup", (e) => {
    console.log(input.value)
    actualPage = 1;
    obtenerPersonajes(input.value);
});

botonNext.addEventListener("click", (e) => {
    if(actualPage<totalPages){
        actualPage = actualPage + 1;
        obtenerPersonajes(input.value, actualPage);
    }
});

botonPrev.addEventListener("click", (e) => {
    if(actualPage>1){
        actualPage = actualPage -1;
        obtenerPersonajes(input.value, actualPage);
    }
});

obtenerPersonajes();