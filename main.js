const prompt = require("prompt-sync")();
const fs = require("fs");
const ruta = "./data.json";
const datos = JSON.parse(fs.readFileSync(ruta, "utf8"));
const capacidad_maxima = datos[0];
const estado_inicial = datos[1];
const bebidas = datos[2];

class maquina {
  constructor(agua, cafe, leche, azucar, preparacion) {
    this.agua = agua;
    this.cafe = cafe;
    this.leche = leche;
    this.azucar = azucar;
    this.preparacion = preparacion;
  }

  bebidas_disponibles() {
    console.log("BEBIDAS DISPONIBLESss: ");
    for (let i = 0; i < 2; i++) {
      console.log(i + 1, ".", bebidas.tipo_de_bebida);
    }
  }

  estado_maquina() {
    console.log("EL ESTADO DE LA MÁQUINA ES: ");
    for (let i = 0; i <= 3; i++) {
      console.log(i + 1, ".", estado_inicial[i]);
    }
  }

  nueva_bebida() {}
}

let x = new maquina(300, 500, 300, 200, "listo");
x.bebidas_disponibles();

/*console.log("BIENVENIDO A LA MÁQUINA DE CAFÉ");
console.log("--------------------------------");
console.log("Seleccione una opción: ");
console.log("1. BEBIDAS DISPONIBLES");
console.log("2. ESTADO DE LA MÁQUINA");
console.log("3. NUEVA BEBIDA");
console.log("4. RECARGAR MÁQUINA");
console.log("5. PEDIR BEBIDA");
console.log("6. SALIR");*/
