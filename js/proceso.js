
function verificarFase() {
    // Realizar una solicitud AJAX para obtener el estado de completado del usuario
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/completado.php');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var faseCompletada = xhr.responseText.trim();
            if (faseCompletada === '0') {
                window.location.href = 'preinscripcion.html'; // Redirigir a preinscripcion.html
            } else if (faseCompletada === '1') {
                window.location.href = 'taller.html';; // Redirigir a la siguiente fase (hojaVida.html)
            } else if (faseCompletada === '2') {
                window.location.href = 'hojaVida.html'; // Redirigir a la siguiente fase (hojaVida.html)
            } // Puedes agregar más casos según las fases que tengas
        } else {
            console.error('Error al comprobar estado de completado.');
        }
    };
    xhr.send();
}
