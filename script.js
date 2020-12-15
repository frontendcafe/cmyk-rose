'use strict';

// const ciudad = document.querySelector('.titulo');
const containerTitulo = document.querySelector('.container__titulo');
const fecha = document.querySelector('.fechayhora');
const containerResultadosCiudad = document.querySelector(
  '.container-resultados__datosciudad'
);
const containerPronosticos = document.querySelector(
  '.container-resultados__pronosticosemanal--container-pronosticos'
);

//Ubicación actual con geolocation y luego con geocode
const obtenerUbicacionActual = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err)
    );
  });
};

//Temperatura en celsius
const kelvinACelsius = function (k) {
  return Math.trunc(k - 273.15);
};

const celciusAFahrenheit = function (c) {
  return Math.trunc(c * 1.8) + 32;
};

const capitalizarPalabra = function (palabra) {
  const capPalabra = palabra[0].toUpperCase() + palabra.slice(1);
  return capPalabra;
};

//fecha hora y dia
const ahora = new Date();
const opciones = {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  year: 'numeric',
  minute: 'numeric',
};

//idioma

const idiomaLocal = navigator.language;

fecha.textContent = new Intl.DateTimeFormat(idiomaLocal, opciones).format(
  ahora
);

//Mostrar error
const mostrarError = function (msj) {
  containerResultadosCiudad.textContent = `${msj}`;
};

//insertar al DOM la ciudad y la temperatura
const insertarDOM = function (data) {
  const html = `<h3 class="container-resultados__datosciudad--ciudad">${
    data.name
  }, ${data.sys.country}</h3>
      <div class="container-resultados__datosciudad--info">
        <p class="container-resultados__datosciudad--temperatura">${kelvinACelsius(
          data.main.temp
        )}ºC</p>
        
        <img class="container-resultados__datosciudad--icono" src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="">
        
        <div class="container-resultados_datosciudad--descripcion">
          <p class="container-resultados__datosciudad--descripcionclima">${capitalizarPalabra(
            data.weather[0].description
          )}</p>
          <button class="container-resultados__datosciudad--descripcionbtn">Ver en Fahrenheit</button>
        </div>
      </div>
  `;

  //anexando info a html
  containerResultadosCiudad.insertAdjacentHTML('beforeend', html);

  //Pasar de celsius a fahrenheit boton
  const celsiusAFahrenheitBtn = document.querySelector(
    '.container-resultados__datosciudad--descripcionbtn'
  );

  const temperaturaCelsius = document.querySelector(
    '.container-resultados__datosciudad--temperatura'
  );

  celsiusAFahrenheitBtn.addEventListener('click', function () {
    let fahrenheitTemp = `${celciusAFahrenheit(
      kelvinACelsius(data.main.temp)
    )} F`;

    if (temperaturaCelsius.innerHTML !== fahrenheitTemp) {
      temperaturaCelsius.textContent = fahrenheitTemp;
      celsiusAFahrenheitBtn.textContent = `Ver en Celsius`;
    } else if (temperaturaCelsius.innerHTML === fahrenheitTemp) {
      temperaturaCelsius.textContent = `${kelvinACelsius(data.main.temp)}ºC`;
      celsiusAFahrenheitBtn.textContent = `Ver en Fahrenheit`;
    }
  });
};

//Mostrar pronostico
const mostrarPronostico = function (data) {
  const html = `
  <div class="container-resultados__pronosticosemanal--pronosticos">
    <p class="container-resultados__pronosticosemanal--pronosticos-dia">${capitalizarPalabra(
      obtenerDia(data.dt)
    )}</p>
    <h2 class="container-resultados__pronosticosemanal--pronosticos-tempmax">${kelvinACelsius(
      data.temp.max
    )}ºC</h2>
    <h5 class="container-resultados__pronosticosemanal--pronosticos-tempmin">${kelvinACelsius(
      data.temp.min
    )}ºC</h5>
    <img class="container-resultados__pronosticosemanal--pronosticos-icono" src="http://openweathermap.org/img/wn/${
      data.weather[0].icon
    }@2x.png">
    <h5 class="container-resultados__pronosticosemanal--pronosticos-preci">Humedad:</h5>
    <h5 class="container-resultados__pronosticosemanal--pronosticos-preci">${
      data.humidity
    } %</h5>
  </div>
  `;
  containerPronosticos.insertAdjacentHTML('beforeend', html);

  const dataHoy = document.querySelector(
    '.container-resultados__pronosticosemanal--pronosticos-dia'
  );

  if (dataHoy.innerHTML === 'Hoy') return dataHoy.classList.add('hoy');
};

//obtener dia de la semana
const obtenerDia = function (dia) {
  const ahora = dia * 1000;
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = calcDaysPassed(new Date(), ahora);

  if (daysPassed === 0) {
    return 'Hoy';
  }
  const opciones = {
    weekday: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(idiomaLocal, opciones).format(ahora);
};

//pronostico
const pronostico5 = async function (lat, lon) {
  try {
    const resPronostico = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ad226a44dedb3b77340424c5a27e237d`
    );
    if (!resPronostico.ok)
      throw new Error('Error en la busqueda del pronostico');
    const dataPronostico = await resPronostico.json();
    dataPronostico.daily.forEach((dataDia) => mostrarPronostico(dataDia));
  } catch (err) {
    mostrarError(`${err.message}`);
  }
};

//consulta clima
const clima = async function (lat, lon) {
  try {
    const resClima = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=ad226a44dedb3b77340424c5a27e237d`
    );

    if (!resClima.ok) throw new Error('Error en la busqueda del clima');
    const dataClima = await resClima.json();
    // console.log(dataClima);
    insertarDOM(dataClima);
  } catch (err) {
    mostrarError(`${err.message}`);
  }
};

//consulta ciudad
const ciudadDondeEstoy = async function () {
  try {
    const pos = await obtenerUbicacionActual();
    const { latitude: lat, longitude: lon } = pos.coords;
    // console.log(lat, lon);
    clima(lat, lon);
    pronostico5(lat, lon);
  } catch (err) {
    mostrarError(err);
  }
};
ciudadDondeEstoy();
