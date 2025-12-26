const ventas = [
    { producto: "Curso", precio: 15, moneda: "USD", pagado: true },
    { producto: "Mentoria", precio: 200, moneda: "USD", pagado: false },
    { producto: "Ebook", precio: 10, moneda: "USD", pagado: true },
    { producto: "Asesoria", precio: 500, moneda: "MXN", pagado: true },
    { producto: "Invento", precio: 100, moneda: "USD", pagado: true }
];

// Paso 1: Tu variable acumuladora
let total = 0;

// Paso 2: Tu bucle para recorrer las ventas
for (let venta of ventas) {
    // Paso 3: Tu condición (Si es USD y está pagado)
    if (venta.moneda === "USD" && venta.pagado === true) {
        total = total + venta.precio; // Sumamos
    }
    if (venta.moneda === "MXN" && venta.pagado === true) {
        total = total + venta.precio / 20; // Sumamos
    }
}

// Paso 4: Ver la victoria
console.log("El total real ganado hoy es: $" + total);