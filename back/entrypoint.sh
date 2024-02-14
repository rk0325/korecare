#!/bin/bash
set -e

# 既存のサーバープロセスのPIDファイルを削除
rm -f /app/tmp/pids/server.pid

# シードデータを挿入
rails db:seed

# 元のコマンドを実行
exec "$@"