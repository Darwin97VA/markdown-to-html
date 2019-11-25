const express = require('express')
const app = express()
const showdown = require('showdown')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3000

converter = new showdown.Converter();
converter.setOption('tables',true)
fs.readdir('./docs',(err,files)=>{
    files.forEach(file=>{
        var nombre = file.slice(0,-3) 
        app.get(`/${nombre}`,(req,res)=>{
            res.send(routeFile(nombre))
        })
    })
})

function routeFile(ruta){
    var data = fs.readFileSync(path.resolve(__dirname,'docs',`${ruta}.md`),'utf-8')
    return converter.makeHtml(data)
}
app.listen(PORT, (req,res)=>{console.log(PORT)})