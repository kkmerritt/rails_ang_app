# this is not in use. code left for future improvements.

5.times do
  user = User.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password_digest: Faker::Internet.password
  )
  5.times do
    user.articles.create(
    location: Faker::Address.title,
    body: Faker::Lorem.paragraph,
    date_traveled: Faker::Date.backward(700)
    )
  end
end
