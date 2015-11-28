json.user current_user.name

json.articles(@articles) do |art|

  json.id art.id
  json.user_id art.user_id
  json.username art.user.name
  json.title art.title
  json.body art.body
  json.date art.date

  json.comments(art.comments) do |com|
    json.id com.id
    json.user_id com.user_id
    json.username com.user.name
    json.article_id com.article_id
    json.body com.body
  end

end
