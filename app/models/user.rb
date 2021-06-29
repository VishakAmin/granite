class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  validates :name, presence: true, length: {maximum: 30}
  has_many :tasks, dependent: :destroy

  has_secure_password
  has_secure_token :authentication_token
  validates :password, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create
  has_many :comments, dependent: :destroy


  validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX }
  before_save :to_lowercase   

  private
  
  def to_lowercase
    email.downcase!
  end
end