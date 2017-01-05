<?php
  $requestVerb = $_SERVER['REQUEST_METHOD'];
  
  function call($action) {
    require_once APP.'controllers.php';
    require_once APP.'models.php';
    $controller = new TodoController();
    $controller->{ $action }();
  }

  if ($requestVerb === 'GET') {
    call('all');
  } elseif ($requestVerb === 'POST') {
    if ($_POST['id'] === 'null') {
      call('new');
    } else {
      call('update');
    }
  } else {
    call('delete');
  }

?>
