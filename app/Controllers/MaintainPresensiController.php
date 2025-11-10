<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class MaintainPresensiController extends BaseController
{
    /**
     * Halaman List Maintain Data Presensi
     */
    public function index()
    {
        // Data dummy untuk tabel list (sesuai Gambar)
        $dummy_data = [
            ['id' => 1, 'pn' => '00019813', 'nama' => 'Evita Meiliani', 'office' => 'Kantor Pusat', 'jabatan' => 'Direktur', 'tmt' => '01 Agustus 2022'],
            ['id' => 2, 'pn' => '00059897', 'nama' => 'Retno Listyowati', 'office' => 'Kantor Pusat', 'jabatan' => 'Group Head', 'tmt' => '01 Maret 2022'],
            ['id' => 3, 'pn' => '00061403', 'nama' => 'Hadi Hidayat', 'office' => 'Kantor Pusat', 'jabatan' => 'Group Head', 'tmt' => '01 Maret 2022'],
            ['id' => 4, 'pn' => '00125161', 'nama' => 'Muhammad Septian Dwi Susilo', 'office' => 'Kantor Pusat', 'jabatan' => 'Department Head', 'tmt' => '01 Maret 2022'],
            ['id' => 5, 'pn' => '90140869', 'nama' => 'Anggy Prasetyo Utomo', 'office' => 'Regional Office Jakarta 2', 'jabatan' => 'Junior Officer', 'tmt' => '01 Maret 2022'],
            ['id' => 6, 'pn' => '90176048', 'nama' => 'Muhammad Farhan Fajri', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Juni 2025'],
            ['id' => 7, 'pn' => '500000001', 'nama' => 'Aisah Putri Shabina', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Mei 2021'],
            ['id' => 8, 'pn' => '500000002', 'nama' => 'Ajeng Mukti Rahardsianti', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Mei 2021'],
            ['id' => 9, 'pn' => '500000003', 'nama' => 'Andrian Pranata', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Mei 2021'],
            ['id' => 10, 'pn' => '500000004', 'nama' => 'Dwi Citta Lusiana', 'office' => 'Kantor Pusat', 'jabatan' => 'Junior Officer', 'tmt' => '01 Mei 2021'],
        ];


        $data = [
            'page_title' => 'Maintain Data Presensi',
            'presensi_data' => $dummy_data
        ];

        return view('pages/maintain_data_presensi', $data);
    }
}