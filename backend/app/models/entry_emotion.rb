class EntryEmotion < ApplicationRecord

  # ASSOCIATIONS

  belongs_to :entry
  belongs_to :emotion
  
end
