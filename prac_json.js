//importamos fs (filesystem)
const fs = require('fs');

// Ruta del archivo JSON
const ruta = './json.json';

// Leer el contenido actual del archivo JSON
const datos = fs.readFileSync(ruta, 'utf8');
const estudiantes = JSON.parse(datos); // Convertir JSON a objeto

// Nuevo estudiante a añadir
const nuevoEstudiante = {
  nombre: 'Carmelito',
  edad: 20,
  calificaciones: [10, 8, 10],
};

// Añadir el nuevo estudiante al array
estudiantes.push(nuevoEstudiante);

// Convertir el array actualizado de vuelta a formato JSON
const datosparseados = JSON.stringify(estudiantes, null, 2);

// Escribir el contenido actualizado en el archivo
fs.writeFileSync(ruta, datosparseados, 'utf8');

console.log('Estudiante añadido correctamente.');

for(let i = 0 ; i < estudiantes.length; i++){
console.log("Nombre:",estudiantes[i].nombre);
console.log("Edad:",estudiantes[i].edad);
console.log("Notas:",estudiantes[i].calificaciones);
console.log("----------------------------------------");
}