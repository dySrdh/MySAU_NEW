
function renderWorkerList(workersToRender) {
    if (!workerListContainer) return;
    
    workerListContainer.innerHTML = '';
    workersToRender.forEach(worker => {
        const isInvited = selectedWorkersForTask.some(sw => sw.id === worker.id);
        const workerItem = document.createElement('div');
        workerItem.classList.add('worker-item');
        workerItem.innerHTML = `
            <img src="${worker.avatar_url}" alt="${worker.name}" class="worker-avatar">
            <span>${worker.name}</span>
            <button class="btn-invite" data-worker-id="${worker.id}" ${isInvited ? 'disabled' : ''}>
                ${isInvited ? 'invite sent!' : 'invite'}
            </button>
        `;
        workerListContainer.appendChild(workerItem);
    });
    attachInviteButtonListeners();
}

function attachInviteButtonListeners() {
    document.querySelectorAll('.btn-invite').forEach(button => {
        button.removeEventListener('click', handleInviteButtonClick);
        button.addEventListener('click', handleInviteButtonClick);
    });
}

function handleInviteButtonClick(event) {
    const button = event.target;
    const workerId = parseInt(button.dataset.workerId);
    
    if (typeof ALL_WORKERS_DATA === 'undefined') {
        return;
    }
    
    const worker = ALL_WORKERS_DATA.find(w => w.id === workerId);

    if (!button.disabled && worker) {
        button.textContent = 'invite sent!';
        button.disabled = true;
        selectedWorkersForTask.push(worker);

        if (selectedWorkersForTask.length > 0) {
            if (skipInviteWorkers) skipInviteWorkers.style.display = 'none';
            if (nextFromInviteWorkers) nextFromInviteWorkers.style.display = 'inline-flex';
        }
    }
}

function renderAssignedWorkersAvatars() {
    if (!modalAssignedWorkers) return;
    modalAssignedWorkers.innerHTML = '';

    if (selectedWorkersForTask.length > 0) {
        selectedWorkersForTask.forEach(worker => {
            const avatarImg = document.createElement('img');
            avatarImg.src = worker.avatar_url;
            avatarImg.alt = worker.name;
            avatarImg.classList.add('assigned-worker-avatar');
            modalAssignedWorkers.appendChild(avatarImg);
        });
    }

    const plusButton = document.createElement('div');
    plusButton.classList.add('assigned-worker-plus');
    plusButton.innerHTML = '<i class="bx bx-plus"></i>';
    plusButton.addEventListener('click', function() {
        previousModal = 'add'; 
        if (addTaskModalBackdrop) addTaskModalBackdrop.style.display = 'none';
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'flex';
        resetInviteWorkersForm();
    });
    modalAssignedWorkers.appendChild(plusButton);
    
    updateCreateTaskButtonState();
}

function updateCreateTaskButtonState() {
    if (!createTaskBtn || createTaskBtn.style.display === 'none') return;
    
    const allFieldsFilled = requiredFields.every(field => field && field.value && field.value.trim() !== "");
    const hasInvitedWorkers = selectedWorkersForTask.length > 0;
    
    if (allFieldsFilled && hasInvitedWorkers) {
        createTaskBtn.disabled = false;
        createTaskBtn.style.opacity = '1';
        createTaskBtn.style.cursor = 'pointer';
    } else {
        createTaskBtn.disabled = true;
        createTaskBtn.style.opacity = '0.5';
        createTaskBtn.style.cursor = 'not-allowed';
    }
}

function renderEditAssignees() {
    if (!editAssigneesGrid) return;
    
    editAssigneesGrid.innerHTML = '';
    
    if (selectedWorkersForTask.length > 0) {
        selectedWorkersForTask.forEach((worker, index) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('edit-assignee-wrapper');
            
            const avatarImg = document.createElement('img');
            avatarImg.src = worker.avatar_url;
            avatarImg.alt = worker.name;
            avatarImg.classList.add('edit-assignee-avatar');
            
            const removeBtn = document.createElement('div');
            removeBtn.classList.add('edit-remove-assignee');
            removeBtn.innerHTML = '<i class="bx bx-x"></i>';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeAssignee(index);
            });
            
            wrapper.appendChild(avatarImg);
            wrapper.appendChild(removeBtn);
            editAssigneesGrid.appendChild(wrapper);
        });
    }

    // Add plus button
    const plusButton = document.createElement('button');
    plusButton.classList.add('edit-add-assignee-btn');
    plusButton.innerHTML = '<i class="bx bx-plus"></i>';
    plusButton.type = 'button';
    plusButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        previousModal = 'edit'; 
        if (editTaskModalBackdrop) editTaskModalBackdrop.style.display = 'none';
        if (inviteWorkersModalBackdrop) inviteWorkersModalBackdrop.style.display = 'flex';
        resetInviteWorkersForm();
    });
    editAssigneesGrid.appendChild(plusButton);
}