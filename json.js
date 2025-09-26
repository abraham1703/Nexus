document.addEventListener("DOMContentLoaded", () => {
  // Select elements by their IDs
  const lineaArriba = document.getElementById("linea-superior");
  const lineaAbajo = document.getElementById("linea-inferior");

  // The texts to be typed
  const textoLinea1 = "Nexus";
  const textoLinea2 = "Siempre Compatible";

  // Typing speed in milliseconds
  const velocidad = 75;

  // The main function that handles the typing effect
  function escribirTexto(texto, elemento, callback) {
    let i = 0;
    function typeCharacter() {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        setTimeout(typeCharacter, velocidad);
      } else {
        if (callback) {
          callback();
        }
      }
    }
    typeCharacter();
  }

  // Function to manage the blinking cursor
  function manejarCursor(elemento) {
    elemento.classList.add("typing");
  }

  // Function to remove the cursor when typing is complete
  function eliminarCursor(elemento) {
    elemento.classList.remove("typing");
  }

  // Start the effect
  manejarCursor(lineaArriba);
  escribirTexto(textoLinea1, lineaArriba, () => {
    setTimeout(() => {
      eliminarCursor(lineaArriba);
      manejarCursor(lineaAbajo);
      escribirTexto(textoLinea2, lineaAbajo, () => {
        eliminarCursor(lineaAbajo);
      });
    }, 500);
  });
});

// Inicia el efecto cuando la página esté completamente cargada
document.addEventListener("DOMContentLoaded", () => {
  // Primero, escribe la línea de arriba
  escribirTexto(textoLinea1, lineaArriba, 0, () => {
    // Cuando termine, espera un momento y luego escribe la línea de abajo
    setTimeout(() => {
      escribirTexto(textoLinea2, lineaAbajo, 0);
    }, 500); // 500 ms de pausa entre las líneas
  });
});

//MENUUUUU

// Get the HTML elements we need
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");

// Add a click event listener to the menu icon
menuIcon.addEventListener("click", () => {
  // When the menu icon is clicked, set the sidebar's width to make it visible
  sidebar.style.width = "250px";
});

// Add a click event listener to the close button
closeBtn.addEventListener("click", () => {
  // When the close button is clicked, set the sidebar's width back to 0 to hide it
  sidebar.style.width = "0";
});

// Agrega un evento de clic a todo el documento
document.addEventListener("click", (event) => {
  // Si el clic no fue dentro de la barra lateral ni en el ícono del menú, ciérrala
  if (!sidebar.contains(event.target) && event.target !== menuIcon) {
    sidebar.style.width = "0";
  }
});

//ocultar y mostra formulario

document.addEventListener("DOMContentLoaded", () => {
  // Select the main elements
  const botonAbrir = document.getElementById("mostrarFormularioBtn");
  const formularioContainer = document.getElementById("formularioContainer");
  const cardContainer = document.querySelector(".card-container");

  // Select all close buttons with the same class for consistency
  const closeButtons = document.querySelectorAll(".close-form-btn");

  // Select the links for flipping the card
  const crearCuentaLink = document.getElementById("crear-cuenta-link");
  const regresarLink = document.getElementById("regresar-link");

  // Show the form when the "Registro" button is clicked
  botonAbrir.addEventListener("click", (event) => {
    event.preventDefault();
    formularioContainer.classList.remove("oculto");
  });

  // Close the form when any of the "X" buttons are clicked
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      formularioContainer.classList.add("oculto");
      // Also flip the card back to the front view when closed
      cardContainer.classList.remove("is-flipped");
    });
  });

  // Event for flipping to the registration form
  if (crearCuentaLink) {
    crearCuentaLink.addEventListener("click", (event) => {
      event.preventDefault();
      cardContainer.classList.add("is-flipped");
    });
  }

  // Event for flipping back to the login form
  if (regresarLink) {
    regresarLink.addEventListener("click", (event) => {
      event.preventDefault();
      cardContainer.classList.remove("is-flipped");
    });
  }
});

//ojo password

// Obtiene todos los íconos de alternancia de contraseña en la página
const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    // Obtiene el ID del campo de contraseña asociado a este ícono
    const passwordId = this.dataset.target;
    const passwordInput = document.getElementById(passwordId);

    // Si el campo de contraseña existe, cambia su tipo
    if (passwordInput) {
      // Cambia el tipo de 'password' a 'text' o viceversa
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Alterna la clase 'visible' para cambiar el ícono
      this.classList.toggle("visible");
    }
  });
});
