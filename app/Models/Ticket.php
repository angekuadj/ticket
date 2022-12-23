<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'evenement_id','nom','photo'
    ];
    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}
