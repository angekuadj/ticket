<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Traitement extends Model
{
    use HasFactory;
    protected $fillable = [
        'reference_id','payement_id','is_valide','type_id','trans'
    ];

    public function reference()
    {
        return $this->belongsTo(Reference::class);
    }
    public function payement()
    {
        return $this->belongsTo(Payement::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function qrs()
    {
        return $this->hasMany(Qr::class, 'qr_id');
    }
    public function procedure()
    {
        return $this->belongsTo(Procedure::class);
    }

}
