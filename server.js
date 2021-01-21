/*
  Descripcion: Servidor web con express para proveer parametros con envars
  Autor: Carlos Vallejos
  Empresa: Vamyal S.A.
  Fecha: Diciembre 2020
*/

require('dotenv').config()

const http = require('http')
const express = require('express')
const path = require('path')
const log = require('volleyball')
// La app express
const app = express()

app.use(log)

// Algunas cuestiones para estar detras de NGINX
app.set('trust proxy', true)
app.set('strict routing', true)
app.set('case sensitive routing', true)

// Agragamos el header powered-by Vamyal S.A. en un middleware
app.set('x-powered-by', false)
app.use((req, res, next) => {
  res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>')
  res.header(
    'X-Hello-Human',
    'Somos @vamyalsa, Escribinos a <contacto@vamyal.com>'
  )
  next()
})

const options = {
  index: 'index.html',
}

app.get('/api_url', (req, res) => {
  return res.status(200).json({
    api_url: process.env.API_URL,
  })
})

app.use('/', express.static(path.join(__dirname, 'public'), options))

// El resto de metodos y rutas
app.use('*', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Vamyal S.A. 2021 ! -  Frontend Wepa',
  })
  next()
})

// Arrancamos el Server Express, a traves de http para uso con socket.io a futuro.
console.time('Arrancamos el server en')
var server = http
  .createServer(app)
  .listen(process.env.PORT, process.env.IP, () => {
    console.log(
      `Sistema Web con Express en http://${server.address().address}:${
        server.address().port
      }`
    )
    console.timeEnd('Arrancamos el server en')
  })
