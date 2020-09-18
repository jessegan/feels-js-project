class EmotionsController < ApplicationController

    def index
        emotions = Emotion.all

        render json: EmotionSerializer.new(emotions).serialized_json
    end

    def entry
        emotions = Entry.find(params[:entry_id]).emotions

        render json: EmotionSerializer.new(emotions).serialized_json
    end
end
