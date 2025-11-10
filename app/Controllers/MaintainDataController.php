<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class MaintainDataController extends BaseController
{
    public function index()
    {
        $data = [
            'page_title' => 'Maintain Data',
        ];

  
        return view('pages/maintain_data', $data);    }
}