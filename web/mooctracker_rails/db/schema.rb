# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140626092225) do

  create_table "courses", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "createdAt"
    t.datetime "updatedAt"
  end

  create_table "projects", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.text     "description"
    t.string   "tutorialUrl"
    t.string   "projectSite"
    t.string   "githubUrl"
    t.date     "start"
    t.date     "end"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "createdAt"
    t.datetime "updatedAt"
  end

  create_table "studentcourses", force: true do |t|
    t.string   "courseTitle"
    t.date     "courseStart"
    t.date     "courseEnd"
    t.datetime "createdAt"
    t.datetime "updatedAt"
    t.string   "course_id"
    t.string   "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.binary   "image"
    t.datetime "createdAt"
    t.datetime "updatedAt"
  end

end
