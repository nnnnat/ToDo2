<?php
  $requestVerb = $_SERVER['REQUEST_METHOD'];

  function call($action) {
    require_once APP.'controllers.php';
    require_once APP.'models.php';
    $controller = new TodoController();
    $controller->{ $action }();
  }

  switch ($requestVerb) {
    case 'GET':
      call('all');
      break;
    case 'POST':
      if ($_POST['id'] === 'null') {

        call('new');
      } else {
        call('update');
      }
      break;
    default:
      call('delete');
      break;
  }
?>
