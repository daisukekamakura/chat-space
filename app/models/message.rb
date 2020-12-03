class Message < ApplicationRecord
  belong_to :group
  belong_to :user

  validates :name, presence: true, uniqueness: true
end
