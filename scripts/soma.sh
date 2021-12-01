#!/bin/bash
echo "insira um valor numerico:"
read number1
if (echo $number1 | egrep '[^0-9]' &> /dev/null)
then
	echo "numero invalido"
fi
read number2
if (echo $number2 | egrep '[^0-9]' &> /dev/null)
then
	echo "numero invalido"
fi
echo "a soma dos dois numeros é $(($number1+$number2))"

