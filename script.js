document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos los elementos del formulario
  const registroForm = document.getElementById("registro-form");
  const messageContainer = document.getElementById("message-container");
  const loginForm = document.getElementById("login-form"); // Nuevo: Obtén el formulario de login

  // Función para limpiar los campos del formulario
  function clearFormFields(form) {
    form.querySelector('input[name="usuario"]').value = "";
    form.querySelector('input[name="contrasena"]').value = "";
  }

  // Escuchamos el evento de envío del formulario de registro
  registroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registroForm);

    fetch(registroForm.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        messageContainer.textContent = data.message;
        messageContainer.style.color =
          data.status === "success" ? "green" : "red";

        // Llamamos a la función para limpiar los campos si el registro es exitoso
        if (data.status === "success") {
          clearFormFields(registroForm);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        messageContainer.textContent = "Error de conexión. Inténtalo de nuevo.";
        messageContainer.style.color = "red";
      });
  });

  // La lógica para la rotación y el cierre se mantiene igual
  const formularioContainer = document.getElementById("formularioContainer");
  const cardContainer = document.querySelector(".card-container");
  const regresarLink = document.getElementById("regresar-link");
  const closeFormBtns = document.querySelectorAll(".close-form-btn");
  const mostrarFormularioBtn = document.getElementById("mostrarFormularioBtn");
  const crearCuentaLink = document.getElementById("crear-cuenta-link");

  // Función para ocultar y limpiar
  const hideFormAndReset = () => {
    if (formularioContainer) {
      formularioContainer.classList.add("oculto");
    }
    if (cardContainer) {
      cardContainer.style.transform = ""; // Reset the rotation
    }
    messageContainer.textContent = "";
    // Llamamos a la función para limpiar los campos de ambos formularios
    clearFormFields(registroForm);
    clearFormFields(loginForm);
  };

  if (closeFormBtns) {
    closeFormBtns.forEach((btn) => {
      btn.addEventListener("click", hideFormAndReset);
    });
  }

  if (regresarLink) {
    regresarLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (cardContainer) {
        cardContainer.style.transform = "";
      }
      messageContainer.textContent = "";
      // Llamamos a la función para limpiar los campos al regresar
      clearFormFields(registroForm);
    });
  }
  // Nuevo: Lógica para "Crear cuenta", para asegurar que el formulario de login también se limpie
  if (crearCuentaLink) {
    crearCuentaLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (cardContainer) {
        cardContainer.style.transform = "rotateY(180deg)";
      }
      messageContainer.textContent = "";
      // Limpiamos los campos del formulario de login
      clearFormFields(loginForm);
    });
  }

  if (mostrarFormularioBtn) {
    mostrarFormularioBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (formularioContainer) {
        formularioContainer.classList.remove("oculto");
      }
    });
  }
});



document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');

    // Abre la barra lateral al hacer clic en el icono del menú
    menuIcon.addEventListener('click', () => {
        sidebar.style.width = '40%';
    });

    // Cierra la barra lateral al hacer clic en el botón de cierre
    closeBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
    });
});