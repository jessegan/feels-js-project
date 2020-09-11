class EntrySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :rating, :note

  attribute :date do |obj|
    obj.created_at.in_time_zone('Eastern Time (US & Canada)').to_date
  end

  attribute :time do |obj|
    obj.created_at.in_time_zone('Eastern Time (US & Canada)').to_s(:time)
  end

end
