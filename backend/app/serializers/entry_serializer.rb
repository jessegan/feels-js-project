class EntrySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :rating, :note, :created_at

end
