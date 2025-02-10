const prompt = require("prompt-sync")();
const fs = require("fs");
const ruta = "./data.json";
const datos = JSON.parse(fs.readFileSync(ruta, "utf8"));
    
let lista_bebidas = [datos];
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

    console.clear();

    console.log("BEBIDAS DISPONIBLES: ");
    for (let i = 0; i < 3; i++) {
      console.log(i + 1, ".", bebidas[i].tipo_de_bebida);
    }
  }

  estado_maquina() {
    console.log("EL ESTADO DE LA MÁQUINA ES: ");
    
    console.log("Agua: ",estado_inicial[0].agua);
    console.log("Café: ",estado_inicial[1].cafe);
    console.log("Leche: ",estado_inicial[2].leche);
    console.log("Azúcar: ",estado_inicial[3].azucar);
   
  }

  nueva_bebida() {
    
    // Nombre de la nueva bebida
    let nombre_bebida = prompt("Nombre de la nueva bebida: ");
    this.agua = prompt("Agua necesaria: ");


    const nueva_bebida = {
      tipo_de_bebida: nombre_bebida,
      agua: this.agua,
    };

    // Añadir el nueva bebida al array
    bebidas.push(nueva_bebida);

    // Convertir el array actualizado de vuelta a formato JSON
    const datosparseados = JSON.stringify(datos.bebidas);

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(ruta, datosparseados, 'utf8');

    console.log('Bebida añadida correctamente.');

  }

  recargar_maquina () {

    let agua_inicial = estado_inicial[0].agua;
    let cafe_inicial = estado_inicial[1].cafe;
    let leche_inicial = estado_inicial[2].leche;
    let azucar_inicial = estado_inicial[3].azucar;

    let agua_maxima = capacidad_maxima[0].agua;
    let cafe_maxima = capacidad_maxima[1].cafe;
    let leche_maxima = capacidad_maxima[2].leche;
    let azucar_maxima = capacidad_maxima[3].azucar;

    let dif_agua = agua_maxima - agua_inicial;
    let dif_cafe = cafe_maxima - cafe_inicial;
    let dif_leche = leche_maxima - leche_inicial;
    let dif_azucar = azucar_maxima - azucar_inicial;

    let restock_agua = agua_inicial + dif_agua;
    let restock_cafe = cafe_inicial + dif_cafe;
    let restock_leche = leche_inicial + dif_leche;
    let restock_azucar = azucar_inicial + dif_azucar;

    estado_inicial[0].agua = restock_agua;
    estado_inicial[1].cafe = restock_cafe;
    estado_inicial[2].leche = restock_leche;
    estado_inicial[3].azucar = restock_azucar;

    console.log("Nuevos totales: ",restock_agua,restock_cafe,restock_leche,restock_azucar);
  }

  pedir_bebida(){
    
    // Mostrar bebidas disponibles
    console.log("BEBIDAS DISPONIBLES: ");
    for (let i = 0; i < 3; i++) {
      console.log(i + 1, ".", bebidas[i].tipo_de_bebida);
    }

    let seleccionador_de_bebida = prompt("Selecciona una bebida (por su número): ");

    while (seleccionador_de_bebida > 3 || seleccionador_de_bebida <= 0|| isNaN(seleccionador_de_bebida)===true){
      seleccionador_de_bebida = prompt("Selecciona una número válido: ");
    }

    switch(seleccionador_de_bebida){
      case "1":{
        let actualizacion_agua = estado_inicial[0].agua - 50;
        let actualizacion_cafe = estado_inicial[1].cafe - 100;
        let actualizacion_leche = estado_inicial[2].leche - 20;
        let actualizacion_azucar = estado_inicial[3].azucar - 20;
      }break;
      case "2":{
        let actualizacion_agua = estado_inicial[0].agua - 20;
        let actualizacion_cafe = estado_inicial[1].cafe;
        let actualizacion_leche = estado_inicial[2].leche;
        let actualizacion_azucar = estado_inicial[3].azucar;
      }break;
      case "3":{
        let actualizacion_agua = estado_inicial[0].agua - 10;
        let actualizacion_cafe = estado_inicial[1].cafe - 50;
        let actualizacion_leche = estado_inicial[2].leche;
        let actualizacion_azucar = estado_inicial[3].azucar;
      }break;
    }

    // JSON
  }

  salir(){
    process.exit();
  }
}

let x = new maquina(300, 500, 300, 200, "listo");


let y = 1;
while(y = 1){

  console.log("BIENVENIDO A LA MÁQUINA DE CAFÉ");
  console.log("--------------------------------");
  console.log("Seleccione una opción: ");
  console.log("1. BEBIDAS DISPONIBLES");
  console.log("2. ESTADO DE LA MÁQUINA");
  console.log("3. NUEVA BEBIDA");
  console.log("4. RECARGAR MÁQUINA");
  console.log("5. PEDIR BEBIDA");
  console.log("6. SALIR");

  let opcion = prompt("Selecciona una opción de la máquina (por su número): ");

  while (isNaN(opcion)==true || opcion <= 0 || opcion > 6){
    opcion = prompt("Selecciona una opción válida de la máquina (por su número): ");
  }

  switch(opcion){
    case "1":{
      x.bebidas_disponibles();
    }break;
    case "2":{
      x.estado_maquina();
    }break;
    case "3":{
      x.nueva_bebida();
    }break;
    case "4":{
      x.recargar_maquina();
    }break;
    case "5":{
      x.pedir_bebida();
    }break;
    case "6":{
      x.salir();
    }break;
  }
}