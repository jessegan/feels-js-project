class EntrySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :rating, :note

  has_many :emotions, links: {
    emotions: -> (obj) {
      "http://localhost:3000/entries/#{obj.id}/emotions"
    }
  }

  attribute :date do |obj|
    obj.created_at.in_time_zone('Eastern Time (US & Canada)')
  end

end
