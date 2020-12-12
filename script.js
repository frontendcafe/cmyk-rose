/** @format */
let button = document.querySelector(".btn");
let inputValue = document.querySelector(".form-input");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let description = document.querySelector(".description");
let icon = document.querySelector(".icon");
const ciudad = document.querySelector(".titulo");
const containerTitulo = document.querySelector(".container__titulo");
const fecha = document.querySelector(".hora");
//Cambie y puse constante la apiKey
const apiKey = "ad226a44dedb3b77340424c5a27e237d";
//Ubicación actual con geolocation y luego con geocode
const obtenerUbicacionActual = function () {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => reject(err)
        );
    });
};
//buscador de ciudad
button.addEventListener("click"," function () {
    document.getElementById("error").style = "display:none";

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("w-info").style = "display:flex";
            let cityValue = data.name;
            let tempValue = data.main.temp;
            let descriptionValue = data.weather[0].description;
            let iconValue = data.weather[0].icon;
            city.innerHTML = cityValue;
            temp.innerHTML = tempValue;
            description.innerHTML = descriptionValue;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconValue}.png"></img>`;
            console.log(cityValue, tempValue, descriptionValue);
        })
        .catch((err) => {
            document.getElementById("error").innerHTML = "Ciudad no encontrada";
            document.getElementById("error").style = "display:block";
            document.getElementById("w-info").style = "display:none";
        });
});

//Temperatura en celsius
const kelvinACelsius = function (k) {
    return Math.trunc(k - 273.15);
};

//insertar al DOM la ciudad y la temperatura
const insertarDOM = function (data) {
    ciudad.textContent = `Usted está en la ciudad de ${data.name}, ${
        data.sys.country
    }, la temperatura es:${kelvinACelsius(data.main.temp)} ºC`;
};

//consulta clima
const clima = async function (lat, lon) {
    try {
        const resClima = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!resClima.ok) throw new Error("Error en la búsqueda del clima");
        const dataClima = await resClima.json();
        console.log(dataClima);
        insertarDOM(dataClima);
    } catch (err) {
        mostrarError(`${err.message}`);
    }
};

//Mostrar error
const mostrarError = function (msj) {
    ciudad.textContent = `${msj}`;
};

//consulta ciudad
const ciudadDondeEstoy = async function () {
    try {
        const pos = await obtenerUbicacionActual();
        const { latitude: lat, longitude: lon } = pos.coords;
        clima(lat, lon);
    } catch (err) {
        mostrarError(err);
    }
};
ciudadDondeEstoy();

//fecha hora y dia
const ahora = new Date();
const opciones = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    year: "numeric",
    minute: "numeric",
};

//idioma

const idiomaLocal = navigator.language;

fecha.textContent = new Intl.DateTimeFormat(idiomaLocal, opciones).format(ahora);
