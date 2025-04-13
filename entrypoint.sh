#!/bin/sh
cat /build_time.txt
pm2-runtime start pm2.config.cjs

