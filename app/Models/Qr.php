<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qr extends Model
{
    use HasFactory;
    protected $fillable = [
        'qrcode', 'traitement_id','user_id','evenement_id'
    ];
    public function traitement()
    {
        return $this->belongsTo(Traitement::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}
