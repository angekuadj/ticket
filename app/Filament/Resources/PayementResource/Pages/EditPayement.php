<?php

namespace App\Filament\Resources\PayementResource\Pages;

use App\Filament\Resources\PayementResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPayement extends EditRecord
{
    protected static string $resource = PayementResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
