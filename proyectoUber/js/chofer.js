$( document ).ready(function() {
    cargarViajes();
    cargarChoferes();
});

var choferes = [
    {
        id: 1,
        nombre: "Chofer 1", 
        usuario: "chofer1",
        placa: "123"
    }, 
    {
        id: 2,
        nombre: "Chofer 2", 
        usuario: "chofer2",
        placa: "345"
    }, 
    {
        id: 3,
        nombre: "Chofer 3", 
        usuario: "chofer3",
        placa: "567"
    }
];

function cargarViajes(){
    var usuario_actual = localStorage.getItem('usuario_actual');
    var viajes = JSON.parse(localStorage.getItem(usuario_actual+"_viajes")) || [];
    var resultado = "<table class='table table-bordered'><tbody><tr><th>Conductor</th><th>Placa</th><th>Inicio</th><th>Fin</th></tr>";
    $.each(viajes, function( index, value ) {
        resultado += "<tr><td>"+value.usuario+"</td><td>"+value.chofer+"</td><td>"+value.inicio+
        "</td><td>"+value.final+"</td><td><a onclick='editar_viaje("+value.id+")' href='#'>Editar</a> | "+ 
        "<a onclick='eliminar_viaje("+value.id+")' href='#'>Eliminar</a></td></tr>";
    });
    resultado += "</tbody></table>";
    $('#div_mis_viajes').append(resultado);
}

function cargarChoferes(){
    var resultado = "<table class='table table-bordered'><tbody><tr><th>Nombre</th><th>Usuario</th><th>Placa</th><th>Acciones</th></tr>";
    $.each(choferes, function( index, value ) {
        resultado += "<tr><td>"+value.nombre+"</td><td>"+value.usuario+"</td><td>"+value.placa+
        "</td><td><a onclick='evento_chofer("+value.id+")' href='#'>Acciones</a></td></tr>";
    });
    resultado += "</tbody></table>";
    $('#div_choferes').append(resultado);
}

function evento_chofer(chofer){
    localStorage.setItem('chofer', chofer);
    $(location).attr('href', 'chofer.html');
}

function editar_viaje(id){
    localStorage.setItem('viaje_editar', id);
    $(location).attr('href', 'editar_viaje.html');
}

function eliminar_viaje(id){
    var r = confirm("¿Desea remover viaje?");
    if (r == true) {
        var usuario_actual = localStorage.getItem('usuario_actual');
        var viajes = JSON.parse(localStorage.getItem(usuario_actual+"_viajes")) || [];
        viajes = viajes.filter(function(item) { 
            return item.id !== id
        })
        localStorage.setItem(usuario_actual+"_viajes", JSON.stringify(viajes));
        $(location).attr('href', 'crear_viaje.html');       
    }
}