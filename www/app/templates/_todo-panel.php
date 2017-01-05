<section class="todo-panel" aria-hidden="true" >

  <form class="todo-panel-form" id="todo-panel-form" tabindex="-1" aria-label="Todo Form">
    <input type="hidden" name="id" value="">
    <label for="todo-title">
      ToDo:
    </label>
    <div class="message message--urgent"><p>You forgot the title!</p></div>
    <input type="text" name="title" id="todo-title">

    <fieldset>
      <legend>Due Date:</legend>
      <div class="message message--urgent"><p>Due dates must be in the future!</p></div>
      <div class="todo-panel-due-date" id="todo-due-date">

        <label for="todo-due-month">
          <span class="text">Month</span>
          <select name="month" id="todo-due-month">
            <?php
              $months = array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
              foreach ($months as $i => $month) {
                  echo "<option value=\"".($i < 9 ? '0' : '').($i + 1)."\">" . $month . "</option>";
              }
            ?>
          </select>
        </label>

        <label for="todo-due-day">
          <span class="text">Day</span>
          <select name="day" id="todo-due-day">
            <?php
              for ($i=1; $i <= 31; $i++) {
                echo "<option value=\"".($i < 10 ? '0' : '').$i."\">" . $i . "</option>";
              }
            ?>
          </select>
        </label>

        <label for="todo-due-year">
          <span class="text">Year</span>
          <select name="year" id="todo-due-year">
            <?php
              $years = range ( date( 'Y' ), date( 'Y') + 10 );
              foreach ( $years as $year ) {
                echo "<option value=\"" . $year . "\">" . $year . "</option>";
              }
            ?>
          </select>
        </label>
      </div>

    </fieldset>

    <div class="button-group todo-panel-block">
      <button class="button button--primary invert" data-panel-submit role="submit">Add</button>
      <button class="button button--primary invert" data-panel-cancel>Cancel</button>
    </div>

  </form>

</section>
