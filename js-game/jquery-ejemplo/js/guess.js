$(document).ready(function(){
    /*
    * Variables globales
    */
    var intentos;
    var numeroRandom;
    var numeroUsuario;
    var nombreUsuario;

    /**
     * Función a utilizar cuando quiero generar un número aleatorio
     */
    var generarRandom = function(){
        // Se genera entre 1 y 10
        numeroRandom = Math.floor( Math.random() * 10 ) + 1;
    }

    var comenzar = function(){
        // Genero el número a adivinar
        generarRandom()
        intentos = parseInt(prompt("¿Cuantos intentos querés?"));
        $("#intentos").text(intentos);
    }

    /**
     * Se ejecuta cada vez que se intente adivinar un número
     * Determinará si ganamos perdemos o seguimos jugando
     */
    var jugar = function(){
        // Obtengo lo que puso el usuario
        numeroUsuario = parseInt($('#inputAdivinar').val());
        // Verifico si ganó
        if(numeroUsuario === numeroRandom){
            $('.game').fadeOut();
            $('#win').removeClass('hide');
        }else{
            // Si no ganó, resto un intento
            intentos--;
            // Verifico si perdió
            if(intentos === 0){
                $('.game').fadeOut();
                $('#loose').removeClass('hide');
            }else{
                // Si no perdió muestro los intentos y la pista
                $("#intentos").text(intentos);
                mostrarPista();
            }
        }
    }

    var mostrarPista = function(){
        if(numeroUsuario > numeroRandom){
            $(".indicador-pistas").text("Muy alto!");
        }else{
            $(".indicador-pistas").text("Muy bajo!");
        }
    }

    /**
     * Click en boton login
     */
    $('#login').click(function(){
        // Cuando toca siguiente verifico si el input tiene algún dato
        var nameInput = $("#nombreInput").val();
        if(nameInput === '' || nameInput === undefined){
            // Si no tiene nada, le aviso que es obligatorio completar
            alert("El nombre es obligatorio");
        }else{
            // Si tiene algo lo guardo en la variable global para usarlo cuando lo necesite
            nombreUsuario = nameInput;
            // Borro la pantalla de login para mostrar la instrucciones
            $('.intro').fadeOut();
            // Muestro la pantalla siguiente
            $('.instructions').removeClass('hide');
            // Pongo el nombre adentro del html
            $('#nombre').html(nombreUsuario);
        }
    });

    /**
     * Click en botón comenzar
     */
    $('#comenzar').click(function(){
        // Fade out a las instrucciones
        $('.instructions').fadeOut();
        // Muestro el juego
        $('.game').removeClass('hide');
        // Inicio el juego
        comenzar()
    });

    /**
     * Click en adivinar
     */
    $('#botonAdivinar').click( jugar );
});