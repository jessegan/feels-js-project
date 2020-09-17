class EmotionsController < ApplicationController

    def index
        emotions = Entry.find(params[:entry_id]).emotions

        render json: EmotionSerializer.new(emotions).serialized_json
    end
end
