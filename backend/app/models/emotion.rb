class Emotion < ApplicationRecord

    # ASSOCIATIONS

    has_many :entry_emotions, dependent: :destroy
    has_many :entries, through: :entry_emotions

    # VALIDATIONS

    validates :name, presence: true

    # SCOPES

    default_scope {order(name: :asc)}

end
