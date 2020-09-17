class EntrySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :rating, :note
  has_many :emotions

  attribute :date do |obj|
    obj.created_at.in_time_zone('Eastern Time (US & Canada)')
  end

end
