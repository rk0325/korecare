# frozen_string_literal: true

class SorceryCore < ActiveRecord::Migration[7.0]
  def change
    # 既存のusersテーブルにcrypted_passwordカラムとsaltカラムを追加
    add_column :users, :crypted_password, :string
    add_column :users, :salt, :string

    # 既存のusersテーブルのemailカラムにユニークインデックスを追加
    add_index :users, :email, unique: true
  end
end
