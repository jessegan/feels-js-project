class EmotionsController < ApplicationController

    def show
        emotion = Emotion.find(params[:id])

        render json: EmotionSerializer.new(emotion).serialized_json
    end
end
