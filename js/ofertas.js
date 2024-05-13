document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener y mostrar una oferta aleatoria
    function mostrarOfertaAleatoria() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../php/ofertas.php?obtener_oferta=true", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var oferta = JSON.parse(xhr.responseText);
                if (oferta.error) {
                    console.error("Error al obtener la oferta:", oferta.error);
                } else {
                    // Accede a las propiedades correctamente
                    document.getElementById('nombreEmpresa').textContent = oferta.nombreEmpresa;
                    document.getElementById('cargoEmpresa').textContent = oferta.cargoEmpresa;
                    document.getElementById('lugar').textContent = oferta.lugar;
                    document.getElementById('tiempo').textContent = oferta.tiempo;
    
                    // Las siguientes líneas dependen de cómo está estructurado el objeto JSON devuelto por tu PHP
                    // Asegúrate de que las propiedades y su estructura coincidan con lo que espera tu JavaScript
                    // Ejemplo: si `funcionEmpresa` es una cadena, entonces no es necesario dividirla
                    // Si es una lista, entonces estás haciendo lo correcto
                    var funciones = oferta.funcionEmpresa.split("\n");
                    var ul = document.getElementById('funcionEmpresa');
                    ul.innerHTML = ""; // Limpiar la lista de funciones antes de agregar nuevas
                    funciones.forEach(function(funcion) {
                        var li = document.createElement('li');
                        li.textContent = funcion;
                        ul.appendChild(li);
                    });
    
                    // Mostrar la imagen de la empresa
                    document.querySelector('.icono').src = oferta.img;


                    // Obtener el ID de la oferta y almacenarlo en una variable
                    var idOferta = oferta.id_ofertas; // Suponiendo que el ID se llama "id_ofertas"
                    // Añadir un atributo de datos al botón "favorite-btn" para almacenar el ID de la oferta
                    document.querySelector('.favorite-btn').setAttribute('data-id-oferta', idOferta);

                     // Obtener el ID de la oferta y almacenarlo en una variable
                     var idOferta = oferta.id_ofertas; // Suponiendo que el ID se llama "id_ofertas"
                     // Añadir un atributo de datos al botón "favorite-btn" para almacenar el ID de la oferta
                    document.querySelector('.favorite-btn').setAttribute('data-id-oferta', idOferta);
        

        
                }
            } else {
                console.error("Error al cargar la oferta:", xhr.statusText);
            }
        };
        xhr.send();
    }

    // Mostrar una oferta aleatoria al cargar la página
    mostrarOfertaAleatoria();

    // Agregar un controlador de eventos de clic al botón de cerrar
    document.querySelector('.close-btn').onclick = function() {
        console.log("Se ha hecho clic en el botón de cerrar."); 
        // Añadir clase para activar la animación de salida
        document.querySelector('.card_ofertas').classList.add('oculto');
        
        // Esperar 2 segundos antes de mostrar el nuevo div
        setTimeout(function() {
            // Remover la clase "oculto" para mostrar el nuevo div
            document.querySelector('.card_ofertas').classList.remove('oculto');
            // Llamar a la función para obtener y mostrar una nueva oferta aleatoria
            mostrarOfertaAleatoria();
        }, 2000); // 2000 milisegundos = 2 segundos
    };
    

    document.querySelector('.favorite-btn').onclick = function() {
        var idOferta = this.getAttribute('data-id-oferta');
        console.log("ID de la oferta:", idOferta); // Agregar este console.log para verificar el ID de la oferta
    
        // Verificar si el ID de la oferta está definido
        if (idOferta !== null) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../php/favoritos.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (data.success) {
                                console.log(data.message); // Muestra el mensaje de éxito en la consola
                                // Aquí puedes realizar cualquier acción adicional si la operación fue exitosa

                                // Girar hacia la derecha y desvanecer
                                document.querySelector('.card_ofertas').classList.add('oculto2');

                                // Esperar 2 segundos antes de reaparecer en el centro
                                setTimeout(function() {
                                // Quitar la clase de girar y desvanecer
                                document.querySelector('.card_ofertas').classList.remove('oculto2');
                                // Llamar a la función para obtener y mostrar una nueva oferta aleatoria
                                mostrarOfertaAleatoria();
                                }, 2000); // Esperar 2000 milisegundos (2 segundos)

                            } else {
                                console.error(data.error); // Muestra el mensaje de error en la consola
                                // Aquí puedes manejar el error de alguna manera apropiada
                            }
                        } catch (error) {
                            console.error("Error al analizar la respuesta JSON:", error);
                        }
                    } else {
                        console.error("Error en la solicitud: " + xhr.status);
                    }
                }
            };
    
            xhr.send("id_oferta=" + idOferta);
        } else {
            console.error("ID de la oferta no definido.");
        }
    };
    
    
    // Agregar un controlador de eventos de clic al botón de favoritos
    //document.querySelector('.favorite-btn').onclick = function() {
        // Obtener el ID de la oferta y el ID del perfil del estudiante
        //var idOferta = /* Agrega aquí el ID de la oferta */;
        //var idPerfil = /* Agrega aquí el ID del perfil del estudiante */;

        // Crear un objeto FormData para enviar los datos al servidor
        //var formData = new FormData();
        //formData.append('id_oferta', idOferta);
        //formData.append('id_perfil', idPerfil);

        // Crear y enviar la solicitud AJAX al servidor
        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "../php/guardar_favorito.php", true);
        //xhr.onload = function() {
            //if (xhr.status === 200) {
                // Manejar la respuesta del servidor si es necesario
                //console.log(xhr.responseText);
            //} else {
                //console.error("Error al guardar la oferta como favorita:", xhr.statusText);
            //}
        //};
        //xhr.send(formData);
    //};
});
