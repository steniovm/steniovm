#!/bin/bash
echo "insira seu peso (kg):"
read peso
if [[($peso =~ ^[0-9]*\[0-9]+$||$var =~ ^[0-9]+$)]]
then
	echo "numero invalido"
fi
echo "insira sua altura (cm):"
read altura
if (echo $altura | egrep '[^0-9]' &> /dev/null)
then
	echo "numero invalido"
fi
echo "Seu IMC é: $(($peso*10000/($altura*$altura)))"
