<?php

class Database
{

  private static $instance = NULL;

  private function __construct() {}

  private function __clone() {}

  public static function getInstance() {
    if (!isset(self::$instance)) {
      $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
      // local settings self::$instance = new PDO('mysql:host=localhost;dbname=todo2', 'root', 'root', $pdo_options);
      self::$instance = new PDO('mysql:host=us-cdbr-iron-east-04.cleardb.net;dbname=heroku_e87991e6ce48121', 'b3661b4d719eb1', '708fed96', $pdo_options); // heroku settings
    }
    return self::$instance;
  }

}

?>
