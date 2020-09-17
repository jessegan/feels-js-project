class EntryEmotion < ApplicationRecord
  belongs_to :entry
  belongs_to :emotion
end
