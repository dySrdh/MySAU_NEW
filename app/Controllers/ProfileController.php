<?php

namespace App\Controllers;

class ProfileController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Data Pribadi - My SAU',
            'user' => $this->getUserData(),
            'current_page' => 'profile'
        ];
        
        return view('pages/profile', $data);
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