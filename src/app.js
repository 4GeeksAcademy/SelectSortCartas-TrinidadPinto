const pintas = ["♦", "♥", "♠", "♣"];
const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let currentCards = [];
let pasosSeleccion = [];

function generarCarta() {
  const pinta = pintas[Math.floor(Math.random() * pintas.length)];
  const valor = valores[Math.floor(Math.random() * valores.length)];
  return { pinta, valor };
}

function valorNumerico(carta) {
  return valores.indexOf(carta.valor);
}

function crearCartaHTML(carta) {
  const div = document.createElement("div");
  div.className = "card";
  if (carta.pinta === "♦" || carta.pinta === "♥") div.classList.add("red");

  div.innerHTML = `
    <div class="corner">${carta.pinta}</div>
    <div class="value">${carta.valor}</div>
    <div class="corner">${carta.pinta}</div>
  `;
  return div;
}

function renderCartasFila(array, container, pasoIndex = null) {
  const fila = document.createElement("div");
  fila.className = "card-row";

  if (pasoIndex !== null) {
    const label = document.createElement("div");
    label.className = "step-label";
    label.textContent = pasoIndex;
    fila.appendChild(label);
  }

  array.forEach(carta => {
    fila.appendChild(crearCartaHTML(carta));
  });

  container.appendChild(fila);
}

function sortearCartas() {
  const input = document.getElementById("numeroCartas");
  const cantidad = parseInt(input.value);
  if (isNaN(cantidad) || cantidad < 1) return alert("Ingrese un número válido");

  currentCards = [];
  pasosSeleccion = [];
  document.getElementById("cardsContainer").innerHTML = "";
  document.getElementById("log").innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    currentCards.push(generarCarta());
  }

  
  renderCartasFila(currentCards, document.getElementById("cardsContainer"));
}

function clasificarCartas() {
  pasosSeleccion = [];
  let arr = [...currentCards];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (valorNumerico(arr[j]) < valorNumerico(arr[minIndex])) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    pasosSeleccion.push(arr.map(c => ({ ...c })));
  }

  mostrarLog();
}

function mostrarLog() {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = "";
  pasosSeleccion.forEach((paso, index) => {
    renderCartasFila(paso, logDiv, index);
  });
}
