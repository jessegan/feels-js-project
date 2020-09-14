class Entry < ApplicationRecord

    ### ASSOCIATIONS

    ### VALIDATIONS

    validates :rating, presence: true
    validates :note, length: {maximum: 250}

    ### SCOPES

    default_scope {order(created_at: :asc)}

end
