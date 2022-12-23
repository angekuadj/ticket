<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FiliereResource\Pages;
use App\Filament\Resources\FiliereResource\RelationManagers;
use App\Models\Filiere;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FiliereResource extends Resource
{
    protected static ?string $model = Filiere::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nom')->label('Nom'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID'),
                Tables\Columns\TextColumn::make('nom')->label('Nom'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFilieres::route('/'),
            'create' => Pages\CreateFiliere::route('/create'),
            'edit' => Pages\EditFiliere::route('/{record}/edit'),
        ];
    }    
}
