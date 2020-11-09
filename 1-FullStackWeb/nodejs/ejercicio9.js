const http=require('http');
const url=require('url');
const fs=require('fs');

const servidor=http.createServer( (pedido,respuesta) => {
  const objetourl = url.parse(pedido.url);
  let camino='static'+objetourl.pathname;
  if (camino=='static/')
    camino='static/index.html';
  fs.stat(camino, error => {
    // Si existe el archivo
    if (!error) {
      fs.readFile(camino, (error,contenido) => {
        if (error) { // Si ubo algun error al leer el archivo
          respuesta.writeHead(500, {'Content-Type': 'text/plain'});
          respuesta.write('Error interno');
          respuesta.end();					
        } else { // Si no ubo ningun error al leer el archivo
          respuesta.writeHead(200, {'Content-Type': 'text/html'});
          respuesta.write(contenido);
          respuesta.end();
        }
      });
    } else { // Si no existe el archivo
      respuesta.writeHead(404, {'Content-Type': 'text/html'});
      respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
      respuesta.end();
    }
  });
});

servidor.listen(8888);

console.log('Servidor web iniciado');