#!/bin/bash
testage=false
while [ "$testage" = false ]
do
	echo "insira seu peso (kg):"
	read peso;
	if [[ ($peso =~ ^[0-9]*\.[0-9]+$ || $peso =~ ^[0-9]+$)]];
	then
		testage=true;
	else
		echo "numero invalido"
	fi
done

testage=false
while [ "$testage" = false ]
do
	echo "insira sua altura (m):"
	read altura
	if [[ ($altura =~ ^[0-9]*\.[0-9]+$ || $altura =~ ^[0-9]+$)]];
	then
		testage=true;
	else
		echo "numero invalido"
	fi
done
imc=$(echo "$altura * $altura" | bc -l)
imc=$(echo "$peso / $imc" | bc -l)
echo "Seu IMC é: $imc"

imc1=`echo "scale=2 ; $imc <= 18.5" | bc`
imc2=`echo "scale=2 ; $imc > 18.5 && $Imc <= 25" | bc`
imc3=`echo "scale=2 ; $imc > 25 && $Imc <= 30" | bc`
imc4=`echo "scale=2 ; $imc > 30 && $Imc <= 35" | bc`
imc5=`echo "scale=2 ; $imc > 35 && $Imc <= 40" | bc`
imc6=`echo "scale=2 ; $imc > 40" | bc`
if [ $imc1 -eq 1 ]
   then
      echo "Seu IMC indica estado de magreza. Tente ganhar peso"
   else
      if [ $imc2 -eq 1 ]
         then
            echo "Seu IMC indica saudável, mantenha seu peso."
         else
            if [ $imc3 -eq 1 ]
               then
                  echo "Seu IMC indica sobrepeso, tenha atenção."
               else
                  if [ $imc4 -eq 1 ]
                     then
                        echo "Seu IMC indica obesidade grau 1, procure perder peso."
                     else
                        if [ $imc5 -eq 1 ]
                           then
                              echo "Seu IMC indica obesidade grau 2, perca peso imediatamente."
                           else
                              if [ $imc6 -eq 1 ]
                                 then
                                    echo "Seu IMC indica obesidade grau 3, considere intervenção cirurgica."
                             fi
                        fi
                 fi
           fi
     fi
fi