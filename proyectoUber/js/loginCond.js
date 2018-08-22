$('#btn_inicio').click(function(){
    var login = false;
    if($('#email').val() === ""){
        alert('Debe ingresar correo');
        return;
    }
    if($('#contrasena').val() === ""){
        alert('Debe ingresar contraseña');
        return;
    }
    var usuarios_array = JSON.parse(localStorage.getItem("usuarios")) || [];
    $.each(usuarios_array, function( index, value ) {
        if($('#email').val() === value.correo && $('#contrasena').val() === value.contrasena){
            localStorage.setItem('usuario_actual', $('#email').val());
            login = true;
            $(location).attr('href', 'dashboard.html');
        }
      });
      if(!login){
        alert('Usuario inexistente');            
      }
});
