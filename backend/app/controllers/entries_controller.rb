class EntriesController < ApplicationController

    # renders the json for all entries
    def index
        entries = Entry.all

        render json: EntrySerializer.new(entries).serialized_json
    end

end
