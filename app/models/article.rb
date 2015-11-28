class Article < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true
  validates :date, presence: true

  belongs_to :user, foreign_key: :user_id
  has_many :comments, dependent: :destroy
end
