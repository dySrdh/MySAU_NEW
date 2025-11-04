/* File: public/js/calendar.js */

// Dummy Events Data
const calendarEvents = {
    // November 2025 (Current Month)
    '2025-11-03': [
        {
            type: 'birthday',
            user: {
                name: 'Karina',
                photo: 'https://i.pravatar.cc/150?img=5'
            },
            title: 'Karina hari ini berulang tahun!'
        },
        {
            type: 'meeting',
            time: '10:00 AM',
            title: 'Team Sprint Planning Meeting'
        },
        {
            type: 'meeting',
            time: '02:00 PM',
            title: 'Client Presentation - Q4 Review'
        },
        {
            type: 'meeting',
            time: '04:30 PM',
            title: 'Department Sync Meeting'
        }
    ],
    '2025-11-10': [
        {
            type: 'meeting',
            time: '02:00 PM',
            title: 'Product Demo Presentation'
        }
    ],
    '2025-11-15': [
        {
            type: 'birthday',
            user: {
                name: 'Winter',
                photo: 'https://i.pravatar.cc/150?img=9'
            },
            title: 'Winter hari ini berulang tahun!'
        }
    ],
    '2025-11-20': [
        {
            type: 'meeting',
            time: '09:00 AM',
            title: 'Client Meeting - Project Review'
        }
    ],
    '2025-11-25': [
        {
            type: 'birthday',
            user: {
                name: 'Giselle',
                photo: 'https://i.pravatar.cc/150?img=10'
            },
            title: 'Giselle hari ini berulang tahun!'
        },
        {
            type: 'meeting',
            time: '03:00 PM',
            title: 'Quarterly Business Review'
        }
    ],
    // December 2025
    '2025-12-05': [
        {
            type: 'meeting',
            time: '11:00 AM',
            title: 'Year-End Planning Session'
        }
    ],
    '2025-12-25': [
        {
            type: 'meeting',
            time: '10:00 AM',
            title: 'Christmas Celebration Event'
        }
    ],
    // June 2023
    '2023-06-09': [
        {
            type: 'birthday',
            user: {
                name: 'Karina',
                photo: 'https://i.pravatar.cc/150?img=5'
            },
            title: 'Karina hari ini berulang tahun!'
        },
        {
            type: 'meeting',
            time: '10:00 AM',
            title: 'Acara Pembukaan Launching Aplikasi via Zoom'
        }
    ],
    '2023-06-25': [
        {
            type: 'meeting',
            time: '02:00 PM',
            title: 'Team Meeting - Sprint Planning'
        }
    ]
};

// Calendar State
let currentDate = new Date();
let selectedDate = null;

// Month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar initializing...');
    
    // Set to current date
    currentDate = new Date();
    
    renderCalendar();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prevMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Month/Year click to open modal
    document.getElementById('calendarMonthYear').addEventListener('click', function(event) {
        const text = this.textContent.trim();
        const parts = text.split(' ');
        
        if (parts.length === 2) {
            // Detect if clicked on month or year
            const clickX = event.offsetX;
            const elementWidth = this.offsetWidth;
            
            if (clickX < elementWidth / 2) {
                openMonthModal();
            } else {
                openYearModal();
            }
        }
    });

    // Month modal
    document.getElementById('closeMonthModal').addEventListener('click', closeMonthModal);
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const month = parseInt(this.getAttribute('data-month'));
            currentDate.setMonth(month);
            renderCalendar();
            closeMonthModal();
        });
    });

    // Year modal
    document.getElementById('closeYearModal').addEventListener('click', closeYearModal);
    
    // Close modal when clicking outside
    document.getElementById('monthSelectModal').addEventListener('click', function(e) {
        if (e.target === this) closeMonthModal();
    });
    
    document.getElementById('yearSelectModal').addEventListener('click', function(e) {
        if (e.target === this) closeYearModal();
    });
}

// Render Calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    console.log('Rendering calendar for:', monthNames[month], year);
    
    // Update header
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
    
    // Clear calendar
    const container = document.getElementById('calendarDaysContainer');
    if (!container) {
        console.error('Calendar container not found!');
        return;
    }
    container.innerHTML = '';
    
    // Add empty cells for days before month starts
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day day-off';
        emptyDay.textContent = prevMonthDays - startDayOfWeek + i + 1;
        container.appendChild(emptyDay);
    }
    
    // Get today's date for comparison
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if today
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('day-active');
            selectedDate = dateString;
            // Show today's events after calendar is rendered
            setTimeout(() => showEvents(dateString), 0);
        }
        
        // Check if has events
        if (calendarEvents[dateString]) {
            const events = calendarEvents[dateString];
            if (events.some(e => e.type === 'birthday')) {
                dayElement.classList.add('has-birthday');
            }
            if (events.some(e => e.type === 'meeting')) {
                dayElement.classList.add('has-event');
            }
        }
        
        // Click event
        dayElement.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('day-active'));
            this.classList.add('day-active');
            selectedDate = dateString;
            showEvents(dateString);
        });
        
        container.appendChild(dayElement);
    }
    
    // Add days from next month to complete the grid
    const totalCells = startDayOfWeek + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    
    for (let i = 1; i <= remainingCells; i++) {
        const nextMonthDay = document.createElement('div');
        nextMonthDay.className = 'calendar-day day-off';
        nextMonthDay.textContent = i;
        container.appendChild(nextMonthDay);
    }
    
    console.log('Calendar rendered successfully with', daysInMonth, 'days');
}

// Show Events
function showEvents(dateString) {
    const eventDetails = document.getElementById('calendarEventDetails');
    const events = calendarEvents[dateString];
    
    if (!events || events.length === 0) {
        eventDetails.classList.remove('show');
        return;
    }
    
    let html = '';
    events.forEach(event => {
        if (event.type === 'birthday') {
            html += `
                <div class="calendar-event-item">
                    <img src="${event.user.photo}" alt="${event.user.name}">
                    <div class="calendar-event-content">
                        <p class="calendar-event-title">${event.title}</p>
                    </div>
                </div>
            `;
        } else if (event.type === 'meeting') {
            html += `
                <div class="calendar-event-item">
                    <div class="calendar-event-content">
                        <div class="calendar-event-time">${event.time}</div>
                        <p class="calendar-event-title">${event.title}</p>
                    </div>
                </div>
            `;
        }
    });
    
    eventDetails.innerHTML = html;
    eventDetails.classList.add('show');
}

// Modal Functions
function openMonthModal() {
    const modal = document.getElementById('monthSelectModal');
    modal.style.display = 'flex';
    
    // Highlight current month
    document.querySelectorAll('.month-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-month')) === currentDate.getMonth()) {
            btn.classList.add('active');
        }
    });
}

function closeMonthModal() {
    document.getElementById('monthSelectModal').style.display = 'none';
}

function openYearModal() {
    const modal = document.getElementById('yearSelectModal');
    const container = document.getElementById('yearGridContainer');
    
    // Generate years (current year ± 10 years)
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    
    container.innerHTML = '';
    for (let year = startYear; year <= endYear; year++) {
        const yearBtn = document.createElement('button');
        yearBtn.className = 'year-btn';
        yearBtn.textContent = year;
        if (year === currentYear) {
            yearBtn.classList.add('active');
        }
        yearBtn.addEventListener('click', function() {
            currentDate.setFullYear(year);
            renderCalendar();
            closeYearModal();
        });
        container.appendChild(yearBtn);
    }
    
    modal.style.display = 'flex';
}

function closeYearModal() {
    document.getElementById('yearSelectModal').style.display = 'none';
}