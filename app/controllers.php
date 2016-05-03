<?php

  class TodoController
  {

    // loading the app
    public function index() {
      $serviceLoaded = true;
    }

    // grabing all upcoming todos
    public function upcoming() {
      $todo_list = Todo::get_upcoming();

      echo json_encode($todo_list);
    }


  }

?>
