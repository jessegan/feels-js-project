class Entry < ApplicationRecord

    ### ASSOCIATIONS

    has_many :entry_emotions, dependent: :destroy
    has_many :emotions, through: :entry_emotions

    ### VALIDATIONS

    validates :rating, presence: true
    validates :note, length: {maximum: 250}

    ### SCOPES

    default_scope {order(created_at: :desc)}

end
