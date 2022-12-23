<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QrResource\Pages;
use App\Filament\Resources\QrResource\RelationManagers;
use App\Models\Evenement;
use App\Models\Payement;
use App\Models\Qr;
use App\Models\Traitement;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QrResource extends Resource
{
    protected static ?string $model = Qr::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('qrcode')->label('QR Code')->image()
                ->nullable(),
                Select::make('traitement_id')
                            ->label('Traitement')
                            ->options(
                                Traitement::all()->pluck('id', 'id'))
                            ->searchable(),
                            Select::make('user_id')
                            ->label('Nom ')
                            ->options(
                                User::all()->pluck('name', 'id'))
                            ->searchable(),
                            Select::make('evenement_id')
                            ->label('Evenement')
                            ->options(
                                Evenement::all()->pluck('Nom', 'id'))
                            ->searchable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                
                Tables\Columns\TextColumn::make('user_id')->label('User'),
                Tables\Columns\TextColumn::make('evenement.Nom')->label('Evenement'),
                Tables\Columns\TextColumn::make('traitement.id')->label('Traitement'),
                Tables\Columns\imageColumn::make('qrcode')->label('QrCode'),
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
            'index' => Pages\ListQrs::route('/'),
            'create' => Pages\CreateQr::route('/create'),
            'edit' => Pages\EditQr::route('/{record}/edit'),
        ];
    }    
}
