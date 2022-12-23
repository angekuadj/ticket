<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TraitementResource\Pages;
use App\Filament\Resources\TraitementResource\RelationManagers;
use App\Models\Payement;
use App\Models\Procedure;
use App\Models\Reference;
use App\Models\Traitement;
use App\Models\Type;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Wizard;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TraitementResource extends Resource
{
    protected static ?string $model = Traitement::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Wizard::make([
                    Wizard\Step::make('Coordonné')
                        ->schema([
                            Select::make('payement_id')
                            ->label('Numéro Transfert')
                            ->options(
                                Payement::all()->pluck('Dnumero', 'id'))
                            ->searchable(),
                            Select::make('reference_id')
                            ->label('Referenece Transfert')
                            ->options(
                                Reference::all()->pluck('numero', 'id'))
                            ->searchable(),
                        ]),
                    Wizard\Step::make('Valider')
                        ->schema([
                            Select::make('type_id')
                            ->label('Type Transfert')
                            ->options(
                                Type::all()->pluck('nom', 'id'))
                            ->searchable(),
                            Toggle::make('is_valide')->label('Valider'),
                            Toggle::make('trans')->label('Transmission'),
                            // Select::make('procedure_id')
                            // ->label('Action')
                            // ->options(
                            //     Procedure::where("id = 1")->pluck('nom', 'id')
                            //     )       
                            // ->searchable(),

                        ]),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID'),
                Tables\Columns\TextColumn::make('payement.Dnumero')->label('Numero de transaction'),
                Tables\Columns\TextColumn::make('reference.numero')->label('Numero Reference'),
                Tables\Columns\TextColumn::make('type.nom')->label('Type Transfert'),
                Tables\Columns\BooleanColumn::make('is_valide')->label('En cours'),
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
            'index' => Pages\ListTraitements::route('/'),
            'create' => Pages\CreateTraitement::route('/create'),
            'edit' => Pages\EditTraitement::route('/{record}/edit'),
        ];
    }    
}
