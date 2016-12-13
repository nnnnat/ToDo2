<?php

  function call($action) {
    require_once APP.'controllers.php';
    require_once APP.'models.php';
    $controller = new TodoController();
    $controller->{ $action }();
  }

  // controller actions
  $controllers = array('todo' => ['all', 'completed', 'create', 'delete', 'done', 'edit', 'get', 'index', 'overdue', 'reset', 'upcoming']);

  if (in_array($action, $controllers['todo'])) {
    call($action);
  } else {
    call('error');
  }

?>
