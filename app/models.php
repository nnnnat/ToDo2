<?php

  class Todo
  {

    // Todo Variables
    public $id;
    public $title;
    public $due_date;
    public $created_date;
    public $overdue;
    public $complete;

    // Todo constructer
    function __construct($id, $title, $due_date, $created_date, $overdue, $complete) {
      $this->id = $id;
      $this->title = $title;
      $this->due_date = date('M j, Y', strtotime($due_date));
      $this->created_date = $created_date;
      $this->overdue = ($overdue == 0 ? false : true);
      $this->complete = ($complete == 0 ? false : true);
    }

    // Returns all upcoming todos
    public static function get_upcoming() {
      $todo_list = [];
      $db = Database::getInstance();
      $request = $db->query('SELECT * FROM todo WHERE completed = 0 ORDER BY due_date ASC LIMIT 6');

      foreach ($request->fetchAll() as $todo) {
        $todo_list[] = new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['created_date'],$todo['overdue'],$todo['completed']);
      }

      return $todo_list;
    }

    // Returns all completed todos
    public static function get_completed() {
      $todo_list = [];
      $db = Database::getInstance();
      $request = $db->query('SELECT * FROM todo WHERE completed = 1 ORDER BY due_date ASC LIMIT 6');

      foreach ($request->fetchAll() as $todo) {
        $todo_list[] = new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['created_date'],$todo['overdue'],$todo['completed']);
      }

      return $todo_list;
    }

    // Returns a todo by id
    public static function get_todo($id) {
      $db = Database::getInstance();
      $id = intval($id);
      $request = $db->prepare('SELECT * FROM todo WHERE id = :id');
      $request->execute(array('id'=>$id));
      $todo = $request->fetch();

      return new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['created_date'],$todo['overdue'],$todo['completed']);
    }

    // Returns the id of a newly created todo
    public static function create_todo($title, $due_date) {
      $db = Database::getInstance();
      $created_date = Date('Y-m-d');
      $created_date = strval($created_date);
      $due_date = strval($due_date);
      $vals = array(':id'=>NULL, ':title'=>$title, ':due_date'=>$due_date, ':created_date'=>$created_date, ':overdue'=>0, ':completed'=>0);
      $request = $db->prepare("INSERT INTO todo VALUES (:id, :title, :due_date, :created_date, :overdue, :completed)");
      $request->execute($vals);
      $id = $db->lastInsertId();

      return $id;
    }

    // Delete a todo
    public static function delete_todo($id) {
      $db = Database::getInstance();
      $id = intval($id);
      $vals = array('id'=>$id);
      $request = $db->prepare('DELETE FROM todo WHERE id = :id');
      $request->execute($vals);

      return $id;
    }

    // Complete a todo
    public static function completed_todo($id) {
      $db = Database::getInstance();
      $id = intval($id);
      $vals = array('id'=>$id);
      $request = $db->prepare('UPDATE todo SET completed=1 WHERE id = :id');
      $request->execute($vals);

      return $id;
    }

    // Reset a completed todo
    public static function reset_todo($id) {
      $db = Database::getInstance();
      $id = intval($id);
      $vals = array('id'=>$id);
      $request = $db->prepare('UPDATE todo SET completed=0 WHERE id = :id');
      $request->execute($vals);

      return $id;
    }

  }

?>
