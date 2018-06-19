#!/bin/sh

if [ -d $1 ]; then
  find $1 -name '*.rar' -execdir unrar e {} \; 
fi
