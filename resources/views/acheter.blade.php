@extends('layouts.app')

@section('main')


    


<div id="pricing" class="cards-2">
    <div class="absolute bottom-0 h-40 w-full bg-white"></div>
    <div class="container px-4 pb-px sm:px-8">
        <h2 class="mb-2.5 text-white lg:max-w-xl lg:mx-auto">Acheter un ticket</h2>
        <p class="mb-16 text-white lg:max-w-3xl lg:mx-auto"> choisir ton option et obtiens ton ticket par Code qr en 48 Heures </p>


        <!-- Button trigger modal -->
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle" align= "center">Paiement</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form action=" {{route('acheter.store')}} " method="POST">
            {{ csrf_field()}}
        <div class="modal-body">
            <div class="form-group mb-3">
                <label for=""></label>
                @if ( $user == null )

                @else

                <input type="text" value=" {{$user->name}} " name="user_id" required class="user_id form-control" disabled>
                @endif
            </div>
            <div class="form-group mb-3">
                <label for="">Numero de Transfert</label>
                <input type="number" name="Dnumero" required class="Dnumero form-control">
            </div>
            <div class="form-group mb-3"> 
            <select name="filiere_id" id="filiere_id" class=" filiere_id custom-select custom-select-sm">
                <option value="">Filiere</option>
                @foreach ($fi as $fil)
                <option value=" {{$fil->id}} "> {{$fil->nom}} </option>
                @endforeach
                
              </select>
            </div>
              <div class="form-group mb-3">
              <select name="classe_id" id="classe_id" class="classe_id custom-select custom-select-sm">
                <option value="">Classe</option>
                @foreach ($cl as $clas)
                <option value=" {{$clas->id}} "> {{$clas->nom}} </option>
                @endforeach
                
              </select>
            </div>
            <div class="form-group mb-3">
                <label for="">Ecole</label>
                <input type="text"  name="ecole" required class="ecole form-control">
            </div>
       
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary add_payement ">Passer au paiement</button>
        </div>
        </form>
      </div>
    </div>
  </div>


        
@foreach ($evv as $ev )
    

        <!-- Card-->
        <div class="card">
            <div class="card-body">
                <div class="card-title"> {{$ev->Nom}} </div>
                <div class="price"><span class="currency">Frcfa</span><span class="value"> {{$ev->prix}} </span></div>
                {{-- <div class="frequency">monthly</div> --}}
                <p> {{$ev->Description}} </p>
                <ul class="list mb-7 space-y-2 text-left">
                    <li class="flex">
                        <i class="fas fa-chevron-right"></i>
                        <div> {{$ev->lieu}} </div>
                    </li>
                    <li class="flex">
                        <i class="fas fa-chevron-right"></i>
                        <div> Du {{$ev->Ddebut}} au  {{$ev->Dfin}} </div>
                    </li>
                    <li class="flex">
                        <i class="fas fa-chevron-right"></i>
                        <div></div>
                    </li>
                    <li class="flex">
                        <i class="fas fa-chevron-right"></i>
                        <div>Community support and videos</div>
                    </li>
                </ul>
                @if ( $user == null )
                <div class="button-wrapper">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#">
                      Acheter
                    </button>
              </div> 
                @else
                <div class="button-wrapper">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        Acheter
                      </button>
                </div>
                @endif
            </div>
        </div> <!-- end of card -->
        <!-- end of card -->
        @endforeach
        <!-- Card-->
        
        <!-- Card-->
        <!-- end of card -->
        <!-- end of card -->

    </div> <!-- end of container -->
</div>  





        @endsection
        <!-- Footer -->
    
       

        


