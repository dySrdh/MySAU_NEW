<div class="card todo-card">
    <div class="card-header">
        <div class="card-title-group">
            <h4><i class='bx bxs-check-square'></i> To-Do List</h4>
            <span class="todo-date">
                <?php
                    setlocale(LC_TIME, 'en_US.UTF-8', 'en_US', 'en');
                    echo strftime('%A, %d %B');
                ?>
            </span>
        </div>
        <button class="btn-new-task"><i class='bx bx-plus'></i> New Task</button>
    </div>

    <div class="todo-list-container" id="todoListContainer">
        
        <div class="todo-empty" id="todoEmptyState">
            <img src="<?= base_url('images/todolist.svg') ?>" alt="To-Do Illustration">
            <p>You haven't set up your tasks for today. Let's add a to-do and get started</p>
        </div>

        </div>

    <div class="view-history-link">
        <a href="#" id="viewHistoryLink">View History</a>
    </div>
</div>