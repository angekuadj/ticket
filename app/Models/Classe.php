<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom','user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function classes()
    {
        return $this->hasMany(Payement::class, 'classe_id');
    }

}
