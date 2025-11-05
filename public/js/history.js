// =========================================
// HISTORY PAGE SCRIPT (SEPARATE PAGE VERSION)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the history page
    if (CURRENT_PAGE !== 'history') return;
    
    console.log('🚀 History module initialized');
    
    // === DOM ELEMENTS ===
    const historyTaskGridScroll = document.getElementById('historyTaskGridScroll');
    const historyTaskGridContainer = document.getElementById('historyTaskGridContainer');
    
    // Modal Filter Bulan
    const monthFilterButton = document.getElementById('monthFilterButton');
    const monthFilterModalBackdrop = document.getElementById('monthFilterModalBackdrop');
    const cancelMonthFilter = document.getElementById('cancelMonthFilter');
    const monthFilterGrid = document.querySelector('.month-filter-grid');
    const monthFilterYear = document.getElementById('monthFilterYear');

    // Modal Detail History
    const historyDetailModalBackdrop = document.getElementById('historyDetailModalBackdrop');
    const closeHistoryDetailModal = document.getElementById('closeHistoryDetailModal');
    const restoreHistoryTaskButton = document.getElementById('restoreHistoryTaskButton');
    
    // Elemen statis di modal detail
    const historyDetailTaskName = document.getElementById('historyDetailTaskName');
    const historyDetailTaskDetails = document.getElementById('historyDetailTaskDetails');
    const historyDetailAssignees = document.getElementById('historyDetailAssignees');

    let currentHistoryTaskId = null;

    // === INITIALIZE ===
    loadHistoryTasks();

    // === EVENT LISTENERS ===
    
    // Return to Dashboard button
    const returnBtn = document.getElementById('returnToMainPageLink');
    if (returnBtn) {
        returnBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.navigateTo('dashboard');
        });
    }
    
    // Month Filter Modal
    if (monthFilterButton) {
        monthFilterButton.addEventListener('click', openMonthFilterModal);
    }
    if (cancelMonthFilter) {
        cancelMonthFilter.addEventListener('click', closeMonthFilterModal);
    }
    if (monthFilterGrid) {
        monthFilterGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('month-item')) {
                const selectedMonth = e.target.dataset.month;
                monthFilterButton.querySelector('span').textContent = selectedMonth;
                closeMonthFilterModal();
                // TODO: Filter tasks by selected month
            }
        });
    }

    // History Detail Modal
    if (closeHistoryDetailModal) {
        closeHistoryDetailModal.addEventListener('click', closeHistoryDetailModalFunc);
    }
    if (restoreHistoryTaskButton) {
        restoreHistoryTaskButton.addEventListener('click', restoreTask);
    }
    
    // Close modals when clicking backdrop
    if (historyDetailModalBackdrop) {
        historyDetailModalBackdrop.addEventListener('click', (e) => {
            if (e.target === historyDetailModalBackdrop) {
                closeHistoryDetailModalFunc();
            }
        });
    }
    
    if (monthFilterModalBackdrop) {
        monthFilterModalBackdrop.addEventListener('click', (e) => {
            if (e.target === monthFilterModalBackdrop) {
                closeMonthFilterModal();
            }
        });
    }

    // === FUNCTIONS ===

    function loadHistoryTasks() {
        console.log('📜 Loading history tasks...');
        
        if (!historyTaskGridContainer) {
            console.warn('⚠️ historyTaskGridContainer not found');
            return;
        }

        let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
        console.log('📦 Total tasks in storage:', tasks.length);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter untuk history: task yang completed ATAU (tidak completed TAPI lewat deadline)
        const historyTasks = tasks.filter(task => {
            if (!task.dueDate) return false;
            
            const taskDueDate = new Date(task.dueDate);
            taskDueDate.setHours(0, 0, 0, 0);
            return task.completed || (taskDueDate < today);
        });

        console.log('📊 History tasks:', historyTasks.length);

        // Urutkan dari yang terbaru
        historyTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        
        // Kelompokkan berdasarkan bulan
        const tasksByMonth = historyTasks.reduce((acc, task) => {
            const monthYear = new Date(task.dueDate).toLocaleString('en-US', { 
                month: 'long', 
                year: 'numeric' 
            });
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(task);
            return acc;
        }, {});

        // Render HTML
        historyTaskGridContainer.innerHTML = '';
        const months = Object.keys(tasksByMonth);

        if (months.length === 0) {
            historyTaskGridContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #6c757d;">
                    <i class='bx bx-history' style="font-size: 64px; opacity: 0.5; margin-bottom: 16px;"></i>
                    <p style="font-size: 16px; margin: 0;">No task history found.</p>
                    <p style="font-size: 14px; margin: 8px 0 0 0; opacity: 0.8;">Complete or pass tasks to see them here.</p>
                </div>
            `;
            return;
        }

        months.forEach(monthYear => {
            const tasksInMonth = tasksByMonth[monthYear];
            
            // Buat container untuk bulan
            const monthGroupDiv = document.createElement('div');
            monthGroupDiv.className = 'history-month-group';
            
            // Buat judul bulan
            const monthTitle = document.createElement('h3');
            monthTitle.textContent = monthYear;
            monthGroupDiv.appendChild(monthTitle);
            
            // Buat grid untuk task cards
            const taskGrid = document.createElement('div');
            taskGrid.className = 'history-task-grid';
            
            tasksInMonth.forEach(task => {
                // Buat card
                const card = document.createElement('div');
                card.className = 'history-task-card';
                card.dataset.taskId = task.id;
                
                // Buat judul task
                const title = document.createElement('h5');
                title.textContent = task.name || 'Untitled Task';
                card.appendChild(title);
                
                // Buat bottom section
                const bottomDiv = document.createElement('div');
                bottomDiv.className = 'history-card-bottom';
                
                // Buat avatars container
                const avatarsDiv = document.createElement('div');
                avatarsDiv.className = 'history-card-avatars';
                
                if (task.assigned_to && task.assigned_to.length > 0) {
                    task.assigned_to.slice(0, 3).forEach(worker => {
                        const img = document.createElement('img');
                        img.src = worker.avatar_url;
                        img.alt = worker.name;
                        avatarsDiv.appendChild(img);
                    });
                    
                    // Show +N if more than 3
                    if (task.assigned_to.length > 3) {
                        const moreSpan = document.createElement('span');
                        moreSpan.className = 'more-avatars';
                        moreSpan.textContent = `+${task.assigned_to.length - 3}`;
                        avatarsDiv.appendChild(moreSpan);
                    }
                }
                
                // Buat date span
                const dateSpan = document.createElement('span');
                dateSpan.className = 'history-card-date';
                dateSpan.innerHTML = `Created on:<br>${task.created_on || 'N/A'}`;
                
                // Gabungkan bottom elements
                bottomDiv.appendChild(avatarsDiv);
                bottomDiv.appendChild(dateSpan);
                card.appendChild(bottomDiv);
                
                // Tambahkan card ke grid
                taskGrid.appendChild(card);
            });
            
            monthGroupDiv.appendChild(taskGrid);
            historyTaskGridContainer.appendChild(monthGroupDiv);
        });

        console.log('✅ History tasks rendered successfully!');
        
        // Pasang listener ke card yang baru dibuat
        attachHistoryCardListeners();
    }

    function attachHistoryCardListeners() {
        document.querySelectorAll('.history-task-card').forEach(card => {
            card.addEventListener('click', () => {
                const taskId = parseInt(card.dataset.taskId);
                console.log('ℹ️ History card clicked! Task ID:', taskId);
                openHistoryDetailModal(taskId);
            });
        });
    }
    
    function openHistoryDetailModal(taskId) {
        let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            console.error('❌ Task not found:', taskId);
            return;
        }

        console.log('📋 Opening history detail for:', task.name);
        currentHistoryTaskId = taskId;

        // Isi data modal
        if (historyDetailTaskName) {
            historyDetailTaskName.textContent = task.name || 'Untitled Task';
        }
        if (historyDetailTaskDetails) {
            historyDetailTaskDetails.textContent = task.details || 'No details provided.';
        }
        
        // Isi Assignees
        if (historyDetailAssignees) {
            historyDetailAssignees.innerHTML = '';
            if (task.assigned_to && task.assigned_to.length > 0) {
                task.assigned_to.forEach(worker => {
                    const assigneeItem = document.createElement('div');
                    assigneeItem.className = 'history-assignee-item';
                    
                    const img = document.createElement('img');
                    img.src = worker.avatar_url;
                    img.alt = worker.name;
                    
                    const span = document.createElement('span');
                    span.textContent = worker.name;
                    
                    assigneeItem.appendChild(img);
                    assigneeItem.appendChild(span);
                    historyDetailAssignees.appendChild(assigneeItem);
                });
            } else {
                historyDetailAssignees.innerHTML = '<p style="font-size: 0.9rem; color: #777;">No assignees.</p>';
            }
        }

        if (historyDetailModalBackdrop) {
            historyDetailModalBackdrop.style.display = 'flex';
        }
        document.body.classList.add('modal-open');
    }

    function closeHistoryDetailModalFunc() {
        if (historyDetailModalBackdrop) {
            historyDetailModalBackdrop.style.display = 'none';
        }
        document.body.classList.remove('modal-open');
        currentHistoryTaskId = null;
    }

    function restoreTask() {
        if (!currentHistoryTaskId) {
            console.warn('⚠️ No task selected for restore');
            return;
        }

        console.log('🔄 Restoring task:', currentHistoryTaskId);

        let tasks = JSON.parse(localStorage.getItem('mySauTasks')) || [];
        const taskIndex = tasks.findIndex(t => t.id === currentHistoryTaskId);

        if (taskIndex > -1) {
            // 1. Un-complete task
            tasks[taskIndex].completed = false;

            // 2. Buat due date baru (7 hari dari sekarang)
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const year = nextWeek.getFullYear();
            const month = String(nextWeek.getMonth() + 1).padStart(2, '0');
            const day = String(nextWeek.getDate()).padStart(2, '0');
            tasks[taskIndex].dueDate = `${year}-${month}-${day}`;

            // 3. Simpan ke localStorage
            localStorage.setItem('mySauTasks', JSON.stringify(tasks));
            console.log('✅ Task restored successfully!');

            // 4. Tutup modal history
            closeHistoryDetailModalFunc();

            // 5. Navigate back to dashboard
            alert('Task has been restored! Due date set to 7 days from now. You can edit it from the dashboard.');
            window.navigateTo('dashboard');
        } else {
            console.error('❌ Task not found in storage');
        }
    }

    function openMonthFilterModal() {
        const currentYear = new Date().getFullYear();
        if (monthFilterYear) {
            monthFilterYear.textContent = currentYear;
        }
        if (monthFilterModalBackdrop) {
            monthFilterModalBackdrop.style.display = 'flex';
        }
        document.body.classList.add('modal-open');
    }

    function closeMonthFilterModal() {
        if (monthFilterModalBackdrop) {
            monthFilterModalBackdrop.style.display = 'none';
        }
        document.body.classList.remove('modal-open');
    }
});