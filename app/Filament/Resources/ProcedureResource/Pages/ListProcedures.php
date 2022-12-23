<?php

namespace App\Filament\Resources\ProcedureResource\Pages;

use App\Filament\Resources\ProcedureResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListProcedures extends ListRecords
{
    protected static string $resource = ProcedureResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
