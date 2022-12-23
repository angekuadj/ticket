<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>docs</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery.js" ></script>
<script type="text/javascript" src="{{asset('jq.js')}}"></script>
</head>
<body>
<!-- <body onload="window.print();"> -->



		<div class="container">
			 @yield('content')
		</div>



    <!-- <script type="text/javascript" src="{{asset('jq.js')}}"></script> -->

<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js" ></script>
 --><script src="/js/jquery.js" ></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
@yield('script')
</body>
</html>