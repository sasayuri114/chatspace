＃ chatspace＿DB

## usersテーブル
|Column|Type|Options|
|name|string|null: false,index: true|
|email|string|null: false|

### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :comments


## groupsテーブル
|Column|Type|Options|
|name|string|null: false,index: true|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :comments


## group_usersテーブル
|Column|Type|Options|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## commentsテーブル
|Column|Type|Options|
|name|string|null: false,index: true|
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|



### Association
- belongs_to :user
- belongs_to :group