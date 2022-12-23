<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EvenementResource\Pages;
use App\Filament\Resources\EvenementResource\RelationManagers;
use App\Models\Evenement;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EvenementResource extends Resource
{
    protected static ?string $model = Evenement::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('Nom')->label('Nom'),
                Forms\Components\TextInput::make('Description')->label('Description'),
                Forms\Components\TextInput::make('lieu')->label('Lieu')->nullable(),
                Forms\Components\TextInput::make('prix')->label('Prix')->numeric(),
                Forms\Components\DatePicker::make('Ddebut')->label('Date Debut'),
                Forms\Components\DatePicker::make('Dfin')->label('Date Fin'),
                FileUpload::make('photo')->label('Photo')->image()->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID'),
                Tables\Columns\imageColumn::make('photo')->label('Photo'),
                Tables\Columns\TextColumn::make('Nom')->label('Nom'),
                Tables\Columns\TextColumn::make('Description')->label('Description'),
                Tables\Columns\TextColumn::make('lieu')->label('Lieu'),
                Tables\Columns\TextColumn::make('prix')->label('Prix'),
                Tables\Columns\TextColumn::make('Ddebut')->label('Date Debut'),
                Tables\Columns\TextColumn::make('Dfin')->label('Date Fin'),
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
            'index' => Pages\ListEvenements::route('/'),
            'create' => Pages\CreateEvenement::route('/create'),
            'edit' => Pages\EditEvenement::route('/{record}/edit'),
        ];
    }    
}
