<?php

ini_set('display_errors', 'On'); // turning on error messages
define('APP', './app/'); // setting a app path constant
define('TEMPLATES', './app/templates/'); // setting a tamplate path constant
define('STYLES', 'main.css'); // setting a css file path constant
define('SCRIPTS', 'main.js'); // setting a js file path constant

require_once APP.'database.php'; // loading Database class

?>
