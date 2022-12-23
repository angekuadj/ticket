<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;
    protected $fillable = [
        'Dfin','Ddebut','Nom','Description','lieu','prix'
    ];
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'ticket_id');
    }

    public function qrs()
    {
        return $this->hasMany(Qr::class, 'qr_id');
    }

    public function payements()
    {
        return $this->hasMany(Payement::class, 'payement_id');
    }
    public function references()
    {
        return $this->hasMany(Reference::class, 'reference_id');
    }
}
