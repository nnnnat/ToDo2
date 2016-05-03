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

    // Todo's fun fun functions !!!
    public static function get_upcoming() {
      $todo_list = [];
      $db = Database::getInstance();
      $request = $db->query('SELECT * FROM todo WHERE completed = 0 ORDER BY due_date ASC LIMIT 6');

      foreach ($request->fetchAll() as $todo) {
        $todo_list[] = new Todo($todo['id'],$todo['title'],$todo['due_date'],$todo['created_date'],$todo['overdue'],$todo['completed']);
      }

      return $todo_list;
    }

  }

?>
