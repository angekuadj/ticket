<?php

namespace App\Filament\Resources\QrResource\Pages;

use App\Filament\Resources\QrResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditQr extends EditRecord
{
    protected static string $resource = QrResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
