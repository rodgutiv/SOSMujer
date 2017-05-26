    $(document).ready(function(){
        
        $('button#sos').on('click', function(e){
            e.preventDefault();
              if(parseInt(localStorage.getItem("alerta")) == 0){

                localStorage.setItem("alerta", 1);
                navigator.geolocation.getCurrentPosition(function(position){
               var pos = position.coords.latitude  + ',' + position.coords.longitude+'@'+ Date();
               var socket = io.connect('http://proyecto.myftp.org:3000');
               socket.emit('chat message', {info: localStorage.getItem("telefono")+'@'+pos, al: 1});
               //cordova.plugins.backgroundMode.setDefaults({hidden: true});
               cordova.plugins.backgroundMode.enable();
                });
            }
            
        });
        
        $('a#cancel-alert').on('click', function(e){
            e.preventDefault();
            localStorage.setItem("alerta", 0);
            var socket = io.connect('http://proyecto.myftp.org:3000');
            socket.emit('chat message',{info: localStorage.getItem("telefono"), al: -1});
            cordova.plugins.backgroundMode.disable();
            $( "#popupCancel" ).popup( "open" );
        });
        
        $('button#entrar').on('click', function(e){
            e.preventDefault();
            if($('#tel').val() != '' && $('#pass').val() != ''){
                loginCheck();
            }
        });
        
        $('button#registrar').on('click', function(e){
            e.preventDefault();
            var tel = $('#tel-r').val();

            if(tel.length != 10){
                $('div#error').find('p#msj').text('El teléfono no tiene el formato correcto.');
                $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});
            }else{
                if($('#tel-f').val().length != 10){
                   $('div#error').find('p#msj').text('El teléfono del familiar no tiene el formato correcto.');
                    $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});
                   }else{
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                if(!re.test($('#email-r').val())){
                $('div#error').find('p#msj').text('El Email no tiene el formato correcto.');
                $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});
                }else{
                    if($('#pass1').val().length < 4){
                    $('div#error').find('p#msj').text('La contraseña debe tener al menos 4 digitos.');
                    $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});
                    }else{
                        if($('#pass1').val() != $('#pass2').val()){
                        $('div#error').find('p#msj').text('Las contraseñas no coinciden.');
                        $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});
                        }else{
                            registro();
                        }
                    }
                }
            }
        }
        });
        
        /// Verifica Logeo
function loginCheck() {	
    var tels = $('#tel').val();
    $.ajax({
        type: "POST",
        url: "http://proyecto.myftp.org/hackton/login/login-session.php",
        data:{tel: tels, pass: $('#pass').val()},
        success:function(info){
            //console.log(info);
                switch(parseInt(info))
                    {
               	  case -1:
                  $('div#error').find('p#msj').text('Algún campo es incorrecto, verfica nuevamente.');
                  $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});         
                  break;
                    default:
                        localStorage.setItem("alerta", 0);
                        localStorage.setItem("telefono", info);
                        $.mobile.pageContainer.pagecontainer("change", "#three", { transition: 'slide'});  
               		}
        }                  
    });
}
        
        /// nuevo Registro
function registro() {		
    $.ajax({
        type: "POST",
        url: "http://proyecto.myftp.org/hackton/login/signup.php",
        data:{tel: parseInt($('#tel-r').val()), telf: parseInt($('#tel-f').val()), email: $('#email-r').val(), pass: $('#pass1').val()},
        success:function(info){
            console.log(info);
                switch(parseInt(info))
                    {
                  case 1:
                  $.mobile.pageContainer.pagecontainer("change", "#signin", { transition: 'slide'});         
                  break;
               	  case -1:
                  $('div#error').find('p#msj').text('Ha ocurrido un error, intenta nuevamente');
                  $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});         
                  break;
                  case -2:
                  $('div#error').find('p#msj').text('Ya existe ese teléfono, regresa a recuperar tu cuenta.');
                  $.mobile.pageContainer.pagecontainer("change", "#error", {role: 'dialog', transition: 'pop'});         
                  break;
               		}
        }                  
    });
}
        
$(document).on( "pageinit", "#three", function() {

  var x=document.getElementById("demo");
    if (navigator.geolocation)
            {
            navigator.geolocation.getCurrentPosition(showPosition,showError);
            }
          else{x.innerHTML="Geolocalización no está soportada.";}
        // Comienza seguimiento    
        setInterval(function(){
            if (navigator.geolocation)
            {
            navigator.geolocation.getCurrentPosition(showPosition,showError);
            }
          else{x.innerHTML="Geolocalización no está soportada.";}
            
        }, 8000);
});

function showPosition(position)
  {
  var x=document.getElementById("demo");
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  latlon=new google.maps.LatLng(lat, lon)
  mapholder=document.getElementById('googleMap')
  mapholder.style.height='300px';
  mapholder.style.width='100%';
  var myOptions={
  center:latlon,zoom:15,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),myOptions);
  var marker=new google.maps.Marker({position:latlon,map:map,title:"Estás aquí."});
  }
        
function showError(error)
  {
  var x=document.getElementById("demo");
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="No se ha permitido Geolocalización, borra el cache e inteneta nuevamente."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Localización no disponible."
      break;
    case error.TIMEOUT:
      x.innerHTML="Localización ha demorado mucho, intenta nuevamente."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="Ha ocurrido un error.."
      break;
    }
  }

    });


