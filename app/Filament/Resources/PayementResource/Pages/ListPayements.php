<?php

namespace App\Filament\Resources\PayementResource\Pages;

use App\Filament\Resources\PayementResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPayements extends ListRecords
{
    protected static string $resource = PayementResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
