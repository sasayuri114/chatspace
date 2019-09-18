class Comment < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :name, presence: true, unless: :image?
end
