＃ chatspace＿DB

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

### Association
- has_many :groups
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|image|string||

### Association
- belongs_to :group
- belongs_to :user