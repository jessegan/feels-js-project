# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

# Seed list of emotions
enjoyment = ["Happy","Loved","Relieved","Joy","Peaceful","Satisfied","Proud","Content"]
sadness = ["Sad","Lonely","Gloomy","Heartbroken","Disappointed","Hopeless","Lost","Depressed","Defeated"]
fear = ["Worried","Scared","Doubtful","Nervous","Anxious","Terrified","Desperate","Confused","Stressed"]
anger = ["Mad","Frustrated","Bitter","Annoyed","Vengeful","Insulted","Cheated"]

enjoyment.each do |emotion|
    Emotion.create(name:emotion)
end

sadness.each do |emotion|
    Emotion.create(name:emotion)
end

fear.each do |emotion|
    Emotion.create(name:emotion)
end

anger.each do |emotion|
    Emotion.create(name:emotion)
end



# Generate 15 entries
emotion_count = Emotion.count

15.times do
    entry = Entry.create(rating: Faker::Number.within(range: 1..100), note: Faker::Lorem.paragraph)
    
    3.times do
        random_emotion = Emotion.offset(Faker::Number.within(range: 0..emotion_count-1)).first
        entry.emotions << random_emotion
    end
end