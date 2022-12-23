<?php

namespace App\Filament\Resources\ProcedureResource\Pages;

use App\Filament\Resources\ProcedureResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProcedure extends EditRecord
{
    protected static string $resource = ProcedureResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
