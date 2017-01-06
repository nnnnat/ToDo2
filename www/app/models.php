<?php

  class Todo
  {

    // Todo Variables
    public $id;
    public $title;
    public $due_date;
    public $completed;

    // Todo constructer
    function __construct($id, $title, $due_date, $completed) {
      $this->id = $id;
      $this->title = $title;
      $this->due_date = date('M j, Y', strtotime($due_date));
      $this->completed = ($completed == 0 ? false : true);
    }

    public static function all() {
      $todo_list = [];
      $db = Database::getInstance();
      $request = $db->query('SELECT * FROM todo ORDER BY due_date DESC');
      foreach ($request->fetchAll() as $todo) {
        $todo_list[] = new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['completed']);
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

      return new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['completed']);
    }

    // Returns the id of a newly created todo
    public static function new_todo($title, $due_date) {
      $db = Database::getInstance();
      $due_date = strval($due_date);
      $vals = array(':id'=>NULL, ':title'=>$title, ':due_date'=>$due_date, ':completed'=>0);
      $request = $db->prepare("INSERT INTO todo VALUES (:id, :title, :due_date, :completed)");
      $request->execute($vals);
      $id = $db->lastInsertId();

      return $id;
    }

    // Returns the id of an updated todo
    public static function update_todo($id, $title, $due_date, $completed) {
      $db = Database::getInstance();
      $id = intval($id);
      $due_date = strval($due_date);
      $completed = intval($completed);
      $vals = array('id'=>$id, 'title'=>$title, 'due_date'=>$due_date, 'completed'=>$completed);
      $request = $db->prepare('UPDATE todo SET title=:title, due_date=:due_date, completed=:completed WHERE id = :id');
      $request->execute($vals);

      return $id;
    }

    // Returns the id of a deleted todo
    public static function delete_todo($id) {
      $db = Database::getInstance();
      $id = intval($id);
      $vals = array('id'=>$id);
      $request = $db->prepare('DELETE FROM todo WHERE id = :id');
      $request->execute($vals);

      return $id;
    }

  }

?>
