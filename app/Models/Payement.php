<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payement extends Model
{
    use HasFactory;
    protected $fillable = [
       'Dnumero','fi','cl','ecole','is_valide','classe_id','filiere_id','evenement_id','user'
    ];

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
    public function payement()
    {
        return $this->hasMany(Traitement::class, 'payement_id');
    }
    
}
