<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Pages\Actions;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    use HasPageShield;
    protected static string $resource = UserResource::class;
}
