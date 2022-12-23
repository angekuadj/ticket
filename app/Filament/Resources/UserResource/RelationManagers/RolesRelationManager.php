<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use BezhanSalleh\FilamentShield\Resources\RoleResource;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\BelongsToManyRelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Spatie\Permission\Contracts\Role;

class RolesRelationManager extends BelongsToManyRelationManager
{
    // protected static string $relationship = 'roles';

    // protected static ?string $recordTitleAttribute = 'name';

    protected static string $relationship = 'roles';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return RoleResource::form($form);
    }

    public static function table(Table $table): Table
    {
        // return $table
        //     ->columns([
                
        //     ])
        //     ->filters([
        //     ]);
        return RoleResource::table($table);
    }
}
