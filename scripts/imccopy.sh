#!/bin/bash
#AUTOR: DOUGLAS
#DATA: 29/03/2015
#CALCULANDO O INDICE DE MASSA CORPORAL (IMC)

clear
echo
echo "  |-------------------------------------------|"
echo "  |     ------ CALCULANDO O IMC ------        |"
echo "  |-------------------------------------------|"
echo
echo

echo " Se o resultado for: "
echo
echo " Abaixo de 17 ----------- Muito abaixo do peso "
echo " Entre 17 e 18,49-------- Abaixo do peso"
echo " Entre 18,5 e 24,99 ----- Peso normal"
echo " Entre 25 e 29,99 ------- Acima do peso"
echo " Entre 30 e 34,99 ------- Obesidade I"
echo " Entre 35 e 39,99 ------- Obesidade II (severa)"
echo " Acima de 40 ------------ Obesidade III (mórbida)"
echo
echo

#ENTRADA DE DADOS
echo -n " DIGITE SUA ALTURA ... EX: (1.70) : "
read Altura
echo -n " DIGITE SEU PESO ... EX: (65.0) : "
read Peso
echo
#FIM ENTRADA DE DADOS


#CALCULO DO IMC
Imc=`bc << EOF
scale=2

$Peso / ($Altura * $Altura)

EOF
`
#FIM CALCULO IMC

#RESULTADO DO IMC

MuitoAbaixoPeso=`echo "scale=2 ; $Imc <= 17" | bc`
AbaixoPeso=`echo "scale=2 ; $Imc >= 17.01 && $Imc <= 18.49" | bc`
PesoNormal=`echo "scale=2 ; $Imc >= 18.5 && $Imc <= 24.99" | bc`
AcimaPeso=`echo "scale=2 ; $Imc >= 25 && $Imc <= 29.99" | bc`
Obesidade1=`echo "scale=2 ; $Imc >= 30 && $Imc <= 34.99" | bc`
Obesidade2=`echo "scale=2 ; $Imc >= 35 && $Imc <= 39.99" | bc`
Obesidade3=`echo "scale=2 ; $Imc >= 40" | bc`


if [ $MuitoAbaixoPeso -eq 1 ]
   then
      echo "Seu IMC é $Imc, voce esta muito abaixo do seu peso."
   else
      if [ $AbaixoPeso -eq 1 ]
         then
            echo "Seu IMC é $Imc, voce esta abaixo do seu peso."
         else
            if [ $PesoNormal -eq 1 ]
               then
                  echo "Seu IMC é $Imc, voce esta no seu peso normal."
               else
                  if [ $AcimaPeso -eq 1 ]
                     then
                        echo "Seu IMC é $Imc, voce esta acima do seu peso."
                     else
                        if [ $Obesidade1 -eq 1 ]
                           then
                              echo "Seu IMC é $Imc, voce esta com obesidade 1."
                           else
                              if [ $Obesidade2 -eq 1 ]
                                 then
                                    echo "Seu IMC é $Imc, voce esta com obesidade 2."
                                 else
                                    if [ $Obesidade3 -eq 1 ]
                                       then
                                          echo "Seu IMC é $Imc, voce esta com obesidade 3."
                                    fi
                             fi
                        fi
                 fi
           fi
     fi
fi

echo