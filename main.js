"use strict";
$(() => {
    // create coins on page load , only when you on index page //
    // --- only if you run the site online --- //
    if (window.location.pathname === "/index.html") {
        createCoins();
    }
    // ----- Navbar onClick -------- //
    $("#HomePage").click(() => {
        $(".pageContent").html(() => {
            createCoins();
        
        });
    });

    $("#realTimePage").click(() => {
        getAllCoins();
        $(".pageContent").html(`
        <div id="chartContainer" style="height: 300px; width: 100%;">
        
        </div>`);
        canvasAjax();
    });

    $("#aboutPage").click(() => {
        $(".pageContent").html(`
        <div class="about text-center" style="height: 100%; width: 100%;">
     
    <div class="content-center">
    <div class="cc-profile-image"><a href="#"><img src="assest/image/Mohammad shalata.png" alt="Image" /></a></div>
    <div class="h2 title">Mohammad Shalata</div>
    <div> 
    <a>Software Practical Engineer, Graphic Designer, Full Stack Developer , Marketing</a>
    <p>This is my second project for the John Bryce Full Stack Web Development class</p>
    <a>Some of the features that can be found in CryptoSelect include:</a>
    <li>Coin of interest selection by toggle switch.    </li>
    <li>Expandable information per coin on the homepage.</li>
    <li>Real time CryptoCurrency updates in graph format.</li>
    <br>
    <a>Search Capabilities:</a>
    <br>
    <a> 2 APIs used for information retrieval :</a>
    <li>https://api.coingecko.com/api/v3/coins/list.</li>
    <li>https://api.coingecko.com/api/v3/coins/.</li>
    
    <a>This projected was created using: HTML, CSS3, JAVASCRIPT, JQUERY, AJAX, REST API,  BOOTSTRAP.</a>
    <br>
    <p>To get started, feel free to select up to 5 coins to diplay in the live report.<br>
    If you would like to choose a sixth, you'll have to replace one of your currently selected coins with a new one</p>
    </div>
    <div class="section">
    <div class="container text-center">
    <a class="cc-facebook btn btn-link" href="https://www.facebook.com/shalata.mohammad"><i class="fa fa-facebook fa-2x " aria-hidden="true"></i></a>
    <a class="cc-twitter btn btn-link " href="https://www.linkedin.com/in/mohammad-shalata-437b09a6/"><i class="fa fa-linkedin fa-2x " aria-hidden="true"></i></a>
    <a class="cc-google-plus btn btn-link" href="https://github.com/Mohammad-shalata"><i class="fa fa-github fa-2x" aria-hidden="true"></i></a>
    <a class="cc-instagram btn btn-link" href="https://www.instagram.com/mohammadshalata/"><i class="fa fa-instagram fa-2x " aria-hidden="true"></i></a>
</div>
   <br>
   <br>
     </div>

     <div>
     <p class="copyright"><strong>Copyright &copy; 2021 by Mohammad Shalata</strong> </p>
 </div>
     </div>`);
    });

    $("#searchBotton").click(() => {
        const inputValue = $("#searchInput").val();
        if (inputValue === "") {
            alert("please enter name of coin");
        }
        $(".row").hide();
        $(".searchResult").html($(`.${inputValue}`));
    });
    /// ------------------------------------------------- //
});
