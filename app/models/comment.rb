class Comment < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :name, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

end
