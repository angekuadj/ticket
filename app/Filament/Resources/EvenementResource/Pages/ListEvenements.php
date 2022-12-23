<?php

namespace App\Filament\Resources\EvenementResource\Pages;

use App\Filament\Resources\EvenementResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEvenements extends ListRecords
{
    protected static string $resource = EvenementResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
