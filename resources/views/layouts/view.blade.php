<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>docs</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="{{asset('dist/css/bootstrap.css')}}">
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script src="{{asset('ty.js')}}"></script>
    <script src="https://code.jquery.com/jquery.js" ></script>
<script type="text/javascript" src="{{asset('jq.js')}}"></script>
</head>
<header>
	  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="/">Acceuil</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/user">Tous les employés <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/user/create">Générer un employés</a>
          </li>  
           <li class="nav-item">
            <a class="nav-link" href="{{ url('/home') }}">Mon Profil</a>
          </li>
       <!--    <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          -->
        </ul>
      
      </div>
    </nav>
</header>
<body>



<br>
		<div class="container">
			 @yield('content')
		</div>





    <script type="text/javascript" src="{{asset('jq.js')}}"></script>
    <script src="/js/jquery.js" ></script>

<script src="https://code.jquery.com/jquery.js" ></script>
<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js" ></script> -->
<script src="{{asset('dist/js/bootstrap.js')}}"></script>
<!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script> -->
@yield('script')
</body>
</html>