<?php

namespace App\Controllers;

class PresensiController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Presensi Online - My SAU',
            'user' => $this->getUserData(),
            'current_page' => 'presensi'
        ];
        
        return view('pages/presensi', $data);
    }
    
    private function getUserData()
    {
        return [
            'name'       => 'Lee Ji-eun',
            'id'         => '50000067',
            'role'       => 'Officer',
            'department' => 'Business & Development Department',
            'avatar_url' => 'images/avatar.jpg'
        ];
    }
}