$(document).ready(function(){
    let dados = {
        'data1' : undefined,
        'data2' : 'BRL',
        'moeda1' : undefined,
        'moeda2' : undefined,
        'tx1' : undefined,
        'tx2' : undefined,
        'txgeral' : undefined,
    }
    $.ajax({url:"https://economia.awesomeapi.com.br/json/all"})
    .done((data)=>{
        Object.entries(data).forEach(moeda => {
            $("#moedain").append(`<option>${moeda[0]}</option>`);
            $("#moedaout").append(`<option>${moeda[0]}</option>`);
        });
    });
    $('#moedain').on("change",function(){
        dados.moeda1 = $('#moedain').val();
        if (!dados.moeda2){
            $('#moedaout').val($('#moedain').val());
            dados.moeda2 = $('#moedaout').val();
        }
        console.log(dados.moeda1);
    });
    $('#datein').on("change",function(){
        dados.data1 = $('#datein').val().replaceAll('-','');
        if (!dados.data2){
            $('#dateout').val($('#datein').val());
            dados.data2 = $('#dateout').val().replaceAll('-','');
        }
        console.log(dados.data1);
    });
    $('#moedaout').on("change",function(){
        dados.moeda2 = $('#moedaout').val();
        console.log(dados.moeda2);
    });
    $('#dateout').on("change",function(){
        dados.data2 = $('#dateout').val().replaceAll('-','');
        console.log(dados.data2);
    });
    $("#cotar").click(function(){
        $("#det1").html('');
        $("#det2").html('');
        $("#desc").html('');
        $("#result").html('');
        $("#resultmoeda").html('');
        if(dados.moeda1 && dados.moeda2 && dados.data1 && dados.data2){ 
            console.log(`consulta a: https://economia.awesomeapi.com.br/${dados.moeda1}/10?start_date=${dados.data1}&end_date=${dados.data1}`);
            $.ajax({url:`https://economia.awesomeapi.com.br/${dados.moeda1}/10?start_date=${dados.data1}&end_date=${dados.data1}`})
            .done(date => {
                if (date.length >0){
                    console.log(date[0]);
                    dados.tx1=date[0].bid;
                    $("#det1").append("conversão: " + date[0].name+"<br/>");
                    $("#det1").append("ultima cotação: " + date[0].ask+"<br/>");
                    $("#det1").append("criação: " + date[0].create_date+"<br/>");
                    $("#det1").append("maximo dia: " + date[0].high+"<br/>");
                    $("#det1").append("minimo dia: " + date[0].low+"<br/>");
                    $("#det1").append("fechamento: " + date[0].bid+"<br/>");
                }else{
                    alert(`dados indisponiveis para ${dados.moeda1}`);
                }
            })
            .done(function(){
                if(dados.moeda2 != 'BRL'){
                    console.log(`consulta a: https://economia.awesomeapi.com.br/${dados.moeda2}/10?start_date=${dados.data2}&end_date=${dados.data2}`);
                    $.ajax({url:`https://economia.awesomeapi.com.br/${dados.moeda2}/10?start_date=${dados.data2}&end_date=${dados.data2}`})
                    .done(date => {
                        if (date.length >0){
                            console.log(date[0]);
                            dados.tx2=date[0].bid;
                            $("#det2").append("conversão: " + date[0].name+"<br/>");
                            $("#det2").append("ultima cotação: " + date[0].ask+"<br/>");
                            $("#det2").append("criação: " + date[0].create_date+"<br/>");
                            $("#det2").append("maximo dia: " + date[0].high+"<br/>");
                            $("#det2").append("minimo dia: " + date[0].low+"<br/>");
                            $("#det2").append("fechamento: " + date[0].bid+"<br/>");
                        }else{
                            alert(`dados indisponiveis para ${dados.moeda2}`);
                        }
                    })
                    .done(function(){
                        if (dados.tx1 && dados.tx2){
                            dados.txgeral = dados.tx1/dados.tx2;
                            console.log(dados);
                            $("#desc").html(`1 ${dados.moeda1} em ${$('#datein').val()} equivale a ${dados.txgeral} ${dados.moeda2} em ${$('#dateout').val()}`);
                            $("#result").html(Math.round(dados.txgeral * 100)/100);
                            $("#resultmoeda").html(`${dados.moeda1} / ${dados.moeda2}`);
                        }
                    });
                }else{
                    dados.txgeral = dados.tx1;
                    console.log(dados);
                    $("#desc").html(`1 ${dados.moeda1} em ${$('#datein').val()} equivale a ${dados.txgeral} ${dados.moeda2} em ${$('#dateout').val()}`);
                    $("#result").html(Math.round(dados.txgeral * 100)/100);
                    $("#resultmoeda").html(`${dados.moeda1} / ${dados.moeda2}`);
                }
            });
        }else{
            alert("preencha todos os campos");
        }
    });
});

