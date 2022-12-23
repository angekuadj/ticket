<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PayementResource\Pages;
use App\Filament\Resources\PayementResource\RelationManagers;
use App\Models\Classe;
use App\Models\Evenement;
use App\Models\Filiere;
use App\Models\Payement;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;

class PayementResource extends Resource
{
    protected static ?string $model = Payement::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';
    

    public static function form(Form $form): Form
    {
        $user = \Filament\Facades\Filament::getUserName(auth()->user());
        //dump($user);
        return $form
            ->schema([
               
                Forms\Components\TextInput::make('user')->label('Nom')->default($user)->disabled(),
                Forms\Components\TextInput::make('Dnumero')->label('Numero Transfert'),
                Select::make('filiere_id')
                            ->label('Filiere')
                            ->options(
                                Filiere::all()->pluck('nom', 'id'))
                            ->searchable(),
                            Select::make('evenement_id')
                            ->label('Evenement')
                            ->options(
                                Evenement::all()->pluck('Nom', 'id'))
                            ->searchable(),
                            Select::make('classe_id')
                            ->label('Classe')
                            ->options(
                                Classe::all()->pluck('nom', 'id'))
                            ->searchable(),
                Forms\Components\TextInput::make('ecole')->label('Ecole'),
                
                Toggle::make('is_valide')->label('Valider')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID'),
                Tables\Columns\TextColumn::make('user')->label('Nom'),
                Tables\Columns\TextColumn::make('Dnumero')->label('Numero de transaction'),
                Tables\Columns\TextColumn::make('filiere.nom')->label('Filière'),
                Tables\Columns\TextColumn::make('classe.nom')->label('Classe'),
                Tables\Columns\TextColumn::make('evenement.Nom')->label('Evenment'),
                Tables\Columns\BooleanColumn::make('is_valide')->label('Valide'),
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
            'index' => Pages\ListPayements::route('/'),
            'create' => Pages\CreatePayement::route('/create'),
            'edit' => Pages\EditPayement::route('/{record}/edit'),
        ];
    }    
}
