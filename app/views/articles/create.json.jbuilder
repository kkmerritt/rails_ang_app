json.articles do
  json.id @articles.id
  json.user_id @articles.user_id
  json.title @articles.title
  json.body @articles.body
  json.date @articles.date
  json.comments []
end
