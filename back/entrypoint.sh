#!/bin/bash
set -e

# 既存のサーバープロセスのPIDファイルを削除
rm -f /app/tmp/pids/server.pid

# 元のコマンドを実行
exec "$@"