<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'trans',
    ];
    public function procedure()
    {
        return $this->hasMany(Traitement::class, 'procedure_id');
    }

}
