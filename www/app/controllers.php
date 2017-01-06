<?php

  class TodoController
  {

    public function all() {
      $todo_list = Todo::all();
      echo json_encode($todo_list);
    }

    // create a new todo
    public function new() {
      if (!isset($_POST['title']) || !isset($_POST['due_date'])) {
        return call('error');
      }

      $title = $_POST['title'];
      $due_date = $_POST['due_date'];
      $new_todo = Todo::new_todo($title, $due_date);
      $todo = Todo::get_todo($new_todo);

      echo json_encode($todo);
    }

    // Edit an existing todo
    public function update() {
      if (!isset($_POST['id']) || !isset($_POST['title']) || !isset($_POST['due_date']) || !isset($_POST['completed'])) {
        return call('error');
      }

      $id = $_POST['id'];
      $title = $_POST['title'];
      $due_date = $_POST['due_date'];
      $completed = $_POST['completed'];
      $completed = ($completed === 'true');
      $edited_todo = Todo::update_todo($id, $title, $due_date, $completed);
      $todo = Todo::get_todo($edited_todo);

      echo json_encode($todo);
    }

    // deleting a todo by id
    public function delete() {
      $json = file_get_contents('php://input');
      $data = json_decode($json);
      $id = $data->id;
      if (!isset($id)) {
        return call('error');
      }

      $deleted_todo = Todo::delete_todo($id);

      echo json_encode($deleted_todo);
    }

    // Error could be better but you know
    public function error() {
      $error = array('error'=>'There has been an error with your request dudeman');
      echo json_encode($error);
    }
  }
?>
