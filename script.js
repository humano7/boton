// Obtener el estado del ambiente (desde servidor o almacenamiento local)
const estadoAmbiente = getAmbienteEstado();

// Actualizar color del icono según el estado
if (estadoAmbiente === "preproductivo") {
  document.querySelector(".ambiente.preproductivo i").style.color = "#FF0000";
} else if (estadoAmbiente === "productivo") {
  document.querySelector(".ambiente.productivo i").style.color = "#4caf50";
}

// Generar datos ficticios para el gráfico
const data = generateChartData();

// Dibujar el gráfico de barras
drawChart(data);
console.log("cargando data");
// Cargar noticias ficticias
loadNoticias();

// Actualizar número de turno/emergencia
const numeroTurno = getNumeroTurno();
document.querySelector(".numero-turno p").textContent = numeroTurno;

// Manejar clics en botones
const botones = document.querySelectorAll(".botones .btn");
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    // Redirigir a la página correspondiente según el botón
    window.location.href = boton.getAttribute("href");
  });
});

// Abrir asistente conversacional
const btnAsistente = document.querySelector(".btn-asistente");
btnAsistente.addEventListener("click", () => {
  if (isConversationalAssistantAvailable()) {
    openConversationalAssistant();
  } else {
    alert("El asistente conversacional no está disponible en este momento.");
  }
});

// Funciones auxiliares (getAmbienteEstado, generateChartData, drawChart, loadNoticias, getNumeroTurno, isConversationalAssistantAvailable, openConversationalAssistant)


function getAmbienteEstado() {
  // Simulación de obtención del estado desde el servidor
  const estado = Math.random() < 0.5 ? "preproductivo" : "productivo";
  return estado;
}

function generateChartData() {
  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
  const data = [50, 65, 40, 78, 60];
  return { labels, data };
}

function drawChart(data) {
  const ctx = document.querySelector(".mini-grafico canvas").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        label: "Progreso",
        data: data.data,
        backgroundColor: "#4caf50"
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
}


function loadNoticias() {
  const noticias = [
    "DEVOPS: Nueva funcion en Confluence, que permite agregar pequeños videos.",
    "SOPORTE: Incrementamos la seguridad de las cuentas Office 365",
    "SISTEMAS: Todos los siestemas funcionan de forma correcta"
  ];

  const noticiasContainer = document.querySelector(".noticias-container");
  noticiasContainer.innerHTML = ""; // Limpiar contenido previo

  noticias.forEach(noticia => {
    const noticiaElement = document.createElement("div");
    noticiaElement.classList.add("noticia");
    noticiaElement.textContent = noticia;
    noticiasContainer.appendChild(noticiaElement);
  });
}


function getNumeroTurno() {
  // Simulación de obtención del número de turno desde el servidor
  return 12345;
}


function isConversationalAssistantAvailable() {
  // Simulación de detección de disponibilidad del chatbot
  return true; // Reemplazar con lógica real
}


function openConversationalAssistant() {
  // Simulación de apertura del chatbot
  window.open("https://chatfuel.com/", "_blank"); // Reemplazar con URL real
}
