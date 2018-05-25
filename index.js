const express = require("express"),
    consolidate = require("consolidate"),
    fs = require('fs');
    
    
var app = express(),
db;

var visitas = "",
    encabezadoActual = "Numero de visitas desde que se inició el servidor:",
    encabezadoAnterior = "Numero de visitas en la sesión anterior:"
    inicio = 0,
    proyectos = 0,
    contacto = 0;

var content;
    // First I want to read the file
    fs.readFile('visitas.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;

        fs.writeFile("Historial de Visitas.txt", encabezadoAnterior + content,
        function(err) {
           if(err) {
               return console.log(err);
           }
           console.log("intento de crear historial de visitas");
       });
    });


fs.writeFile("visitas.txt", encabezadoActual+
`
    Inicio: 0
    Proyectos: 0
    Contacto: 0
`,
 function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("El archivo ha sido creado");
});

app.engine("hbs", consolidate.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.static("public"));

app.listen(5000, console.log("Listening"));


app.get("/", (req, res) => {
    res.render("index");
});


app.get("/:id/", (req, res) => {
    console.log(req.params.id);

    var vista = req.params.id+"";

    if(vista == "contacto"){
        contacto += 1;
    } else if (vista == "proyectos"){
        proyectos += 1;
    } else if (vista == "inicio"){
        inicio += 1;
    } else {
        vista = "404";
    }
    
    
    fs.writeFile("visitas.txt", 
    `Numero de visitas desde que se inició el servidor:
    
        Inicio:`+ inicio +`
        Proyectos: `+ proyectos +`
        Contacto: `+ contacto +`
    `,
     function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("El archivo ha sido actualizado");
    });

    res.render(vista);
});

/* PRIMER INTENTO
app.get("/", (req, res) => {
    inicio += 1;
    fs.writeFile("visitas.txt", 
    `Numero de visitas desde que se inició el servidor:
    
        Inicio:`+ inicio +`
        Proyectos: `+ proyectos +`
        Contacto: `+ contacto +`
    `,
     function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("El archivo ha sido actualizado");
    });

    res.render("inicio");
});

app.get("/contacto", (req, res) => {

    contacto += 1;
    
    fs.writeFile("visitas.txt", 
    `Numero de visitas desde que se inició el servidor:
    
        Inicio:`+ inicio +`
        Proyectos: `+ proyectos +`
        Contacto: `+ contacto +`
    `,
     function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("El archivo ha sido actualizado");
    });

    res.render("contacto");
});

app.get("/proyectos", (req, res) => {

    proyectos += 1;
    
    fs.writeFile("visitas.txt", 
    `Numero de visitas desde que se inició el servidor:
    
        Inicio:`+ inicio +`
        Proyectos: `+ proyectos +`
        Contacto: `+ contacto +`
    `,
     function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("El archivo ha sido actualizado");
    });

    res.render("proyectos");
});
*/


