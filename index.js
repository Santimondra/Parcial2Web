const express = require("express"),
    consolidate = require("consolidate"),
    fs = require('fs');
    
    
var app = express(),
db;

var visitas = "",
    inicio = 0,
    proyectos = 0,
    contacto = 0;

fs.writeFile("visitas.txt", 
`Numero de visitas desde que se inició el servidor:

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

app.get("/:id", (req, res) => {
    console.log(req.params.id);

    var vista = req.params.id+"";

    if(vista == "contacto"){
        contacto += 1;
    } else if (vista == "proyectos"){
        proyectos += 1;
    } else if (vista == ""){
        inicio += 1;
    } else {
        console.log("404")
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

/*
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


