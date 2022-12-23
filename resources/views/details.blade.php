@extends('layouts.app')

@section('main')
{{-- 
@foreach ($evv as $item)
    <label align="center"> </label>
        
    <table class="table table-dark table-striped">
        <!--<caption>Timetable</caption>-->
        <tr>
            <td align="center" height="50"
                width="100"><br>
                <b>Day/Period</b></br>
            </td>
            <td align="center" height="50"
                width="100">{{$item->Ddebut}} - {{$item->Dfin}} </b>
            </td>
            
        </tr>
       
        
    </table> 

    @endforeach --}}

    <style>
        html, body {
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }
        .full-height {
            height: 100vh;
        }
        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .position-ref {
            position: relative;
        }
        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }
        .content {
            text-align: center;
        }
        .title {
            font-size: 104px;
        }
        .links > a {
            padding: 0 25px;
            font-size: 25px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }
        .m-b-md {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
          How Generate 
        </div>
        @foreach ($qr as $item )
            
        <?php  dump($qr);   ?>
        <label>  </label>
        <br>
        <img style="width: 777px; height: 200px;  border: 1px solid red" src="https://t3.ftcdn.net/jpg/05/24/30/02/360_F_524300228_egMskw0zvvdwNUFPeJLlplclKzFamXBk.jpg" alt="Image"/>
        <div class="links">
            <a href="#"><strong>- By Shailesh Ladumor</strong></a>
        </div>
        @endforeach
    </div>
</div>
</body>





        @endsection
        <!-- Footer -->
    
       