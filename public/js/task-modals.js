// ===========================================
// FUNGSI MODAL (ALUR & LOGIKA)
// ===========================================

// --- Modal Detail Task ---
function openTaskDetailModal(taskId) {
    if (!taskDetailModalBackdrop) {
        // Fallback jika modal tidak ada
        let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            alert(`Task: ${task.name}\nDetails: ${task.details}\nPriority: ${task.priority}\nDue: ${formatDateForDisplay(task.dueDate)}`);
        }
        return;
    }

    let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        // Jika task tidak ditemukan (mungkin karena ID palsu dari notifikasi)
        // Kita bisa tampilkan pesan error atau modal error
        console.error('Task not found for detail view:', taskId);
        alert(`Task dengan ID ${taskId} tidak ditemukan.`);
        return;
    }

    currentEditingTaskId = taskId;

    const detailName = document.getElementById('detailTaskName');
    const detailTag = document.getElementById('detailTaskPriorityTag');
    const detailDueDate = document.getElementById('detailTaskDueDate');
    const detailDetails = document.getElementById('detailTaskDetails');
    const detailAttachmentWrapper = document.getElementById('detailTaskAttachmentWrapper');
    const detailAttachmentName = document.getElementById('detailTaskAttachmentName');
    const detailAssignees = document.getElementById('detailTaskAssignees');

    if (detailName) detailName.textContent = task.name || 'Unnamed Task';
    if (detailDueDate) detailDueDate.textContent = formatDateForDisplay(task.dueDate);
    if (detailDetails) detailDetails.textContent = task.details || 'No details provided.';

    if (detailTag && task.priority) {
        const priorityClass = task.priority.replace(/ /g, '-').toLowerCase();
        detailTag.textContent = task.priority;
        detailTag.className = 'detail-priority-tag'; 
        detailTag.classList.add(`priority-${priorityClass}`);
    }

    if (detailAttachmentWrapper) {
        if (task.attachment) {
            detailAttachmentWrapper.style.display = 'block';
            if (detailAttachmentName) detailAttachmentName.textContent = task.attachment;
        } else {
            detailAttachmentWrapper.style.display = 'none';
        }
    }

    if (detailAssignees) {
        detailAssignees.innerHTML = '';
        if (task.assigned_to && task.assigned_to.length > 0) {
            task.assigned_to.forEach(worker => {
                const assigneeHTML = `
                    <div class="detail-assignee-item">
                        <img src="${worker.avatar_url}" alt="${worker.name}">
                        <span>${worker.name}</span>
                    </div>
                `;
                detailAssignees.innerHTML += assigneeHTML;
            });
        } else {
            detailAssignees.innerHTML = '<p class="detail-value" style="color: #777; font-style: italic;">No workers assigned to this task.</p>';
        }
    }

    taskDetailModalBackdrop.style.display = 'flex';
    document.body.classList.add('modal-open');
}

if (closeDetailModal) {
    closeDetailModal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (taskDetailModalBackdrop) taskDetailModalBackdrop.style.display = 'none';
        document.body.classList.remove('modal-open');
        currentEditingTaskId = null;
        isEditingMode = false;
    });
}

if (editDetailModal) {
    editDetailModal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openEditTaskModal();
    });
}

// --- Modal Edit Task ---
function openEditTaskModal() {
    if (!editTaskModalBackdrop || !currentEditingTaskId) {
        return;
    }

    let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
    const task = tasks.find(t => t.id === currentEditingTaskId);
    if (!task) {
        return;
    }

    isEditingMode = true;

    if (editTaskName) editTaskName.value = task.name || '';
    if (editTaskDetails) editTaskDetails.value = task.details || '';
    if (editTaskPriority) editTaskPriority.value = task.priority || '';
    if (editTaskDueDate) {
        editTaskDueDate.value = task.dueDate || '';
        editTaskDueDate.min = getTodayString();
    }

    if (editAttachmentSection) {
        if (task.attachment) {
            editAttachmentSection.style.display = 'block';
            if (editAttachmentFileName) editAttachmentFileName.textContent = task.attachment;
            currentAttachment = { name: task.attachment };
        } else {
            editAttachmentSection.style.display = 'none';
            currentAttachment = null;
        }
    }

    selectedWorkersForTask = task.assigned_to ? [...task.assigned_to] : [];
    renderEditAssignees();

    if (taskDetailModalBackdrop) taskDetailModalBackdrop.style.display = 'none';
    editTaskModalBackdrop.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function removeAssignee(index) {
    selectedWorkersForTask.splice(index, 1);
    renderEditAssignees();
    
    if (typeof ALL_WORKERS_DATA !== 'undefined') {
        renderWorkerList(ALL_WORKERS_DATA);
    }
}

function saveEditedTask() {
    if (!editTaskName || !editTaskName.value.trim()) {
        alert('Please fill task name!');
        if (editTaskName) editTaskName.focus();
        return;
    }
    if (!editTaskDetails || !editTaskDetails.value.trim()) {
        alert('Please fill task details!');
        if (editTaskDetails) editTaskDetails.focus();
        return;
    }
    if (!editTaskPriority || !editTaskPriority.value) {
        alert('Please select task priority!');
        return;
    }
    if (!editTaskDueDate || !editTaskDueDate.value) {
        alert('Please select due date!');
        return;
    }
    if (selectedWorkersForTask.length === 0) {
        alert('Please assign at least one worker!');
        return;
    }

    if (saveEditTaskBtn) {
        saveEditTaskBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Saving...";
        saveEditTaskBtn.disabled = true;
    }

    setTimeout(() => {
        try {
            let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
            const taskIndex = tasks.findIndex(t => t.id === currentEditingTaskId);

            if (taskIndex !== -1) {
                tasks[taskIndex].name = editTaskName.value.trim();
                tasks[taskIndex].details = editTaskDetails.value.trim();
                tasks[taskIndex].priority = editTaskPriority.value;
                tasks[taskIndex].dueDate = editTaskDueDate.value;
                tasks[taskIndex].attachment = currentAttachment ? currentAttachment.name : null;
                tasks[taskIndex].assigned_to = [...selectedWorkersForTask];
                
                localStorage.setItem('mySauTasks', JSON.stringify(tasks));

                if (saveEditTaskBtn) {
                    saveEditTaskBtn.innerHTML = "<i class='bx bx-check'></i> Save";
                    saveEditTaskBtn.disabled = false;
                }

                const successIllustration = document.getElementById('successIllustration');
                if (successIllustration && typeof BASE_URL !== 'undefined') {
                    successIllustration.src = `${BASE_URL}images/success-illustration.png`;
                }
                
                if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'none';
                if (successModalBackdrop) {
                    successModalBackdrop.style.display = 'flex';
                    const successMsg = successModalBackdrop.querySelector('p');
                    if (successMsg) successMsg.textContent = 'Your task has been updated successfully.';
                }
                
                currentEditingTaskId = null;
                isEditingMode = false;
                
            } else {
                throw new Error('Task not found');
            }
        } catch (error) {
            if (saveEditTaskBtn) {
                saveEditTaskBtn.innerHTML = "<i class='bx bx-check'></i> Save";
                saveEditTaskBtn.disabled = false;
            }
            const failIllustration = document.getElementById('failIllustration');
            if (failIllustration && typeof BASE_URL !== 'undefined') {
                failIllustration.src = `${BASE_URL}images/fail-illustration.png`;
            }
            if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'none';
            if (failModalBackdrop) failModalBackdrop.style.display = 'flex';
        }
    }, 1500);
}

if (cancelEditTaskModal) {
    cancelEditTaskModal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'none';
        if (taskDetailModalBackdrop) taskDetailModalBackdrop.style.display = 'flex';
        isEditingMode = false;
    });
}

if (saveEditTaskBtn) {
    saveEditTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        saveEditedTask();
    });
}

if (editRemoveAttachment) {
    editRemoveAttachment.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentAttachment = null;
        if (editAttachmentSection) editAttachmentSection.style.display = 'none';
    });
}

// --- Alur Modal Navigasi (Add/Invite) ---
if (cancelAddTaskModal) {
    cancelAddTaskModal.addEventListener('click', () => {
        if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

if (nextToInviteWorkers) {
    nextToInviteWorkers.addEventListener('click', () => {
        let isValid = true;
        requiredFields.forEach(field => {
            if (field) field.classList.remove('is-invalid');
        });

        requiredFields.forEach(field => {
            if (!field || !field.value || field.value.trim() === "") {
                if (field) field.classList.add('is-invalid');
                isValid = false;
            }
        });

        if (taskDueDateInput && taskDueDateInput.value) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const [year, month, day] = taskDueDateInput.value.split('-').map(Number);
            
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                taskDueDateInput.classList.add('is-invalid');
                isValid = false;
            } else {
                const selectedDate = new Date(year, month - 1, day);
                selectedDate.setHours(0, 0, 0, 0); 
                if (selectedDate < today) {
                    taskDueDateInput.classList.add('is-invalid');
                    isValid = false;
                }
            }
        }

        if (!isValid) {
            return; 
        }

        currentTaskData = {
            name: taskNameInput ? taskNameInput.value.trim() : '',
            details: taskDetailsTextarea ? taskDetailsTextarea.value.trim() : '',
            priority: taskPrioritySelect ? taskPrioritySelect.value : '',
            dueDate: taskDueDateInput ? taskDueDateInput.value : '',
            attachmentName: currentAttachment ? currentAttachment.name : null
        };

        previousModal = 'add'; 
        if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'none';
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'flex';
        resetInviteWorkersForm();
        if (typeof ALL_WORKERS_DATA !== 'undefined') {
            renderWorkerList(ALL_WORKERS_DATA);
        }
    });
}

if (cancelInviteWorkersModal) {
    cancelInviteWorkersModal.addEventListener('click', () => {
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'none';
        
        if (previousModal === 'edit') {
            if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'flex';
            renderEditAssignees();
        } else {
            if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'flex';
            renderAssignedWorkersAvatars();
        }
        document.body.classList.add('modal-open');
    });
}

if (skipInviteWorkers) {
    skipInviteWorkers.addEventListener('click', () => {
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'none';
        if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'flex';
        if (nextToInviteWorkers) nextToInviteWorkers.style.display = 'none';
        if (createTaskBtn) createTaskBtn.style.display = 'inline-flex';
        selectedWorkersForTask = [];
        renderAssignedWorkersAvatars();
    });
}

if (nextFromInviteWorkers) {
    nextFromInviteWorkers.addEventListener('click', () => {
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'none';
        
        if (previousModal === 'edit') {
            if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'flex';
            renderEditAssignees();
        } else {
            if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'flex';
            if (nextToInviteWorkers) nextToInviteWorkers.style.display = 'none';
            if (createTaskBtn) createTaskBtn.style.display = 'inline-flex';
            renderAssignedWorkersAvatars();
            updateCreateTaskButtonState();
        }
    });
}

// --- Alur Modal Create Task (Submit) ---
async function simulateApiCall() {
    if (!createTaskBtn) return true;
    
    createTaskBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Creating...";
    createTaskBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 2000));
    const isSuccess = Math.random() > 0.3;
    
    createTaskBtn.innerHTML = "<i class='bx bx-plus'></i> Create Task";
    createTaskBtn.disabled = false;
    
    return isSuccess;
}

if (createTaskBtn) {
    createTaskBtn.addEventListener('click', async () => {
        const allFieldsFilled = requiredFields.every(field => field && field.value && field.value.trim() !== "");
        const hasInvitedWorkers = selectedWorkersForTask.length > 0;
        
        if (!allFieldsFilled || !hasInvitedWorkers) {
            alert('Please fill all required fields and invite at least one worker!');
            return;
        }
        
        const isSuccess = await simulateApiCall();

        if (isSuccess) {
            saveTaskToLocalStorage();
            const successIllustration = document.getElementById('successIllustration');
            if (successIllustration && typeof BASE_URL !== 'undefined') {
                successIllustration.src = `${BASE_URL}images/success-illustration.png`;
            }
            if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'none';
            if (successModalBackdrop) successModalBackdrop.style.display = 'flex';
        } else {
            const failIllustration = document.getElementById('failIllustration');
            if (failIllustration && typeof BASE_URL !== 'undefined') {
                failIllustration.src = `${BASE_URL}images/fail-illustration.png`;
            }
            if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'none';
            if (failModalBackdrop) failModalBackdrop.style.display = 'flex';
        }
        document.body.classList.add('modal-open');
    });
}

// --- Alur Modal Status (Success/Fail) ---
if (doneSuccessModal) {
    doneSuccessModal.addEventListener('click', () => {
        if (successModalBackdrop) {
            successModalBackdrop.style.display = 'none';
            const successMsg = successModalBackdrop.querySelector('p');
            if (successMsg) successMsg.textContent = 'Your new task has been created successfully.';
        }
        document.body.classList.remove('modal-open');
        loadTasksFromStorage();
        resetAddTaskForm();
    });
}

if (retryTaskModal) {
    retryTaskModal.addEventListener('click', () => {
        if (failModalBackdrop) failModalBackdrop.style.display = 'none';
        
        if (previousModal === 'edit') {
            if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'flex';
            renderEditAssignees();
        } else {
            if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'flex';
            renderAssignedWorkersAvatars();
            updateCreateTaskButtonState();
        }
    });
}

if (cancelFailModal) {
    cancelFailModal.addEventListener('click', () => {
        if (failModalBackdrop) failModalBackdrop.style.display = 'none';
        document.body.classList.remove('modal-open');
        resetAddTaskForm();
    });
}


// ==============================================================
// PERBAIKAN KLIK: Ekspor fungsi agar bisa diakses global
// ==============================================================
window.openTaskDetailModal = openTaskDetailModal;
window.openEditTaskModal = openEditTaskModal;
