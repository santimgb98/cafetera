const prompt = require("prompt-sync")();
const fs = require("fs");
const ruta = "./data.json";
const datos = JSON.parse(fs.readFileSync(ruta, "utf8"));
    
const capacidad_maxima = datos[0];
const estado_inicial = datos[1];
const bebidas = datos[2];


class maquina {
  constructor(agua, cafe, leche, azucar, precio) {
    this.agua = agua;
    this.cafe = cafe;
    this.leche = leche;
    this.azucar = azucar;
    this.precio = precio;
  }

  bebidas_disponibles() {

    console.clear();

    console.log("BEBIDAS DISPONIBLES: ");
    for (let i = 0; i < bebidas.length; i++) {
      console.log(i + 1, ".", bebidas[i].tipo_de_bebida);
    }
  }

  estado_maquina() {
    
    console.clear();

    console.log("EL ESTADO DE LA MÁQUINA ES: ");

    console.log("Agua: ", estado_inicial[0].agua);
    console.log("Café: ", estado_inicial[1].cafe);
    console.log("Leche: ", estado_inicial[2].leche);
    console.log("Azúcar: ", estado_inicial[3].azucar);

  }

  nueva_bebida() {
    
    console.clear();

    // Nombre de la nueva bebida
    let nombre_bebida = prompt("Nombre de la nueva bebida: ");
    
    // Cantidad de AGUA que necesita esta bebida
    this.agua = Number(prompt("Agua necesaria: "));

    while(isNaN(this.agua)==true){
      this.agua = Number(prompt("Agua necesaria (cantidad): "));
    }
    while(this.agua >= 100){
      console.log("Es demasiada agua, no necesitas tanta para eso, selecciona una cantidad menor de 100: ");
      this.agua = Number(prompt("Agua necesaria: "));
    }

    // Cantidad de CAFÉ que necesita esta bebida
    this.cafe = Number(prompt("Café necesaria: "));

    while(isNaN(this.cafe)==true){
      this.cafe = Number(prompt("Café necesario (cantidad): "));
    }
    while(this.cafe >= 80){
      console.log("Es demasiado café, no necesitas tanto para eso, selecciona una cantidad menor de 80: ");
      this.cafe = Number(prompt("Café necesario: "));
    }

    // Cantidad de LECHE que necesita esta bebida
    this.leche = Number(prompt("Leche necesaria: "));

    while(isNaN(this.leche)==true){
      this.leche = Number(prompt("Leche necesaria (cantidad): "));
    }
    while(this.leche >= 150){
      console.log("Es demasiada leche, no necesitas tanta para eso, selecciona una cantidad menor de 150: ");
      this.leche = Number(prompt("Leche necesaria: "));
    }


    // Cantidad de AZÚCAR que necesita esta bebida
    this.azucar = Number(prompt("Azúcar necesaria: "));

    while(isNaN(this.azucar)==true){
      this.azucar = Number(prompt("Azúcar necesaria (cantidad): "));
    }
    while(this.azucar >= 20){
      console.log("Es demasiada azúcar, no necesitas tanta para eso, selecciona una cantidad menor de 20: ");
      this.azucar = Number(prompt("Azúcar necesaria: "));
    }

    // PRECIO de la nueva bebida
    this.precio = Number(prompt("Precio de la nueva bebida: "));

    while(isNaN(this.precio)==true){
      this.precio = Number(prompt("Introduce un precio válido (cantidad): "));
    }

    const nueva_bebida = {
      tipo_de_bebida: nombre_bebida,
      agua: this.agua,
      cafe: this.cafe,
      leche: this.leche,
      azucar: this.azucar,
      precio_euros : this.precio,
    };

    // Añadir el nueva bebida al array
    bebidas.push(nueva_bebida);

    // Anidamos en una misma variable todos los apartados del JSON 
    const all_json = [capacidad_maxima,estado_inicial,bebidas];

    // Convertir el array actualizado de vuelta a formato JSON
    const datosparseados = JSON.stringify(all_json, null, 2);

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(ruta, datosparseados, 'utf8');

    console.log('Bebida añadida correctamente.');

  }

  recargar_maquina () {

    console.clear();

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

    this.agua = agua_inicial + dif_agua;
    this.cafe = cafe_inicial + dif_cafe;
    this.leche = leche_inicial + dif_leche;
    this.azucar = azucar_inicial + dif_azucar;

    const nuevo_estado_inicial = [
      {agua: this.agua},
      {cafe: this.cafe},
      {leche: this.leche},
      {azucar: this.azucar}
    ]


    // Anidamos en una misma variable todos los apartados del JSON 
    const all_json = [capacidad_maxima,nuevo_estado_inicial,bebidas];

    // Convertir el array actualizado de vuelta a formato JSON
    const datosparseados = JSON.stringify(all_json, null, 2);

    // Escribir el contenido actualizado en el archivo
    fs.writeFileSync(ruta, datosparseados, 'utf8');

    console.log("¡Máquina de café recargada exitosamente!");
  }

  pedir_bebida() {
    
    console.clear();
    
    // Mostrar bebidas disponibles
    console.log("BEBIDAS DISPONIBLES: ");
    for (let i = 0; i < bebidas.length; i++) {
      console.log(i + 1, ".", bebidas[i].tipo_de_bebida);
    }

    let seleccionador_de_bebida = prompt("Selecciona una bebida (por su número): ");

    while (seleccionador_de_bebida > bebidas.length || seleccionador_de_bebida <= 0 || isNaN(seleccionador_de_bebida)===true){
      seleccionador_de_bebida = prompt("Selecciona una número válido: ");
    }

    console.clear();

    /*for(let i = 0; i < bebidas.length; i++){
      this.agua = estado_inicial[0].agua - bebidas[i].agua;
      this.cafe = estado_inicial[1].cafe - bebidas[i].cafe;
      this.leche = estado_inicial[2].leche - bebidas[i].leche;
      this.azucar = estado_inicial[3].azucar - bebidas[i].azucar;

      const nuevo_estado_inicial = [
        {agua: this.agua},
        {cafe: this.cafe},
        {leche: this.leche},
        {azucar: this.azucar}
      ];
    }*/



    switch(seleccionador_de_bebida){
      case "1":{
        this.agua = estado_inicial[0].agua - 50;
        this.cafe = estado_inicial[1].cafe - 100;
        this.leche = estado_inicial[2].leche - 20;
        this.azucar = estado_inicial[3].azucar - 20;

        const nuevo_estado_inicial = [
          {agua: this.agua},
          {cafe: this.cafe},
          {leche: this.leche},
          {azucar: this.azucar}
        ];

        // Anidamos en una misma variable todos los apartados del JSON 
        const all_json = [capacidad_maxima,nuevo_estado_inicial,bebidas];

        // Convertir el array actualizado de vuelta a formato JSON
        const datosparseados = JSON.stringify(all_json, null, 2);

        // Escribir el contenido actualizado en el archivo
        fs.writeFileSync(ruta, datosparseados, 'utf8');

        console.log("Sirviendo bebida...");
        console.log(`
          ( (
           ) )
        ........
        |       |]
        \\      /
         \`----'
        `);
        console.log("Puede recoger su", bebidas[0].tipo_de_bebida);

      }break;
      case "2":{
        this.agua = estado_inicial[0].agua - 20;
        this.cafe = estado_inicial[1].cafe;
        this.leche = estado_inicial[2].leche;
        this.azucar = estado_inicial[3].azucar;

        const nuevo_estado_inicial = [
          {agua: this.agua},
          {cafe: this.cafe},
          {leche: this.leche},
          {azucar: this.azucar}
        ];

        // Anidamos en una misma variable todos los apartados del JSON 
        const all_json = [capacidad_maxima,nuevo_estado_inicial,bebidas];

        // Convertir el array actualizado de vuelta a formato JSON
        const datosparseados = JSON.stringify(all_json, null, 2);

        // Escribir el contenido actualizado en el archivo
        fs.writeFileSync(ruta, datosparseados, 'utf8');

        console.log("Sirviendo bebida...");
        console.log(`
          ( (
           ) )
        ┏━━━━━━┓  
        ┃ Tila ┃ ~ ~ ~
        ┗━━━━━━┛  
     `);
        console.log("Puede recoger su", bebidas[1].tipo_de_bebida);
        
      }break;
      case "3":{
        this.agua = estado_inicial[0].agua - 10;
        this.cafe = estado_inicial[1].cafe - 50;
        this.leche = estado_inicial[2].leche;
        this.azucar = estado_inicial[3].azucar;

        const nuevo_estado_inicial = [
          {agua: this.agua},
          {cafe: this.cafe},
          {leche: this.leche},
          {azucar: this.azucar}
        ];

        // Anidamos en una misma variable todos los apartados del JSON 
        const all_json = [capacidad_maxima,nuevo_estado_inicial,bebidas];

        // Convertir el array actualizado de vuelta a formato JSON
        const datosparseados = JSON.stringify(all_json, null, 2);

        // Escribir el contenido actualizado en el archivo
        fs.writeFileSync(ruta, datosparseados, 'utf8');

        console.log("Sirviendo bebida...");
        console.log(`
          ( (
           ) )
        ........
        |       |]
        \\      /
         \`----'
        `);
        console.log("Puede recoger su", bebidas[2].tipo_de_bebida);
        
      }break;
    }

  }

  salir(){
    console.clear();
    process.exit();
  }
}

let x = new maquina(300, 500, 300, 200, 2);


let y = 1;
while(y = 1){

  console.log("--------------------------------");
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

  while (isNaN(opcion) == true || opcion <= 0 || opcion > 6){
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