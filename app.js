//selectores para el container
const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#weatherForm')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
});

function buscarClima(e){
    e.preventDefault();
    console.log("Buscando Clima")

    const ciudad = document.querySelector('#city').value;
    const pais = document.querySelector('#pais').value;
    consultarAPI(ciudad, pais);

    console.log(ciudad);
    console.log(pais);

    

    if(ciudad == '' || pais == ''){
        mostrarError('Ambos campos son obligatorios')
        return;
    }
}
function consultarAPI(ciudad, pais){
    const apID = 'f7f2abf426b363c7d7bff7622ebc64c4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${apID}`;
    console.log(url);

    fetch(url)
        .then(respuesta =>  {
            return respuesta.json();
        })
        .then(datos => {
            mostrarClima(datos); // Llamar a la función mostrarClima con los datos obtenidos
        })
        .catch(error => {
            mostrarError('No se pudo obtener el clima. Por favor, verifica la ciudad y el país ingresados.');
        });
}

function mostrarClima(datos) {
    if (datos.cod === "404") {
        mostrarError('Ciudad no encontrada');
        return;
    }

    const temperatura = datos.main.temp;
    const ciudad = datos.name;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>La temperatura en ${ciudad} es ${temperatura}°C.</p>`;
    console.log(`La temperatura en ${ciudad} es ${temperatura}°C.`);
}
