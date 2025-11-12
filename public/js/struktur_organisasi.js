document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    if (typeof d3 === 'undefined' || typeof d3.OrgChart === 'undefined') {
        console.error('D3.js atau D3-OrgChart gagal dimuat.');
        return;
    }

    let chart;
    let allOrgData = [];
    let allEmployeesData = [];
    let searchedPersonId = null;

    // ==============================================
    //       DATA STRUKTUR ORGANISASI (PT/DIVISI)
    // ==============================================
    const organizationData = [
        { id: 'hq', parentId: '', name: 'Kantor Pusat', type: 'HQ' },
        { id: 'pt_teknologi', parentId: 'hq', name: 'PT Teknologi Digital', type: 'PT' },
        { id: 'pt_logistik', parentId: 'hq', name: 'PT Logistik Nusantara', type: 'PT' },
        { id: 'pt_finance', parentId: 'hq', name: 'PT Finance Solutions', type: 'PT' },
        { id: 'div_software', parentId: 'pt_teknologi', name: 'Divisi Software Development', type: 'DIV' },
        { id: 'div_infra', parentId: 'pt_teknologi', name: 'Divisi Infrastructure', type: 'DIV' },
        { id: 'div_warehouse', parentId: 'pt_logistik', name: 'Divisi Warehouse', type: 'DIV' },
        { id: 'div_transport', parentId: 'pt_logistik', name: 'Divisi Transport', type: 'DIV' },
        { id: 'dept_frontend', parentId: 'div_software', name: 'Dept. Frontend', type: 'DEPT' },
        { id: 'dept_backend', parentId: 'div_software', name: 'Dept. Backend', type: 'DEPT' },
    ];

    // ==============================================
    //       DATA KARYAWAN PER ORGANISASI
    // ==============================================
    const employeesData = [
        { pernr: '10001', name: 'Evita Meiliani', position: 'CEO', orgId: 'hq' },
        { pernr: '10002', name: 'Hadi Hidayat', position: 'CFO', orgId: 'hq' },
        { pernr: '20001', name: 'Muhammad Septian', position: 'Director', orgId: 'pt_teknologi' },
        { pernr: '20002', name: 'Retno Listyowati', position: 'HR Manager', orgId: 'pt_teknologi' },
        { pernr: '30001', name: 'Brain Mochtar W.', position: 'Director', orgId: 'pt_logistik' },
        { pernr: '30002', name: 'Agus Salim S', position: 'Operations Manager', orgId: 'pt_logistik' },
        { pernr: '40001', name: 'Anggy Prasetyo U.', position: 'Director', orgId: 'pt_finance' },
        { pernr: '40002', name: 'Aisah Putri S.', position: 'Accounting Manager', orgId: 'pt_finance' },
        { pernr: '21001', name: 'Aditya Purnama', position: 'Head of Development', orgId: 'div_software' },
        { pernr: '21002', name: 'Ryan Dzul Fatah', position: 'Lead Developer', orgId: 'div_software' },
        { pernr: '21003', name: 'Galang Satya Y.', position: 'Senior Developer', orgId: 'div_software' },
        { pernr: '22001', name: 'Hilmi LuAlghia', position: 'Head of Infrastructure', orgId: 'div_infra' },
        { pernr: '22002', name: 'Muhammad Farhan F.', position: 'System Administrator', orgId: 'div_infra' },
        { pernr: '31001', name: 'Andrian Pranata', position: 'Warehouse Manager', orgId: 'div_warehouse' },
        { pernr: '31002', name: 'Staff Warehouse 1', position: 'Staff', orgId: 'div_warehouse' },
        { pernr: '21101', name: 'Staff Frontend 1', position: 'Frontend Developer', orgId: 'dept_frontend' },
        { pernr: '21102', name: 'Staff Frontend 2', position: 'Frontend Developer', orgId: 'dept_frontend' },
        { pernr: '21201', name: 'Staff Backend 1', position: 'Backend Developer', orgId: 'dept_backend' },
        { pernr: '21202', name: 'Staff Backend 2', position: 'Backend Developer', orgId: 'dept_backend' },
    ];

    allOrgData = organizationData;
    allEmployeesData = employeesData;

    // ==============================================
    //       HELPER FUNCTION
    // ==============================================
    function getDescendants(parentId, allData) {
        let descendants = [];
        const children = allData.filter(node => node.parentId === parentId);
        
        for (const child of children) {
            descendants.push(child);
            descendants = descendants.concat(getDescendants(child.id, allData));
        }
        return descendants;
    }

    // ==============================================
    //       FUNGSI BARU: TAMPILKAN PARENT
    // ==============================================
    window.showParentChart = function(parentId, highlightChildId) {
        const parentNode = allOrgData.find(n => n.id === parentId);
        if (!parentNode) return;

        const parentAsRoot = { ...parentNode, parentId: '' };
        const parentDescendants = getDescendants(parentId, allOrgData);
        const dataToShow = [parentAsRoot, ...parentDescendants];

        initChart(dataToShow, highlightChildId, true);
    }


    // ==============================================
    //         INISIALISASI CHART (FIXED)
    // ==============================================
    function initChart(dataToShow, highlightNodeId = null, isSearchResult = false) {
        const container = document.getElementById('d3-chart-container');
        container.innerHTML = '';
        
        chart = new d3.OrgChart()
            .container('#d3-chart-container')
            .data(dataToShow)
            .nodeId(d => d.id)
            .parentNodeId(d => d.parentId)
            .nodeWidth(d => 240)
            .nodeHeight(d => 85) // Node lebih pendek
            .compact(false)
            .siblingsMargin(d => 60)
            .childrenMargin(d => 80)
            .neighbourMargin((a, b) => 60)
            .buttonContent(({ node }) => {
                // Tombol Child (+/-)
                const hasChildren = allOrgData.some(n => n.parentId === node.data.id);
                if (!hasChildren) return ''; 
                const symbol = node.children ? `−` : `+`;
                return `<div class="org-node-btn-child">${symbol}</div>`;
            })
            .onNodeClick((d) => {
                showEmployeeModal(d.data.id);
            })
            .nodeContent(function(d) {
                const isHighlighted = highlightNodeId && d.data.id === highlightNodeId;
                
                let typeLabel = '';
                let typeClass = '';
                switch(d.data.type) {
                    case 'HQ': typeLabel = 'Kantor Pusat'; typeClass = 'hq'; break;
                    case 'PT': typeLabel = 'PT'; typeClass = 'pt'; break;
                    case 'DIV': typeLabel = 'Divisi'; typeClass = 'div'; break;
                    case 'DEPT': typeLabel = 'Departemen'; typeClass = 'dept'; break;
                }
                
                // Tombol Parent (↑)
                const originalNode = allOrgData.find(n => n.id === d.data.id);
                const hasParent = originalNode && originalNode.parentId !== '';
                let parentButton = '';
                
                if (isSearchResult && hasParent) {
                    parentButton = `
                    <div class="org-node-btn-parent"
                        onclick="event.stopPropagation(); window.showParentChart('${originalNode.parentId}', '${d.data.id}')"
                        title="Tampilkan Parent">
                        ↑
                    </div>`;
                }
                
                // HTML Node (Semua styling via CSS)
                return `
                    <div class="org-node-card ${isHighlighted ? 'org-node-highlight' : ''}">
                        
                        ${parentButton}
                        
                        <div class="org-node-badge org-node-badge-${typeClass}">
                            ${typeLabel}
                        </div>
                        
                        <div class="org-node-name">
                            ${d.data.name}
                        </div>
                        
                    </div>
                `;
            }) // Akhir dari .nodeContent
            .render(); // Render pertama
        
        
        // Logika Expand/Collapse
        if (isSearchResult) {
            chart.collapseAll(); 
        } else {
            chart.expandAll();
        }
        
        // Render ulang untuk centering & state
        if (highlightNodeId) {
            setTimeout(() => {
                chart.setCentered(highlightNodeId).render();
            }, 50); 
        } else if (isSearchResult) {
            chart.render();
        }
        
    } // Akhir dari fungsi initChart


    // Render chart pertama kali
    initChart(allOrgData, null, false);

    // ==============================================
    //         MODAL DETAIL KARYAWAN (BARU)
    // ==============================================
    function showEmployeeModal(orgId) {
        const employees = allEmployeesData.filter(e => e.orgId === orgId);
        const orgNode = allOrgData.find(o => o.id === orgId);
        
        const nodeName = orgNode ? orgNode.name : chart.data().find(o => o.id === orgId)?.name || "Detail Karyawan";

        function getDummyPhoto(name) {
            const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
            const color = colors[name.length % colors.length];
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color.substring(1)}&color=fff&size=60&bold=true`;
        }
        
        // Hapus modal lama jika ada
        const existingModal = document.getElementById('employeeModal');
        if (existingModal) existingModal.remove();

        // Buat elemen modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'org-modal-overlay';
        modalOverlay.id = 'employeeModal';
        
        let modalHTML = `
            <div class="org-modal-content">
                <div class="org-modal-header">
                    <div class="org-modal-title">${nodeName}</div>
                    <button class="org-modal-close-btn" id="modalCloseBtn">×</button>
                </div>
                <div class="org-modal-body">
        `;
        
        if (employees.length > 0) {
            employees.forEach((emp) => {
                const isSearched = searchedPersonId === emp.pernr;
                const photoUrl = getDummyPhoto(emp.name);
                
                modalHTML += `
                    <div class="org-modal-employee-card ${isSearched ? 'org-modal-employee-highlight' : ''}">
                        <img src="${photoUrl}" alt="${emp.name}" class="org-modal-employee-photo">
                        
                        <div class="org-modal-employee-info">
                            <div class="org-modal-employee-name">${emp.name}</div>
                            <div class="org-modal-employee-position">${emp.position}</div>
                            <div class="org-modal-employee-pernr">${emp.pernr}</div>
                        </div>
                        
                        ${isSearched ? `<div class="org-modal-searched-badge">DICARI</div>` : ''}
                    </div>
                `;
            });
        } else {
             modalHTML += `<div class="org-modal-empty">Tidak ada daftar karyawan di unit ini.</div>`;
        }

        modalHTML += `
                </div> <!-- /org-modal-body -->
            </div> <!-- /org-modal-content -->
        `;
        
        modalOverlay.innerHTML = modalHTML;
        document.body.appendChild(modalOverlay);

        // Tambah event listener
        modalOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'employeeModal') {
                modalOverlay.remove();
            }
        });
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            modalOverlay.remove();
        });
        modalOverlay.querySelector('.org-modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });

    } // Akhir dari showEmployeeModal

    // ==============================================
    //         FUNGSI SEARCH
    // ==============================================
    const searchButton = document.getElementById('employeeSearchButton');
    const searchInput = document.getElementById('employeeSearchInput');

    function searchEmployee() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            resetChart();
            return;
        }
        
        const matchingEmployee = allEmployeesData.find(e => 
            e.name.toLowerCase().includes(query) || 
            e.pernr.includes(query)
        );

        if (matchingEmployee) {
            searchedPersonId = matchingEmployee.pernr;
            const targetOrgId = matchingEmployee.orgId;
            
            const targetNode = allOrgData.find(n => n.id === targetOrgId);
            if (!targetNode) return;

            const rootNode = { ...targetNode, parentId: '' };
            const descendants = getDescendants(targetOrgId, allOrgData);
            const dataToShow = [rootNode, ...descendants];
            
            initChart(dataToShow, targetOrgId, true);
            
        } else {
            alert('Karyawan tidak ditemukan.');
            resetChart();
        }
    }

    function resetChart() {
        searchInput.value = '';
        searchedPersonId = null;
        initChart(allOrgData, null, false);
    }

    searchButton.addEventListener('click', searchEmployee);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchEmployee();
    });
    
    // Tambah tombol reset
    const resetButton = document.createElement('button');
    resetButton.className = 'btn-search'; 
    resetButton.style.background = '#64748b'; // Tetap inline karena ini style spesifik
    resetButton.innerHTML = 'Reset';
    resetButton.addEventListener('click', resetChart);
    
    const searchBar = document.querySelector('.org-chart-search-bar'); 
    if (searchBar) {
        searchBar.appendChild(resetButton);
    } else {
        searchButton.parentElement.appendChild(resetButton);
    }

});