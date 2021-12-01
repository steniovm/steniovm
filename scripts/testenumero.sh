#!/bin/bash
read variavel

 if (echo $variavel | egrep '[^0-9]' &> /dev/null)
 then
 # variavel nao numerica
 echo "Variavel $variavel nao e numerica"
 else
 # E numerica ou nula. Precisa testar isso tambem.
 echo "Variavel $variavel e numerica."
 fi