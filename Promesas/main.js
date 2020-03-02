
window.onload = () =>{
  ejemplo07();
}
function ejemplo01(){
	let miPromesa = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve("Todo bien");
		}, 1000);
		setTimeout(()=>{
			reject("Todo mal");
		}, 5000);
  })

  miPromesa.then((res)=>{
  	console.log(res);
  }, (err)=>{
  	console.log(err);
  });
}

function ejemplo02(){
	let miPromesa = new Promise((todoBien, todoMal)=>{
		let resultado = false;
		if (resultado) {
			todoBien("listo");
		} else {
			todoMal("algo falló");
		}
  })

  miPromesa.then((resultado)=>{
  	console.log("El resultado 1 es: " + resultado);
  })
  .catch((resultado)=>{
  	console.log("El resultado 2 es: " + resultado);
  });
}

function ejemplo03(){
	let promesaPrimera = ()=>{
		return new Promise((resolve, reject)=>{
			resolve('Primera Promesa');
		});
	}
	let promesaSegunda = (msg)=>{
		return new Promise((resolve, reject)=>{
			resolve(msg + 'Segunda Promesa');
		});
	}
	let promesaTercera = (msg)=>{
		return new Promise((resolve, reject)=>{
			resolve(msg + 'Tercera Promesa');
		});
	}
  promesaPrimera().then((resultado)=>{
  	return promesaSegunda(resultado);
  }).then((resultado)=>{
  	return promesaTercera(resultado);
  }).then((resultado)=>{
  	console.log('Final ' + resultado);
  });
}

function ejemplo04(){
	let promesaPrimera = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve("Promesa1 - Todo bien");
		}, 1000);
	})
	let promesaSegunda = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve("Promesa2 - Todo bien");
		}, 1500);
	})
  Promise.all([promesaPrimera, promesaSegunda])
  	.then((data)=>{
  		console.log(data);
  	})
  	.catch((err)=>{
  		console.log(err);
  	});
}

function ejemplo05(){
	let promesaPrimera = ()=>{
		return new Promise((resolve, reject)=>{
			resolve('Primera promesa lista');
		});
	}
	let promesaSegunda = ()=>{
		return new Promise((resolve, reject)=>{
			resolve('Segunda promesa lista');
		});
	}
	let promesaTercera = ()=>{
		return new Promise((resolve, reject)=>{
			resolve('Tercera promesa lista');
		});
	}
	Promise.all([promesaPrimera(), promesaSegunda(), promesaTercera()]).then(
		(respuestas)=>{
			respuestas.forEach((msg)=>{
				console.log(msg);
			});
		});
}
//Callbacks
function ejemplo06(){
	  // Declaración de los arreglos
let animales = [ {id:1, nombre:"perro"}, {id:2, nombre:"gato"}, {id:3, nombre:"tortuga"} ];
let alimentos = [{id:1, alimento:"carne"},{id:2, alimento:"leche"}];
//El callback que recibe id y una función como parametros
let getAnimal = (id,callback) =>{
//Busqueda en el arreglo animales que se declaro arriba
  let animal = animales.find(animal=> animal.id===id);
// condicion del callback
  if (animal) {
    //si existe el animal se regresan los parametros null y id
    callback(null,animal);
  } else {
    callback("No existe ese animal",id);
  }
}
// recibe el id y una función como parametros
let getAlimento = (animal,callback) =>{
  // busca dentro de alimentos(el objeto declarado arriba)
  let alimento = alimentos.find(alimento => animal.id===alimento.id);

  if (alimento) {
    callback(null,{
      nombre:animal.nombre,
      alimento: alimento.alimento,
      id: animal.id
    });
  } else {
    callback("No existe alimento para ese animal",animal.id);
  }
}
//llamado de la función "getAnimal" con una función como parametro
getAnimal(2, 
//inicia el parametro como función
  (err,animal)=>{
    // si recibe null y un id quiere decir que no hay error y que si existe un animal
  if (err) {
    return console.log(err);
  }
  //console.log(animal);
  // Manda a llamar otro callback
  // los paramtros son el id del primer callback y otro callback
  getAlimento(animal, (err,respuesta) =>{
    if (err) {
      return console.log(err);
    }

    console.log("El alimento de ",respuesta.nombre," es: ",respuesta.alimento);
  });
}
//Termina el parametro como función
);

}
function ejemplo07(){
	let animales = [
  {id:1, nombre:"perro"},
  {id:2, nombre:"gato"},
  {id:3, nombre:"tortuga"}
  ];
let alimentos = [{id:1, alimento:"carne"},{id:2, alimento:"leche"}];

//Get Animal
let getAnimal = (id) => {
  return new Promise((resolve,reject)=>{
    let animal = animales.find(animal => animal.id==id);

    if (animal) {
      resolve(animal);
    } else {
      reject('No existe el animal con identificador '+id );
    }
  });
}

//get Alimento
let getAlimento = (animal) => {
  return new Promise((resolve,reject)=>{
    let alimento = alimentos.find(alimento => animal.id==alimento.id);

    if (alimento) {
      resolve({
        nombre:animal.nombre, 
        alimento:alimento.alimento, 
        id:animal.id
      });
    } else {
      reject('No existe alimento para el animal con identificador '+animal.id );
    }
  });
}
//Llamado
getAnimal(2).then(animal => {
  return getAlimento(animal);
}).then(respuesta => {
  console.log("El alimento de ",respuesta.nombre," es: ",respuesta.alimento);
}).catch( err => { 
  console.log(err);
});
}
function ejemplo08{
	let p1 = new Promise((resolver, rechazar)=>{
			setTimeout(()=>{
				console.log("promesa 1");
				resolver("uno");
			}, 500);
		});

		let p2 = new Promise((resolver, rechazar)=>{
			setTimeout(()=>{
				console.log("promesa 2");
				resolver("dos");
			}, 1100);
		});

		Promise.race([p1,p2])
		.then((valor)=>{
			console.log(valor);
		})
}

addEvent(window, 'load', 
  function(){ loadScript('http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js', 
  function () { loadScript('js/global.js')} 
  );
});