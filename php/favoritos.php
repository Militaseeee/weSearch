<?php
session_start(); // Iniciar sesión
include 'conex.php';

// Inicializar la respuesta como un array
$response = array();

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se recibió el ID de la oferta
    if (isset($_POST['id_oferta'])) {
        // Obtener el ID de la oferta desde la solicitud POST
        $id_oferta = $_POST['id_oferta'];

        // Verificar si el usuario está autenticado y tiene un perfil
        if (isset($_SESSION['id_perfil'])) {
            // El usuario está autenticado, proceder con la lógica para agregar la oferta a favoritos

            // Realizar la inserción en la base de datos
            $id_perfil = $_SESSION['id_perfil'];
            $query = "INSERT INTO favoritos (id_perfil, id_oferta) VALUES ('$id_perfil', '$id_oferta')";
            if (mysqli_query($conex, $query)) {
                // Si la inserción fue exitosa, establecer un mensaje de éxito en la respuesta
                $response['success'] = true;
                $response['message'] = 'Oferta agregada a favoritos correctamente.';
                // Registrar la oferta como favorita en la sesión del usuario
                $_SESSION['favoritos'][] = $id_oferta;
            } else {
                // Si hubo un error en la inserción, establecer un mensaje de error en la respuesta
                $response['success'] = false;
                $response['error'] = 'Error al agregar la oferta a favoritos: ' . mysqli_error($conex);
            }
        } else {
            // Si el usuario no está autenticado, establecer un mensaje de error en la respuesta
            $response['success'] = false;
            $response['error'] = 'El usuario no está autenticado.';
        }
    } else {
        // Si no se recibió el ID de la oferta, establecer un mensaje de error en la respuesta
        $response['success'] = false;
        $response['error'] = 'ID de oferta no recibido en la solicitud.';
    }
} else {
    // Si no se recibió una solicitud POST, establecer un mensaje de error en la respuesta
    $response['success'] = false;
    $response['error'] = 'Se esperaba una solicitud POST.';
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
