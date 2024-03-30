# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_30_153230) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.text "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
  end

  create_table "cosmetic_usages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "item_type", null: false
    t.date "open_date", null: false
    t.date "expiry_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cosmetic_usages_on_user_id"
  end

  create_table "favorite_cosmetics", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "price"
    t.string "item_url"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "item_code"
    t.index ["user_id", "item_code"], name: "index_favorite_cosmetics_on_user_id_and_item_code", unique: true
    t.index ["user_id"], name: "index_favorite_cosmetics_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "skin_trouble"
    t.string "skin_type"
    t.integer "age"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
    t.bigint "address_id"
    t.string "prefecture"
    t.index ["address_id"], name: "index_profiles_on_address_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "review_tags", force: :cascade do |t|
    t.bigint "review_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["review_id"], name: "index_review_tags_on_review_id"
    t.index ["tag_id"], name: "index_review_tags_on_tag_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "favorite_cosmetic_id"
    t.integer "rating"
    t.string "title"
    t.text "body"
    t.boolean "visibility"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "profile_id"
    t.integer "age"
    t.string "skin_type"
    t.string "skin_trouble"
    t.index ["favorite_cosmetic_id"], name: "index_reviews_on_favorite_cosmetic_id"
    t.index ["profile_id"], name: "index_reviews_on_profile_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "tag_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
    t.boolean "receive_notifications_weather", default: false
    t.boolean "receive_notifications_expiration_date", default: false
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end

  add_foreign_key "cosmetic_usages", "users"
  add_foreign_key "favorite_cosmetics", "users"
  add_foreign_key "profiles", "addresses"
  add_foreign_key "profiles", "users"
  add_foreign_key "review_tags", "reviews"
  add_foreign_key "review_tags", "tags"
  add_foreign_key "reviews", "favorite_cosmetics"
  add_foreign_key "reviews", "profiles"
  add_foreign_key "reviews", "users"
end
