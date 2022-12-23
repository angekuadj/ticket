<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom','photo'
    ];
    public function types()
    {
        return $this->hasMany(Traitement::class, 'type_id');
    }

}
