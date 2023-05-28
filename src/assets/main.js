const Api = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCEVqCJBM-QqNyoTs9nYDGXg&part=snippet%2Cid&order=date&maxResults=1';

const content = null || document.getElementById("content"); // esto es una referencia al html donde se agrega lo que le pedimos a la api.

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5a240ac396msh443bb38f2d32b16p1c724bjsnc2fbd89b3a0c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options); // aqui se agrega como argumento options porque es la key que nos da la api.
    const data = await response.json();     
    return data;
}

// Esto es nuevo: se crea una funcion que se llama a si misma, esta es la forma: Esto es una sentencia que permite que cuando esta cargando el archivo, ejecute la función:

                            // (async () => {

                            // }) ();

(async () => {
    try {
        const videos = await fetchData(Api);
        // ahora se va a hacer un tamplate para que itere por cada uno de los elementos que esta en la respuesta.
        let view = ` ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
       </div>`).slice(0,1).join("")}`;

       // agregar la insercion de la vista que se creo.

       content.innerHTML = view;

    } catch (error) {
        console.log(error);
    }

}) ();

