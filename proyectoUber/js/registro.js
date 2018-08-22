$('#btn_registro').click(function(){
    var existente = false;
    var usuarios_array = JSON.parse(localStorage.getItem("usuarios")) || [];
    if($('#nombre_completo').val() === ""){
        alert('Debe ingresar nombre');
        return;
    }
    if($('#email').val() === ""){
        alert('Debe ingresar correo');
        return;
    }
    if($('#contrasena').val() === ""){
        alert('Debe ingresar contraseña');
        return;
    }
    if($('#contrasena').val() !== $('#contrasena_verificacion').val()){
        alert('Las contraseñas deben de ser iguales');
        return;
    }
    $.each(usuarios_array, function( index, value ) {
        if($('#email').val() === value.correo){
            existente = true;
            return;
        }
      });
    if(!existente){
        var usuario =   {nombre:$('#nombre_completo').val(), correo:$('#email').val(), contrasena:$('#contrasena').val()}
        usuarios_array.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios_array));
        alert("Usuario registrado con éxito!");
        localStorage.setItem('usuario_actual', usuario.correo);
        $(location).attr('href', 'dashboard.html');
    }else{
        alert('Correo de usuario existente');
    }
    
});

