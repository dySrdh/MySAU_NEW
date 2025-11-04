
function saveTaskToLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
    
    const newTask = {
        id: new Date().getTime(),
        name: currentTaskData.name,
        details: currentTaskData.details,
        priority: currentTaskData.priority,
        dueDate: currentTaskData.dueDate,
        attachment: currentTaskData.attachmentName, 
        created_on: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        assigned_to: selectedWorkersForTask,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('mySauTasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    if (!todoListContainer) {
        return;
    }
    
    let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
    
    const oldItems = todoListContainer.querySelectorAll('.todo-item');
    oldItems.forEach(item => item.remove());

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const tasksToRender = tasks
        .filter(task => {
            if (!task.name || !task.priority || !task.dueDate) {
                return false;
            }
            if (task.completed) {
                return false;
            }
            const [year, month, day] = task.dueDate.split('-').map(Number);
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                return false;
            }
            const taskDueDate = new Date(year, month - 1, day);
            taskDueDate.setHours(0, 0, 0, 0); 
            if (taskDueDate < today) { 
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            const priorityA = priorityOrder[a.priority] || 99;
            const priorityB = priorityOrder[b.priority] || 99;
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            const [yearA, monthA, dayA] = a.dueDate.split('-').map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA);
            const [yearB, monthB, dayB] = b.dueDate.split('-').map(Number);
            const dateB = new Date(yearB, monthB - 1, dayB);
            return dateA - dateB;
        });

    if (tasksToRender.length === 0) {
        if (todoEmptyState) todoEmptyState.style.display = 'block';
    } else {
        if (todoEmptyState) todoEmptyState.style.display = 'none';

        tasksToRender.forEach((task) => {
            const isCompleted = task.completed || false; 
            const checkIconClass = isCompleted ? 'bxs-check-square' : 'bx-square';
            const checkColor = isCompleted ? '#0d6efd' : '#adb5bd';
            const priorityClass = task.priority.replace(/ /g, '-').toLowerCase();

            const taskItemHTML = `
                <div class="todo-item" data-task-id="${task.id}">
                    <div class="todo-item-header">
                        <h5 class="todo-item-title">${task.name}</h5>
                        <i class='bx ${checkIconClass} todo-checkbox-icon' data-task-id="${task.id}" style="color: ${checkColor};"></i>
                    </div>
                    <div class="todo-item-divider"></div>
                    <div class="todo-item-meta">
                        <span class="todo-item-priority priority-${priorityClass}">${task.priority}</span>
                        <div class="todo-item-date-wrapper">
                            <span class="todo-item-date-label">Created on:</span>
                            <span class="todo-item-date">${task.created_on}</span>
                        </div>
                    </div>
                </div>
            `;
            todoListContainer.insertAdjacentHTML('beforeend', taskItemHTML);
        });
        
        attachCheckboxListeners();
        attachDetailViewListeners(); 
    }
}

function attachCheckboxListeners() {
    const checkboxIcons = document.querySelectorAll('.todo-checkbox-icon');
    checkboxIcons.forEach((icon) => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            const taskId = parseInt(this.dataset.taskId);
            toggleTaskCompletion(taskId);
        });
    });
}

function attachDetailViewListeners() {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('todo-checkbox-icon')) {
                return;
            }
            const taskId = parseInt(this.dataset.taskId);
            openTaskDetailModal(taskId);
        });
    });
}

function toggleTaskCompletion(taskId) {
    let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('mySauTasks', JSON.stringify(tasks));
        loadTasksFromStorage();
    }
}