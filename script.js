const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

let justCalculated = false;

/* FORMATO DE MILES */
function formatNumber(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* LIMPIAR PUNTOS */
function cleanNumber(str) {
  return str.replace(/\./g, "");
}

/* ACTUALIZAR DISPLAY (PUNTOS EN TIEMPO REAL) */
function updateDisplay() {
  let parts = display.value.split(/([+\−×÷])/);

  parts = parts.map(part => {
    // Si es número
    if (!isNaN(part.replace(/\./g, "")) && part !== "") {
      let clean = part.replace(/\./g, "");
      return formatNumber(clean);
    }
    return part;
  });

  display.value = parts.join("");
}

/* AGREGAR VALORES */
function append(value) {
  const operators = ['+', '−', '×', '÷'];

  if (justCalculated) {
    if (!operators.includes(value)) {
      display.value = "";
    }
    justCalculated = false;
  }

  display.value += value;
  updateDisplay();
}

/* BORRAR UNO ⌫ */
function deleteOne() {
  display.value = display.value.slice(0, -1);
  updateDisplay();
}

/* LIMPIAR TODO */
function clearDisplay() {
  display.value = "";
}

/* ANIMACIÓN RESULTADO */
function animateResult() {
  display.classList.add("result-animate");
  setTimeout(() => {
    display.classList.remove("result-animate");
  }, 300);
}

/* CALCULAR */
function calculate() {
  try {
    let expression = display.value
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    expression = cleanNumber(expression);

    let result = Function('"use strict"; return (' + expression + ')')();

    result = Math.round(result).toString();
    let formatted = formatNumber(result);

    addToHistory(display.value + " = " + formatted);

    display.value = formatted;
    justCalculated = true;

    animateResult(); // ✨ animación

  } catch {
    display.value = "Error";
  }
}

/* HISTORIAL */
function addToHistory(operation) {
  const li = document.createElement("li");
  li.textContent = operation;
  historyList.prepend(li);
}

/* TECLADO */
document.addEventListener("keydown", function(e) {
  if (!isNaN(e.key)) {
    append(e.key);
  } else if (e.key === "+") {
    append('+');
  } else if (e.key === "-") {
    append('−');
  } else if (e.key === "*") {
    append('×');
  } else if (e.key === "/") {
    append('÷');
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteOne();
  }
});

/* BURBUJAS */
const bubblesContainer = document.querySelector(".bubbles");

function createBubble() {
  const bubble = document.createElement("span");
  bubble.style.left = Math.random() * 100 + "vw";
  bubble.style.width = bubble.style.height = Math.random() * 20 + 10 + "px";
  bubble.style.animationDuration = Math.random() * 5 + 5 + "s";

  bubblesContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 10000);
}

setInterval(createBubble, 400);