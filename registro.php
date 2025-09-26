<?php

session_start();
define('IS_CONFIG_FILE', true);
require_once 'C:\xampp\htdocs\trabajodegrado\db_config\db_config.php';

// Función para enviar una respuesta JSON y finalizar
function sendJsonResponse($status, $message)
{
    header('Content-Type: application/json');
    echo json_encode(['status' => $status, 'message' => $message]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validar campos vacíos
    if (empty($_POST['usuario']) || empty($_POST['contrasena'])) {
        sendJsonResponse("error", "El usuario y la contraseña son obligatorios. ⚠️");
    }

    // Sanear y validar la entrada
    $usuario = htmlspecialchars(trim($_POST['usuario']));
    $contrasena = trim($_POST['contrasena']);



    if (!preg_match("/^[a-zA-Z0-9ñÑ_$]+$/", $usuario)) {
        sendJsonResponse("error", "El nombre de usuario solo puede contener letras, números, guion bajo y $");
    }

    if (!preg_match("/^[a-zA-Z0-9ñÑ_$]+$/", $contrasena)) {
        sendJsonResponse("error", "La contraseña solo puede contener letras, números, guion bajo y ($),");
    }

    // Validar longitud del usuario y la contraseña
    if (strlen($usuario) < 8 || strlen($usuario) > 50) {
        sendJsonResponse("error", "El nombre de usuario debe tener minimo 8 caracteres");
    }

    if (strlen($contrasena) < 8) {
        sendJsonResponse("error", "La contraseña debe tener al menos 8 caracteres. 🔐");
    }

    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        sendJsonResponse("error", "Error de conexión: " . $conn->connect_error . " ❌");
    }

    $check_user_sql = "SELECT id FROM usuarios WHERE usuario = ?";
    $check_stmt = $conn->prepare($check_user_sql);
    $check_stmt->bind_param("s", $usuario);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        $check_stmt->close();
        $conn->close();
        sendJsonResponse("error", "El usuario ya existe. Por favor, elige otro.");
    }
    $check_stmt->close();

    $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);
    $sql = "INSERT INTO usuarios (usuario, contrasena, fecha_registro) VALUES (?, ?, NOW())";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ss", $usuario, $hashed_password);
        if ($stmt->execute()) {
            sendJsonResponse("success", "¡Registro exitoso! ✅");
        } else {
            sendJsonResponse("error", "Error al registrar: " . $stmt->error . " ❌");
        }
        $stmt->close();
    } else {
        sendJsonResponse("error", "Error al preparar la consulta: " . $conn->error . " ❌");
    }
    $conn->close();
} else {
    // Si no es un POST, redirige (opcional, buena práctica)
    header("Location: index.html");
    exit();
}