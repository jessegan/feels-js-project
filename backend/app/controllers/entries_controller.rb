class EntriesController < ApplicationController

    # renders the json for all entries
    def index
        entries = Entry.all

        render json: EntrySerializer.new(entries).serialized_json
    end

    # creates a new Entry based on params and renders json for new entry
    def create
        puts entryParams
        entry = Entry.new(entryParams)

        if entry.save
            render json: EntrySerializer.new(entry).serialized_json
        else
            render json: {
                error: "Problem creating new Entry.",
                status: "400"
            }, status: 400
        end
    end

    # destroys the entry based on id in params
    def destroy
        entry = Entry.find(params[:id])

        if entry
            entry.destroy
            render json: EntrySerializer.new(entry).serialized_json
        else
            render json: {
                error: "Could not find an entry with id #{params[:id]}.",
                status: "400"
            }, status: 400
        end
    end

    private

    def entryParams
        params.require(:entry).permit(:rating,emotion_ids:[])
    end

end
