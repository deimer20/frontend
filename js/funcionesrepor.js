
const url = 'http://localhost:8082/api/reporte' //url de la api. Al desplegarla en el servidor local colocar la api del servi
const listarDatos =() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function(data){
        let listarDatos = data.reportes
        listarDatos.map(function(reportes){
            respuesta += `<tr><td>${reportes.direccion}</td>`+
                        `<td>${reportes.latitud}</td>`+
                        `<td>${reportes.longitud}</td>`+
                        `<td>${reportes.descripcion}</td>`+
                        `<td>${reportes.FechaReporte}</td>`+
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(reportes)})'>Editar</a>
                        <a class="waves-effect waves-light btn modal-denger red" href="http://localhost:3000/colegioConsumirAPI/listarDatos.html" onclick='eliminar(${JSON.stringify(reportes)})'>Eliminar</a></td></tr>`  
                        body.innerHTML = respuesta

        })
    })
    //alert('En desarrollo...')
}

const registrar = async()=>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
    //alert(_pass.length+' '+_confirmaPass.length)

    if (_direccion.length>0 && _latitud.length>0 && _longitud.length>0 &&  _descripcion.length>0 ){
        let _reporte = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_reporte), //Convertir el objeto usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
        .then(json   =>{
           // alert(json.msg)
           Swal.fire(
            json.msg,
            '',
            'success'
          );setTimeout(() => {
            window.location.href = "listarDatos.html"
          }, 2000);

        })
    


    } else {
     //alert('El Password y la Confirmar de Password no coinciden. Por favor corregir')
     Swal.fire(
        'VERIFICAR LOS CAMPOS. Por favor corregir',
        '',
        'error'
      )
}
}

const editar= (reporte) =>{

    
    document.getElementById('direccion').value= ''
    document.getElementById('latitud').value= ''
    document.getElementById('longitud').value= ''
    document.getElementById('descripcion').value= ''

    document.getElementById('direccion').value= reporte.direccion
    document.getElementById('latitud').value= reporte.latitud
    document.getElementById('longitud').value= reporte.longitud
    document.getElementById('descripcion').value= reporte.descripcion


}

// ACTUALIZAR DATOS
const actualizar = async()=>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

    if (_direccion.length>0 && _latitud.length>0 && _longitud.length>0 &&  _descripcion.length>0 ){
        let _reporte = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_reporte), //Convertir el objeto usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
        .then(json   =>{
            //alert(json.msg)
            Swal.fire(
                json.msg,
                '',
                'success'
              );setTimeout(() => {
                window.location.href = "listarDatos.html"
              }, 2000);
        })


    } else {
     //alert('El Password y la Confirmar de Password no coinciden. Por favor corregir')
     Swal.fire(
        '. Por favor corregir',
        '',
        'error'
      )
}
}

const eliminar = (_id) =>{
    if(confirm('¿Está seguro de relizar la eliminación?') == true){
        
            let reporte = {
                _id: _id
                
            }
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(reporte), //Convertir el objeto usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
            .then(json   =>{
                alert(json.msg)
            })

    }setTimeout(() => {
        window.location.href = "listarDatos.html"
      }, 2000);
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizar)
}

