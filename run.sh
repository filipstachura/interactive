#!/bin/bash

R --slave -f ./evaluator/server.r > ./logs/evaluator.logs &
cd rpad; meteor
