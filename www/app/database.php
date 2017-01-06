<?php

class Database
{
  private static $instance = NULL;

  private function __construct() {}

  private function __clone() {}

  public static function getInstance() {
    if (!isset(self::$instance)) {
      $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
      self::$instance = new PDO('mysql:host=mysql;dbname=todo2', 'nat', 'Att26-one-nola', $pdo_options);
    }
    return self::$instance;
  }
}
?>
