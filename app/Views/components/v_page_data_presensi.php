<?php

?>

<div id="dataPresensiPageContent">

    <a href="#" class="back-link" id="returnToMainFromDataPresensi">
        <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
    </a>

    <div class="data-presensi-page-container card">
        
        <div class="data-presensi-header-box">
            <div class="data-presensi-title-group">
                <i class='bx bxs-calendar-check'></i>
                <h2>List Presensi Pekerja</h2>
            </div>
            
          
        </div>

        <div class="data-presensi-content-scroll" id="dataPresensiContentScroll">
            <div class="data-presensi-table-container">
                <table class="presensi-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Jam Masuk</th>
                            <th>Jam Pulang</th>
                            <th>Lokasi Masuk</th>
                            <th>Lokasi Pulang</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody id="presensiTableBody">
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div class="modal-backdrop" id="dataPresensiMonthFilterModal" style="display:none;">
        <div class="modal-content month-filter-modal">
            <div class="month-filter-header">
                <h3 id="dataPresensiFilterYear">2025</h3>
            </div>
            <div class="month-filter-grid">
                <span class="month-item" data-month="Jan">Jan</span>
                <span class="month-item" data-month="Feb">Feb</span>
                <span class="month-item" data-month="Mar">Mar</span>
                <span class="month-item" data-month="Apr">Apr</span>
                <span class="month-item" data-month="May">May</span>
                <span class="month-item" data-month="Jun">Jun</span>
                <span class="month-item" data-month="Jul">Jul</span>
                <span class="month-item" data-month="Aug">Aug</span>
                <span class="month-item" data-month="Sep">Sep</span>
                <span class="month-item" data-month="Oct">Oct</span>
                <span class="month-item" data-month="Nov">Nov</span>
                <span class="month-item" data-month="Dec">Dec</span>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" id="cancelDataPresensiMonthFilter">
                    <i class='bx bx-x'></i> Cancel
                </button>
            </div>
        </div>
    </div>

    <div class="modal-backdrop" id="presensiDetailModal" style="display:none;">
        <div class="modal-content">
            <div class="modal-header">
                <i class='bx bxs-map modal-icon'></i>
                <h3>Detail Lokasi Presensi</h3>
            </div>
            <div class="modal-body">
                <div class="detail-field">
                    <label>Tanggal</label>
                    <span id="detailDate">-</span>
                </div>
                <div class="detail-field">
                    <label>Waktu</label>
                    <span id="detailTime">-</span>
                </div>
                <div class="detail-field">
                    <label>Jenis Presensi</label>
                    <span id="detailType">-</span>
                </div>
                <div class="detail-field">
                    <label>Koordinat</label>
                    <span id="detailCoordinates">-</span>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" id="closePresensiDetailModal">
                    <i class='bx bx-x'></i> Close
                </button>
            </div>
        </div>
    </div>

</div> ```