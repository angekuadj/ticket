@extends('layouts.app')
@section('content')

	<div class="row">
		<div class="col-md-12">
			<h2 class="text-center text-muted">Liste des employés </h2>
      <p class="text-center text-muted">( Pour imprimer cliquez sur le bouton droit de la souris puis cliquez sur imprimer )</p>
			<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom</th>
      <th scope="col">Poste</th>
      <th scope="col">Prenom</th>
      <th scope="col-2">Nombre de Visite</th>
      <th scope="col-2">Scaner</th>
         <th scope="col-2">Mise à jour</th>
        <th scope="col-2">Supprimer</th>
    </tr>
  </thead>
  <tbody>
  	@foreach($users as $user)
    <tr>
      <th scope="row">{{$user->id}}</th>
      <td>{{$user->name}}</td>
      <td>{{$user->poste}}</td>
      <td>{{$user->prenom}}</td>
      <td>{{$user->nombre_visiteur}}</td>
      <td><button class="btn btn-outline-primary"><a href="user/{{$user->id}}">Voir</a></button></td> 
        <td><a href="user/{{$user->id}}/edit"><button class="btn btn-outline-primary">Editer</button></a></td>
        <td> <form action="{{route('qr-code.destroy',$user->id) }}" method="POST"
	onsubmit="return confirm('Êtes vous sûre ?')";>
            <button  type="submit" class="btn btn-outline-danger button "> 
                  <span class="visible content">X</span>
                  <span class="hidden content"><i class="fa fa close"></i></span>
                  {{ csrf_field() }}
				       {{ method_field('DELETE') }}
            </button>
          </form></td>
      
    </tr>
  	@endforeach
  </tbody>
</table>
		</div>
	</div>
