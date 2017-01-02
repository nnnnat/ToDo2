<?php

  class TodoController
  {

    // loading the app
    public function index() {
      $serviceLoaded = true;
    }

    // grabing all todos
    public function all() {
      $todo_list = Todo::all();

      echo json_encode($todo_list);
    }

    // grabing all upcoming todos
    public function upcoming() {
      $todo_list = Todo::get_upcoming();

      echo json_encode($todo_list);
    }

    // grabing all completed todos
    public function completed() {
      $todo_list = Todo::get_completed();

      echo json_encode($todo_list);
    }

    // grabing a todo by id
    public function get() {
      if (!isset($_GET['id'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $todo = Todo::get_todo($id);

      echo json_encode($todo);
    }

    // create a new todo
    public function create() {
      if (!isset($_GET['title']) || !isset($_GET['due_date'])) {
        return call('error');
      }

      $title = $_GET['title'];
      $due_date = $_GET['due_date'];
      $new_todo = Todo::create_todo($title, $due_date);
      $todo = Todo::get_todo($new_todo);

      echo json_encode($todo);
    }

    // deleting a todo by id
    public function delete() {
      if (!isset($_GET['id'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $deleted_todo = Todo::delete_todo($id);

      echo json_encode($deleted_todo);
    }

    // Setting todo as completed by id
    public function done() {
      if (!isset($_GET['id'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $finished_todo = Todo::completed_todo($id);
      $todo = Todo::get_todo($finished_todo);

      echo json_encode($todo);
    }

    // Resetting todo to not complete
    public function reset() {
      if (!isset($_GET['id'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $reset_todo = Todo::reset_todo($id);
      $todo = Todo::get_todo($reset_todo);

      echo json_encode($todo);
    }

    // Setting a todo as overdue
    public function overdue() {
      if (!isset($_GET['id'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $overdue_todo = Todo::overdue_todo($id);
      $todo = Todo::get_todo($overdue_todo);

      echo json_encode($todo);
    }

    // Edit an existing todo
    public function edit() {
      if (!isset($_GET['id']) || !isset($_GET['title']) || !isset($_GET['due_date'])) {
        return call('error');
      }

      $id = $_GET['id'];
      $title = $_GET['title'];
      $due_date = $_GET['due_date'];
      $edited_todo = Todo::edit_todo($id, $title, $due_date);
      $todo = Todo::get_todo($edited_todo);

      echo json_encode($todo);
    }

    // Error could be better but you know
    public function error() {
      $error = array('error'=>'There has been an error with your request dudeman');
      echo json_encode($error);
    }
  }
?>
