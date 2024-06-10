#!/bin/bash

if [ ! -d "out" ]; then
  mkdir "out"
fi

pdflatex ./engineer.tex

extensions=("aux" "bcf" "log" "pdf" "run.xml" "loc" "toc")

for ext in "${extensions[@]}"; do
  mv "main.${ext}" ./out
  echo "Moved main.${ext}"
done
