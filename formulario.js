// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB6Izsku_qLcnr9lc0Ivj5eejB7-5FCaRE",
    authDomain: "test-form-d3492.firebaseapp.com",
    databaseURL: "https://test-form-d3492.firebaseio.com",
    projectId: "test-form-d3492",
    storageBucket: "test-form-d3492.appspot.com",
    messagingSenderId: "222398070278",
    appId: "1:222398070278:web:bf51f5c8a26dcfff9ecd87",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Refernece contactInfo collections
  let contactInfo = firebase.database().ref("infos");
  
  // Listen for a submit
  const formulario = document.getElementById('formulario');
  if(formulario){
     formulario.addEventListener("submit", submitForm);
  }
  
  const menuBtn = document.querySelector('.menu-toggle');
  const topNav = document.querySelector('.site-nav');

  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    let name = document.querySelector("#nombre").value;
    let email = document.querySelector("#correo").value;
    let message = document.querySelector(".message").value;
    
    saveContactInfo(name, email, message);
    if(campos.nombre == true && campos.correo == true){
      sendEmail(name, email, message);
      sendEmail_dos(name, email, message);
  }
    modal();
  }
  
  // Save infos to Firebase
  function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();
  
    newContactInfo.set({
      name: name,
      email: email,
      message: message,
    });
  
  }
  
  function sendEmail(name, email, message){
    Email.send({
      Host: "smtp.gmail.com",
      Username: "roseweather21@gmail.com",
      Password: "zvepatncopgmeobj",
      To:  `${email}`, 
      From: "roseweather21@gmail.com",
      Subject: "Roseweather te Envio un mensaje",
      Body: `<h1>Gracias por tu Comentario ${name}</h1>`, 
    })
  }
  
  function sendEmail_dos(name, email, message){
       Email.send({
            Host: "smtp.gmail.com",
            Username: "roseweather21@gmail.com",
            Password: "zvepatncopgmeobj",
            To: "roseweather21@gmail.com",
            From: "roseweather21@gmail.com",
            Subject: `${name} Envio un Comentario`, 
            Body: `Nombre: ${name} <br/> Email: ${email} <br/> Comentario: ${message}`, 
       })
  }
  
  const inputs = document.querySelectorAll('#formulario input');
  
  const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }
  
  const campos = {
      nombre: false,
      correo: false
  }
  
  
  const validarFormulario = (e) => {
      switch (e.target.name) {
          case "nombre":
        validarCampo(expresiones.nombre, e.target, 'nombre');
          break;
          case "correo":
        validarCampo(expresiones.correo, e.target, 'correo');
          break;
      }
  }
  
  const validarCampo = (expresion, input, campo) => {
      if(expresion.test(input.value)){
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto-dia');
          document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
          document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
          document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
          document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
          campos[campo] = true;
    
    } 
     
    else {
          document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
          document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto-dia');
          document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
          document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
          document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
          campos[campo] = false;
      }
  }
  
  inputs.forEach((input) => {
      input.addEventListener('keyup', validarFormulario);
      input.addEventListener('blur', validarFormulario);
  });
  
  function modal(){
    let modal = document.getElementById("myModal");
    let modal_dos = document.getElementById("myModalDos");
  
    if(campos.nombre == true && campos.correo == true){
      document.querySelector(".formulario").reset();  
      document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
       icono.classList.remove('formulario__grupo-correcto');
     });
         
         modal.style.display = "block";
         modal_dos.style.display = "none";
    }
    document.getElementById("modal__btn").onclick = function() {
      modal.style.display = "none";
    }
  
    document.getElementById("modal__btn_dos").onclick = function() {
      modal_dos.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
      if(event.target == modal_dos){
        modal_dos.style.display = "none";
      }
    }
    
   if(campos.nombre == false && campos.correo == false){
      modal_dos.style.display = "block";
   }
   if(campos.nombre == false || campos.correo == false){
      modal_dos.style.display = "block";
   } 
  
   if(campos.nombre = "" && campos.correo == ""){
      modal.style.display = "none";
   }
  
  }
  
  menuBtn.addEventListener('click', function () {
      topNav.classList.toggle('site-nav-open');
      menuBtn.classList.toggle('menu-open');
  })

  const containerAcercaDe = document.querySelector('.container-acercade')
  const fecha = document.querySelector('.fechayhora');
  const containerFondo = document.querySelector('.container');
  const containerContacto = document.querySelector('.container-contacto-titulo');
  const containerContactoAlan = document.querySelector('.contactoAlan');
  const containerContactoLupis = document.querySelector('.contactoLupis');
  const containerContactoSanti = document.querySelector('.contactoSanti');
  const containerContactoMalau = document.querySelector('.contactoMalau');
  const containerContactoForm = document.querySelector('.contacto-form')
  const containerFormulario = document.querySelector('.formulario');

  const ahora = new Date();
  const idiomaLocal = navigator.language;
  const hora = new Intl.DateTimeFormat(idiomaLocal).format(ahora);
  
  const cambioColoresSecciones = function () {
     containerAcercaDe.style.backgroundColor = "#91C0FF";
     containerFondo.style.backgroundColor =  "#c9def9";
     containerContacto.style.backgroundColor = "#91C0FF";
     containerContactoAlan.style.backgroundColor = "#91C0FF";
     containerContactoLupis.style.backgroundColor = "#91C0FF";
     containerContactoSanti.style.backgroundColor = "#91C0FF";
     containerContactoMalau.style.backgroundColor = "#91C0FF";
     containerContactoForm.style.backgroundColor = "#91C0FF";
     containerFormulario.style.backgroundColor = "#91C0FF";
    
     document.querySelectorAll('.formulario__grupo-correcto').forEach((coloresExito) => {
      coloresExito.classList.add('formulario__grupo-correcto-dia');
    });
    
    document.querySelectorAll('.formulario__grupo-incorrecto').forEach((coloresError) => {
      coloresError.classList.add('formulario__grupo-incorrecto-dia');
    });
  }
  inputs.forEach((input) => {
    input.addEventListener('keyup', cambioColoresSecciones);
    input.addEventListener('blur', cambioColoresSecciones);
});
  if(hora >= "06:00" && hora <= "18:00"){
      cambioColoresSecciones();
  }
  