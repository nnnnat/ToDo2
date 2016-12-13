<?php

  //phpinfo();
  //ini_set('display_errors', 1); // turning on error messages

  define('APP', './app/'); // setting a app path constant
  define('TEMPLATES', './app/templates/'); // setting a tamplate path constant
  define('STYLES', './app/assets/build/main.css'); // setting a css file path constant
  define('SCRIPTS', './app/assets/build/main.js'); // setting a js file path constant

  require_once APP.'database.php'; // loading Database class

  if (isset($_GET['action'])) { // if url has an /?action={action}
    $action = $_GET['action']; // get passed action
    require_once APP.'routes.php'; // loading routes
  } else {
    $action = 'index'; // set action to index and load the app markup, this should only run on first load
    require_once APP.'views.php'; // laoding in views
  }

?>
