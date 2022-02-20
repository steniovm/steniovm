const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      listType: 'search',
      height: '360',
      width: '640',
      videoId: '-99KRl6U4kY'
    });
  }

$(function(){$("#tabs").tabs();});
$(function(){$(".accordion").accordion();});
  
$(document).ready(function(){
    $('#sendfind').on("click",function(){
        let findtag = $('#findin').val();
        if (findtag == ''){
            alert('digite uma palavra ou expressão para procurar um video.')
            return false;
        }
        $.ajax({url:`http://www.youtube.com/embed?listType=search&list=${findtag}`})
        .done((list)=>{
            player.list = list;
            //$('#player').html(list);
        }).fail(function(error){
            alert( "Error na tentativa de pesquisa\nTente novamente mais tarde" );
			console.log(error);
			return false
        });
        alert($('#findin').val());
        return true;
    })
});
/*    $('#sendcep').on("click",function(){
        let cep = $('#cepin').val();
        const validacep = /^[0-9]{8}$/;
        if(validacep.test(cep)){
            $.ajax({url:"https://cep.awesomeapi.com.br/json/"+cep})
            .done((dados)=>{
                $('.output').eq(0).html(dados.address_type+" "+dados.address_name);
                $('.output').eq(1).html("Bairro: "+dados.district);
                $('.output').eq(2).html("Municipio: "+dados.city+"/"+dados.state);
                $('.output').eq(3).html("Latitude: "+dados.lat);
                $('.output').eq(4).html("Longitude: "+dados.lng);
                $('.output').eq(5).html("DDD: ("+dados.ddd+") 0000-0000");
                $('.output').eq(6).html("IBGE: "+dados.city_ibge);
                $('.output').eq(7).html("CEP: "+dados.cep);
                plotarmapa(dados);
            }).fail(function(error) {
				alert( "Error na tentativa de consulta\nVerifique o CEP digitado" );
				console.log(error);
				return false});
        }else{
            alert("Formato de CEP incorreto\ndigite apenas 8 algarismos numericos.")
        }
    });
    function plotarmapa(dados){
		//`https://www.google.com/maps?api=1&q=${lat}%2C${lng}&hl=es;z=14&output=embed`
        const urlmap = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD9aYWJbEoJOUJ-3OE5JsemY1IotoZdyXo&q=${dados.cep}&center=${dados.lat},${dados.lng}&zoom=18`;
        console.log(urlmap);
        $('iframe').attr('src',urlmap);
    }
});*/