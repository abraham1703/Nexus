<?php

// Esto previene el acceso directo al archivo de configuración.
// `exit` detiene el script y `die` hace lo mismo con un mensaje.
// Esta condición debe ir al inicio de este archivo.
if (!defined('IS_CONFIG_FILE')) {
    die('Acceso denegado');
}

// ----------------------------------------------------
// Configuración para depuración (solo en desarrollo)
// En producción, cambia `display_errors` a `0`.
ini_set('display_errors', 1);
error_reporting(E_ALL);
// ----------------------------------------------------

// Definición de constantes para la conexión a la base de datos
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', ''); // Deja esto vacío si no tienes contraseña
define('DB_NAME', 'nexus_config');
define('DB_CHARSET', 'utf8mb4');