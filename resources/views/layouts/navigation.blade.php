  <!-- Navigation -->
  <nav class="navbar fixed-top">
    <div class="container flex flex-wrap items-center justify-between sm:px-4 lg:flex-nowrap lg:px-8">

        <!-- Text Logo - Use this if you don't have a graphic logo -->
        <!--<a class="text-gray-800 font-semibold text-3xl leading-4 no-underline page-scroll" href="index.html">Pavo</a>-->

        <!-- Image Logo -->
        <a class="inline-block mr-4 py-0.5 text-xl whitespace-nowrap hover:no-underline focus:no-underline" href="index.html">
            <img src="images/logo.svg" alt="alternative" class="h-8"/>
        </a>

        <button class="background-transparent rounded text-xl leading-none hover:no-underline focus:no-underline lg:hidden lg:text-gray-400" type="button" data-toggle="offcanvas">
            <span class="navbar-toggler-icon inline-block w-8 h-8 align-middle"></span>
        </button>

        <div class="navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center" id="navbarsExampleDefault">
            <ul class="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                <li>
                    <a class="nav-link page-scroll" href=" /welcome ">Actualité <span class="sr-only">(current)</span></a>
                </li>
                <li>
                    <a class="nav-link page-scroll" href="index.html#features">Evenement</a>
                </li>
                <li>
                    <a class="nav-link page-scroll" href="/acheter">Acheter</a>
                </li>
                {{-- <li>
                    <a class="nav-link page-scroll" href="/login">Connexion</a>
                </li> --}}
                <li>
                    <a class="nav-link page-scroll" href="/QrCode">Mon code Qr</a>
                </li>
                <li>
                    <a class="nav-link page-scroll" href="/qr-code">Mon code Qr1</a>
                </li>
                
                {{-- <li class="dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Drop</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <a class="dropdown-item page-scroll" href="article.html">Article Details</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item page-scroll" href="terms.html">Terms Conditions</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item page-scroll" href="privacy.html">Privacy Policy</a>
                    </div>
                </li>
                <li>
                    <a class="nav-link page-scroll" href="index.html#download">Download</a>
                </li> --}}
            </ul>
            {{-- <span class="block lg:ml-3.5">
                <a class="no-underline" href="#your-link">
                    <i class="fab fa-apple text-indigo-600 hover:text-pink-500 text-xl transition-all duration-200 mr-1.5"></i>
                </a>
                <a class="no-underline" href="#your-link">
                    <i class="fab fa-android text-indigo-600 hover:text-pink-500 text-xl transition-all duration-200"></i>
                </a>
            </span> --}}
        </div> <!-- end of navbar-collapse -->
    </div> <!-- end of container -->
</nav> <!-- end of navbar -->
<!-- end of navigation -->
