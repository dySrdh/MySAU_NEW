<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class DataPekerjaController extends BaseController
{
    public function index()
    {
        // (Fungsi index tidak berubah)
        $dummy_workers = [
            ['id' => 1, 'pn' => '00019813', 'nama' => 'Evita Meiliani', 'office' => 'Kantor Pusat', 'jabatan' => 'Direktur', 'tmt' => '01 Agustus 2022'],
            ['id' => 2, 'pn' => '00059897', 'nama' => 'Retno Listyowati', 'office' => 'Kantor Pusat', 'jabatan' => 'Manager', 'tmt' => '01 Maret 2022'],
            ['id' => 3, 'pn' => '00061403', 'nama' => 'Hadi Hidayat', 'office' => 'Kantor Pusat', 'jabatan' => 'Manager', 'tmt' => '01 Maret 2022'],
            ['id' => 4, 'pn' => '00125161', 'nama' => 'Muhammad Septian Dwi S', 'office' => 'Kantor Pusat', 'jabatan' => 'Departement Head', 'tmt' => '01 Maret 2022'],
            ['id' => 5, 'pn' => '90140868', 'nama' => 'Brain Mochtar Wibisono', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Maret 2022'],
            ['id' => 6, 'pn' => '90140869', 'nama' => 'Anggy Prasetyo Utomo', 'office' => 'Regional Office Jakarta 2', 'jabatan' => 'Junior Officer', 'tmt' => '01 Maret 2022'],
            ['id' => 7, 'pn' => '90151597', 'nama' => 'Galang Satya Yuhandra', 'office' => 'Kantor Pusat', 'jabatan' => 'Group Head', 'tmt' => '01 Oktober 2022'],
            ['id' => 8, 'pn' => '90175172', 'nama' => 'Hilmi Lu`Alghia', 'office' => 'Kantor Pusat', 'jabatan' => 'Internship', 'tmt' => '18 Agustus 2024'],
            ['id' => 9, 'pn' => '90176048', 'nama' => 'Muhammad Farhan Fajri', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Juli 2025'],
            ['id' => 10, 'pn' => '500000001', 'nama' => 'Aisah Putri Shabina', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Mei 2021'],
        ];

        $data = [
            'page_title' => 'Data Pekerja',
            'workers' => $dummy_workers
        ];

        return view('pages/data_pekerja_list', $data);
    }

    public function tambah()
    {
        // Simulasi auto-increment "Penr"
        $last_penr_prefix = 'S000000';
        $last_penr_numeric = 314; // Anggap ini dari DB
        $new_penr_numeric = $last_penr_numeric + 1;
        $new_penr = $last_penr_prefix . $new_penr_numeric; // Hasil: "S000000315"
        
        $data = [
            'page_title' => 'Tambah Pekerja',
            'new_penr' => $new_penr, 
            
            // --- DATA DUMMY UNTUK SEMUA DROPDOWN ---
            'dropdown_agama' => ['Islam', 'Kristen Protestan', 'Kristen Katolik', 'Hindu', 'Buddha', 'Konghucu'],
            'dropdown_status_nikah' => ['Belum Menikah', 'Menikah', 'Cerai Hidup', 'Cerai Mati'],
            
            // Nanti ini akan jadi data bertingkat dari API
            'dropdown_provinsi' => [['id' => 1, 'nama' => 'DKI Jakarta'], ['id' => 2, 'nama' => 'Jawa Barat'], ['id' => 3, 'nama' => 'Jawa Tengah']],
            'dropdown_kota' => [['id' => 101, 'nama' => 'Jakarta Pusat'], ['id' => 102, 'nama' => 'Bandung'], ['id' => 103, 'nama' => 'Semarang']],
            'dropdown_kecamatan' => [['id' => 10101, 'nama' => 'Tanah Abang'], ['id' => 10201, 'nama' => 'Sumur Bandung'], ['id' => 10301, 'nama' => 'Semarang Tengah']],
            'dropdown_desa' => [['id' => 1010101, 'nama' => 'Petamburan'], ['id' => 1020101, 'nama' => 'Merdeka'], ['id' => 1030101, 'nama' => 'Kembangsari']],
            
            'dropdown_pendidikan' => ['SMA/SMK', 'D3', 'S1', 'S2', 'S3'],
            'dropdown_sekolah' => [['id' => 'UI', 'nama' => 'Universitas Indonesia'], ['id' => 'ITB', 'nama' => 'Institut Teknologi Bandung'], ['id' => 'UGM', 'nama' => 'Universitas Gadjah Mada']],
            'dropdown_jurusan' => [['id' => 'TI', 'nama' => 'Teknik Informatika'], ['id' => 'AK', 'nama' => 'Akuntansi'], ['id' => 'DKV', 'nama' => 'Desain Kom. Visual']],
            
            'dropdown_region' => [['id' => 'REG1', 'nama' => 'Regional Office Jakarta 1'], ['id' => 'REG2', 'nama' => 'Regional Office Jakarta 2'], ['id' => 'REG3', 'nama' => 'Regional Office Makassar']],
            'dropdown_unit_kerja' => [['id' => 'KP-DIR', 'nama' => 'Kantor Pusat|Direktur'], ['id' => 'KP-IT', 'nama' => 'Kantor Pusat|IT Development'], ['id' => 'KP-HC', 'nama' => 'Kantor Pusat|Human Capital']],
            'dropdown_divisi' => [['id' => 'IT-OPS', 'nama' => 'IT Development & Operation Team'], ['id' => 'HC-PAY', 'nama' => 'Payroll & Compensation Team']],
            'dropdown_jabatan' => [['id' => 'DIR', 'nama' => 'Direktur'], ['id' => 'MGR', 'nama' => 'Manager'], ['id' => 'JO', 'nama' => 'Junior Officer'], ['id' => 'INT', 'nama' => 'Internship']],
        ];

        return view('pages/data_pekerja_form', $data);
    }
}