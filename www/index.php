<?php

  //phpinfo();
  //ini_set('display_errors', 1); // turning on error messages

  define('APP', './app/'); // setting a app path constant
  define('TEMPLATES', './app/templates/'); // setting a tamplate path constant
  define('STYLES', './app/assets/build/main.css'); // setting a css file path constant
  define('SCRIPTS', './app/assets/build/main.js'); // setting a js file path constant

  require_once APP.'database.php'; // loading Database class

  $uri = $_SERVER['REQUEST_URI'];

  if ($uri === '/') {
    require_once APP.'views.php';
  } else {
    require_once APP.'router.php';
  }
?>
