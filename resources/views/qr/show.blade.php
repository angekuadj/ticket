@extends('layouts.app')
@section('content')
 
    
      <h2 class="text-center text-muted">SCANNAGE DE QRCODE </h2> <br>
  <div class="row">
    <div class="col-md-4">
    
      <button class="btn btn-outline-primary" onclick="imprimer()">Imprimer ce Qrcode</button>
      @if ($user->nombre_visiteur)
      <div id="qrcode"> 
       <img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->color(38, 38, 38, 0.85)->backgroundColor(255, 255, 255, 0.82)->size(200)->generate($user->qrcode)) !!} ">
       <br>

       <h5>Votre nom :{{ $user->name }}</h5>
       <h5>Votre poste :{{$user->poste}}</h5>
       <h5>Votre prenom :{{$user->prenom}}</h5>

      </div>
      <!-- {{$user->nombre_visiteur}} --></span></h4> 
       @else
       <p class="text-muted text-center"> Vous êtes l'administrateur  et donc n'avez pas besoin de Qrcode .</p>
       @endif           
    <span id="id_user" class="{{$user->id}}"></span>
    </div>


    <div class="col-md-4">
      <button class="btn btn-outline-primary" onclick="scan()" >Scanner Mon Qrcode</button>
    </div>


    <div class="col-md-4">
<h4 class="text-center text-muted"> Réactualiser la page avant de scanner un QRCode</h4>
    </div>
  </div>

 <div class="container">
   <div class="row">
     <div class="col-md-2">
     </div>
     <div class="col-md-6">
       <h4>Nombres de visite restantes : <span id="nbre">
         <video id="preview"></video>
          @section('script')
    <script type="text/javascript" src="{{asset('instascan.min.js')}}"></script>
   
    <script type="text/javascript">

   var Musique = new Audio();
   


// Example POST method implementation:



 function imprimer(){
  var partiImrimer = document.getElementById('qrcode');  
var newFenetre = window.open('','Print-Window');
newFenetre.document.open();

newFenetre.document.write('<html><body onload="window.print()">'+partiImrimer.innerHTML+'</body></html>');
newFenetre.document.close();
 }

    
     function scan(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(content);
         if(content!=''){
          $.post('http://localhost:8000/api/scan',{data:content},function(response){
                      if(response.info=='ok'){
                         scanner.stop()
                        $('#nbre').html(response.msg.nbre_visite)
                        swal("Vous êtes autorisé à effectué votre visite", "OK !", "success");
                         Musique.src = "/accesautoriser.wav";
                        Musique.play();
   
                      }else{
                        swal("Vous n'êtes pas autorisé à effectué votre visite", "OK !", "error");
                         Musique.src = "/accesrefuse.wav";
                        Musique.play();
                      }
                      console.log(response.msg)
                })
           
         }
        
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
     }

      
    </script>

@stop
     </div>
   </div>
 </div>


@stop