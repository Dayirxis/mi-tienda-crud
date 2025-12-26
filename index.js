require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('¡Conexión exitosa a MongoBD! ☁️🚀'))
    .catch((error) => console.error('Error al conectar:', error));

const esquemaProducto = new mongoose.Schema({
    nombre: {
    type: String,
    required: true
    
},
precio: {
    type: Number,
    min: 0,
    required: true
  },
});
const Producto = mongoose.model('Producto', esquemaProducto);

app.get('/', function (req, res) {
    const rutaDelArchivo = __dirname + '/index.html';
    res.sendFile(rutaDelArchivo);
});

app.get('/perfil', function (req, res) {
    res.json([
        { nombre: "Yair", carrera: "Backend Developer" },
        { nivel: "Experto en JSON" }
    ]);
});

app.get('/usuario/:nombre', function (req, res) {
    const usuario = req.params.nombre;

    res.json({
        saludo: "¡Hola" + usuario + "!",
        mensaje: "Este perfil se generó automáticamente"
    });
});

app.post('/productos', async function (req, res) {
    const datos = req.body;
    
    const nuevoProducto = new Producto(datos);
    await nuevoProducto.save();

    console.log("¡Producto guardado en la nube!", nuevoProducto);

    res.json({
        mensaje: "Producto creado en la Base de Datos",
        producto: nuevoProducto
    });   
});

app.get('/productos', async function (req, res) {
    const productosEnLaNube = await Producto.find();
    res.json(productosEnLaNube);
});


app.delete('/productos/:id', async function (req, res) {
    const idParaBorrar = req.params.id;
    await Producto.findByIdAndDelete(idParaBorrar);
    
    res.json({
        mensaje: "Producto eliminado de las bases de datos para siempre"
    });

    
});

app.put('/productos/:id', async function (req, res) {
    const idParaEditar = req.params.id;
    const nuevosDatos =req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(idParaEditar, nuevosDatos, { new: true });
    
    res.json({
        mensaje: "Producto actualizado en la nube",
        producto: productoActualizado
    });

});

app.listen(3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
});