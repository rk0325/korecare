#!/bin/bash
set -e

# 既存のサーバープロセスのPIDファイルを削除
rm -f /app/tmp/pids/server.pid

# データベースマイグレーションを実行
bundle exec rake db:migrate

# シードデータをデータベースに挿入
bundle exec rails db:seed

# 元のコマンドを実行
exec "$@"