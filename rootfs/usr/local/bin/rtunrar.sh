#!/bin/sh

if [ -d $1 ]; then
  cd $1
  unrar x *.rar &>/dev/null
fi

