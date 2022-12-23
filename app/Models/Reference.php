<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;
    protected $fillable = [
        'numero','payement_id'
    ];

    public function references()
    {
        return $this->hasMany(Traitement::class, 'reference_id');
    }
    public function payement()
    {
        return $this->belongsTo(Payement::class);
    }

}
