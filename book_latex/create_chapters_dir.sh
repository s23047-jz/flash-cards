#!/bin/bash


if [ ! -d "chapters" ]; then
  mkdir "chapters"
fi


for number in $(seq 1 14); do
  if [ ! -d "chapters/chapter_${number}" ]; then
        mkdir "chapters/chapter_${number}"
        touch "chapters/chapter_${number}/main.tex"
        echo "Created directory chapter_${number}"
    else
        echo "Directory chapter_${number} already exists"
    fi
done
