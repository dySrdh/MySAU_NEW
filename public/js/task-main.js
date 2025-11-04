// ===========================================
// SCRIPT UTAMA (STATE, SELEKTOR DOM, & INIT)
// ===========================================

// --- Variabel State Global ---
let assignedWorkers = [];
let currentAttachment = null;
let workersInviteStatus = {};
let selectedWorkersForTask = [];
let currentTaskData = {};
let currentEditingTaskId = null;
let isEditingMode = false;
let previousModal = null; 

const priorityOrder = {
    "Sangat Segera": 1,
    "Segera": 2,
    "Biasa": 3
};

// --- Ekspor Fungsi Global (untuk history.js & notification.js) ---
window.setCurrentEditingTaskId = function(taskId) {
    currentEditingTaskId = taskId;
};
// Pastikan fungsi openEditTaskModal ada di file task-modals.js
if (typeof openEditTaskModal === 'function') {
    window.openEditTaskModal = openEditTaskModal;
}
// Pastikan fungsi openTaskDetailModal ada di file task-modals.js
if (typeof openTaskDetailModal === 'function') {
    window.openTaskDetailModal = openTaskDetailModal;
}


// --- Selektor DOM ---
// Tombol & Modal Utama
const newtaskBtn = document.querySelector('.btn-new-task');
const todoListContainer = document.getElementById('todoListContainer');
const todoEmptyState = document.getElementById('todoEmptyState');

// Modal Add Task
const addTaskModalBackdrop = document.getElementById('addTaskModalBackdrop');
const cancelAddTaskModal = document.getElementById('cancelAddTaskModal');
const nextToInviteWorkers = document.getElementById('nextToInviteWorkers');
const createTaskBtn = document.getElementById('createTaskBtn');

// Modal Invite Workers
const inviteWorkersModalBackdrop = document.getElementById('inviteWorkersModalBackdrop');
const cancelInviteWorkersModal = document.getElementById('cancelInviteWorkersModal');
const skipInviteWorkers = document.getElementById('skipInviteWorkers');
const nextFromInviteWorkers = document.getElementById('nextFromInviteWorkers');
const searchWorkersInput = document.getElementById('searchWorkers');
const workerListContainer = document.getElementById('workerListContainer');
const modalAssignedWorkers = document.getElementById('modalAssignedWorkers');

// Modal Status
const successModalBackdrop = document.getElementById('successModalBackdrop');
const doneSuccessModal = document.getElementById('doneSuccessModal');
const failModalBackdrop = document.getElementById('failModalBackdrop');
const retryTaskModal = document.getElementById('retryTaskModal');
const cancelFailModal = document.getElementById('cancelFailModal');

// Modal Detail
const taskDetailModalBackdrop = document.getElementById('taskDetailModalBackdrop');
const closeDetailModal = document.getElementById('closeDetailModal');
const editDetailModal = document.getElementById('editDetailModal');

// Modal Edit
const editTaskModalBackdrop = document.getElementById('editTaskModalBackdrop');
const cancelEditTaskModal = document.getElementById('cancelEditTaskModal');
const saveEditTaskBtn = document.getElementById('saveEditTaskBtn');

// Elemen Form - Add Task
const taskNameInput = document.getElementById('taskName');
const taskDetailsTextarea = document.getElementById('taskDetails');
const taskAttachmentInput = document.getElementById('taskAttachment');
const addAttachmentBtn = document.getElementById('addAttachmentBtn');
const attachmentFileNameSpan = document.getElementById('attachmentFileName');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskDueDateInput = document.getElementById('taskDueDate');
const dateIcon = document.querySelector('.date-icon');
const requiredFields = [taskNameInput, taskDetailsTextarea, taskPrioritySelect, taskDueDateInput].filter(Boolean);

// Elemen Form - Edit Task
const editTaskName = document.getElementById('editTaskName');
const editTaskDetails = document.getElementById('editTaskDetails');
const editTaskPriority = document.getElementById('editTaskPriority');
const editTaskDueDate = document.getElementById('editTaskDueDate');
const editAttachmentSection = document.getElementById('editAttachmentSection');
const editAttachmentFileName = document.getElementById('editAttachmentFileName');
const editRemoveAttachment = document.getElementById('editRemoveAttachment');
const editAssigneesGrid = document.getElementById('editAssigneesGrid');


// ===========================================
// INIT & EVENT LISTENERS UTAMA
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi dari task-storage.js
    if (typeof loadTasksFromStorage === 'function') {
        loadTasksFromStorage();
    } else {
        console.error('Error: loadTasksFromStorage() tidak ditemukan.');
    }

    // Panggil fungsi dari task-utils.js
    if (typeof updateCharCount === 'function') {
        updateCharCount(taskNameInput);
        updateCharCount(taskDetailsTextarea);
    } else {
        console.error('Error: updateCharCount() tidak ditemukan.');
    }
    
    // Ekspor fungsi setelah didefinisikan (jika ada di file lain)
    if (typeof openEditTaskModal === 'function') {
        window.openEditTaskModal = openEditTaskModal;
    }
    if (typeof openTaskDetailModal === 'function') {
        window.openTaskDetailModal = openTaskDetailModal;
    }
});

// --- Listener Form Input (Add Task) ---
if (taskNameInput) {
    taskNameInput.addEventListener('input', () => updateCharCount(taskNameInput));
}
if (taskDetailsTextarea) {
    taskDetailsTextarea.addEventListener('input', () => updateCharCount(taskDetailsTextarea));
}
if (taskDueDateInput) {
    taskDueDateInput.addEventListener('focus', function() {
        this.type = 'date';
        this.placeholder = '';
        if(typeof getTodayString === 'function') this.min = getTodayString();
    });
    taskDueDateInput.addEventListener('blur', function() {
        if (this.value === '') {
            this.type = 'text';
            this.placeholder = 'dd/mm/yyyy';
        }
    });
}
if (dateIcon) {
    dateIcon.addEventListener('click', function() {
        if (taskDueDateInput) {
            taskDueDateInput.type = 'date';
            if(typeof getTodayString === 'function') taskDueDateInput.min = getTodayString();
            taskDueDateInput.focus();
            try {
                taskDueDateInput.showPicker();
            } catch (e) {}
        }
    });
}
if (addAttachmentBtn) {
    addAttachmentBtn.addEventListener('click', () => {
        if (currentAttachment) {
            currentAttachment = null;
            if (attachmentFileNameSpan) attachmentFileNameSpan.textContent = 'Your Attachment';
            addAttachmentBtn.innerHTML = "<i class='bx bx-plus'></i> Add Attachment";
            addAttachmentBtn.classList.remove('btn-danger');
            if (taskAttachmentInput) taskAttachmentInput.value = null;
        } else {
            if (taskAttachmentInput) taskAttachmentInput.click();
        }
    });
}
if (taskAttachmentInput) {
    taskAttachmentInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            currentAttachment = file;
            if (attachmentFileNameSpan) attachmentFileNameSpan.textContent = file.name;
            if (addAttachmentBtn) {
                addAttachmentBtn.innerHTML = "<i class='bx bx-x'></i> Remove";
                addAttachmentBtn.classList.add('btn-danger');
            }
        }
    });
}

// --- Listener Validasi Form ---
requiredFields.forEach(field => {
    if (!field) return;
    
    field.addEventListener('input', () => {
        if (field.value.trim() !== "") {
            field.classList.remove('is-invalid');
        }
        if(typeof updateCreateTaskButtonState === 'function') updateCreateTaskButtonState();
    });
    
    if (field.tagName === 'SELECT' || field.type === 'date') {
        field.addEventListener('change', () => {
            if(typeof updateCreateTaskButtonState === 'function') updateCreateTaskButtonState();
        });
    }
});

// --- Listener Tombol "New Task" ---
if (newtaskBtn) {
    newtaskBtn.addEventListener('click', () => {
        if(typeof resetAddTaskForm === 'function') resetAddTaskForm();
        if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'flex';
        document.body.classList.add('modal-open');
        if(typeof updateCharCount === 'function') {
            updateCharCount(taskNameInput);
            updateCharCount(taskDetailsTextarea);
        }
        if(typeof renderAssignedWorkersAvatars === 'function') renderAssignedWorkersAvatars();
    });
}

// --- Listener Search Workers ---
if (searchWorkersInput) {
    searchWorkersInput.addEventListener('input', (event) => {
        if (typeof ALL_WORKERS_DATA === 'undefined') return;
        
        const searchTerm = event.target.value.toLowerCase();
        const filteredWorkers = ALL_WORKERS_DATA.filter(worker =>
            worker.name.toLowerCase().includes(searchTerm)
        );
        if(typeof renderWorkerList === 'function') renderWorkerList(filteredWorkers);
    });
}

