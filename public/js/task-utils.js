
function formatDateForDisplay(dateString) {
    if (!dateString) return "No Date";
    const [year, month, day] = dateString.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return "Invalid Date";
    }
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function updateCharCount(inputElement) {
    if (!inputElement) return;
    const maxLength = inputElement.maxLength;
    const currentLength = inputElement.value.length;
    const charCountElement = inputElement.parentElement.querySelector('.char-count');
    if (charCountElement) {
        charCountElement.textContent = `${currentLength}/${maxLength}`;
    }
}

function resetAddTaskForm() {
    if (taskNameInput) taskNameInput.value = '';
    if (taskDetailsTextarea) taskDetailsTextarea.value = '';
    if (attachmentFileNameSpan) attachmentFileNameSpan.textContent = 'Your Attachment';
    if (addAttachmentBtn) {
        addAttachmentBtn.innerHTML = "<i class='bx bx-plus'></i> Add Attachment";
        addAttachmentBtn.classList.remove('btn-danger');
    }
    
    if (taskPrioritySelect) taskPrioritySelect.value = "";
    if (taskDueDateInput) {
        taskDueDateInput.value = "";
        taskDueDateInput.type = 'text';
        taskDueDateInput.placeholder = 'dd/mm/yyyy';
        taskDueDateInput.removeAttribute('min');
    }

    currentAttachment = null;
    currentTaskData = {};
    updateCharCount(taskNameInput);
    updateCharCount(taskDetailsTextarea);
    
    selectedWorkersForTask = [];
    if (nextToInviteWorkers) nextToInviteWorkers.style.display = 'inline-flex';
    if (createTaskBtn) createTaskBtn.style.display = 'none';

    requiredFields.forEach(field => {
        if (field) field.classList.remove('is-invalid');
    });
    renderAssignedWorkersAvatars();
}

function resetInviteWorkersForm() {
    if (searchWorkersInput) searchWorkersInput.value = '';
    if (nextFromInviteWorkers) {
        nextFromInviteWorkers.style.display = selectedWorkersForTask.length > 0 ? 'inline-flex' : 'none';
    }
    if (skipInviteWorkers) {
        skipInviteWorkers.style.display = selectedWorkersForTask.length > 0 ? 'none' : 'inline-flex';
    }
    if (typeof ALL_WORKERS_DATA !== 'undefined') {
        renderWorkerList(ALL_WORKERS_DATA);
    }
}