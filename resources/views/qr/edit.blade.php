@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Mettre à Jour l'ultisateur </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('qr.update',$user) }}">
                            <input type="hidden" value="PUT" name="_method">
                        {{ csrf_field() }}

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ $user->name }}" required autofocus>

                            </div>
                        </div>

                    


                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Poste </label>

                            <div class="col-md-6">
                                <input  type="text" class="form-control" name="poste" value="{{ $user->poste }}" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Prenom </label>

                            <div class="col-md-6">
                                <input  type="text" class="form-control" name="prenom" value="{{ $user->prenom }}" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">nombre de visites </label>

                            <div class="col-md-6">
                                <input  type="number" class="form-control" name="nombre_visiteur" value="{{ $user->nombre_visiteur }}" required>
                            </div>
                        </div>

                            <input type="hidden" name="updated_at" >
                            <input type="hidden" name="created_at" >

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    enregistrer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
