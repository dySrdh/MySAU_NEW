<?php

namespace App\Controllers;

class HistoryController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Task History - My SAU',
            'user' => $this->getUserData(),
            'workers' => $this->getWorkersData(),
            'current_page' => 'history'
        ];
        
        return view('pages/history', $data);
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
    
    private function getWorkersData()
    {
        return [
            ['id' => 1, 'name' => 'Karina', 'avatar_url' => 'https://i.pravatar.cc/40?img=1'],
            ['id' => 2, 'name' => 'Ahyeon', 'avatar_url' => 'https://i.pravatar.cc/40?img=2'],
            ['id' => 3, 'name' => 'Asa', 'avatar_url' => 'https://i.pravatar.cc/40?img=3'],
            ['id' => 4, 'name' => 'Giselle', 'avatar_url' => 'https://i.pravatar.cc/40?img=4'],
            ['id' => 5, 'name' => 'Ningning', 'avatar_url' => 'https://i.pravatar.cc/40?img=5'],
            ['id' => 6, 'name' => 'Winter', 'avatar_url' => 'https://i.pravatar.cc/40?img=6'],
        ];
    }
}