#!/bin/bash
set -e

# 既存のサーバープロセスのPIDファイルを削除
rm -f /app/tmp/pids/server.pid

# データベースのマイグレーションを実行
bundle exec rake db:migrate

# シードデータを挿入
bundle exec rake db:seed

# 元のコマンドを実行（この場合はCMDに指定されたRailsサーバー）
exec "$@"