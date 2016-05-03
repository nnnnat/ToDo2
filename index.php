<?php

  ini_set('display_errors', 'On'); // turning on error messages
  define('APP', './app/'); // setting a app path constant
  define('TEMPLATES', './app/templates/'); // setting a tamplate path constant
  define('STYLES', 'main.css'); // setting a css file path constant
  define('SCRIPTS', 'main.js'); // setting a js file path constant

  require_once APP.'database.php'; // loading Database class

  if (isset($_GET['action'])) { // if url has an /?action={action}
    $action = $_GET['action']; // get passed action
    require_once APP.'routes.php'; // loading routes
  } else {
    $action = 'index'; // set action to index and load the app markup, this should only run on first load
    require_once APP.'views.php'; // laoding in views
  }

?>
