#!/bin/bash

for number in $(seq 10 14); do
  mv "chapters/chapter_${number}" "chapters/chapter_$((number - 1))"
done
