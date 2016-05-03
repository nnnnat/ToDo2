<?php

  function call($action) {
    require_once APP.'controllers.php';
    require_once APP.'models.php';
    $controller = new TodoController();
    $controller->{ $action }();
  }

  // controller actions
  $controllers = array('todo' => ['completed', 'create', 'delete', 'done', 'get', 'index', 'overdue', 'reset', 'upcoming', 'update']);

  if (in_array($action, $controllers['todo'])) {
    call($action);
  } else {
    call('error');
  }

?>
