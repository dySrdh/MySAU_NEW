<?php

namespace App\Controllers;

// Pastikan untuk 'use' BaseController
use App\Controllers\BaseController; 

class UserController extends BaseController
{
    /**
     * Fungsi untuk MENAMPILKAN halaman ganti password
     */
    public function changePassword()
    {
        // Data yang dibutuhkan oleh file view Anda
        $data = [
            'title' => 'Ganti Password - My SAU',
            'user' => $this->getUserData(), // Mengambil data user
            'workers' => [], // Kosongkan jika tidak perlu
            'current_page' => 'change-password'
        ];

        /*
         * Ini memuat file 'bingkai' PHP yang Anda buat:
         * app/Views/pages/change_password.php
         *
         * Pastikan path 'pages/change_password' ini benar
         * sesuai lokasi file Anda di dalam app/Views/
         */
        return view('pages/change_password', $data);
    }

    /**
     * Fungsi untuk MEMPROSES form ganti password
     * (Anda akan butuh ini nanti)
     */
    public function processChangePassword()
    {
        // 1. Ambil data dari form:
        // $currentPass = $this->request->getPost('currentPassword');
        // $newPass = $this->request->getPost('newPassword');

        // 2. Validasi data...
        
        // 3. Update password di database...
        
        // 4. Redirect kembali dengan pesan sukses
        return redirect()->to('change-password')->with('success', 'Password berhasil diperbarui!');
    }


    // --- FUNGSI HELPER UNTUK DATA USER ---
    // (Ini bisa Anda pindahkan ke BaseController nanti)
    private function getUserData()
    {
        // Ambil dari session atau biarkan default
        return session()->get('user_session') ?? [
            'name'       => 'Lee Ji-eun',
            'id'         => '50000067',
            'role'       => 'Officer',
            'department' => 'Business & Development Department',
            'avatar_url' => 'images/avatar.jpg'
        ];
    }
}