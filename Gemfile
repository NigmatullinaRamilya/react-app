source "https://rubygems.org"

ruby "2.5.1"

gem "pg"
gem "rails", "5.2.1"

# all other gems
gem "action_policy"
gem "decent_decoration"
gem "decent_exposure"
gem "devise"
gem "draper"
gem "foreman"
gem "interactor"
gem "kaminari"
gem "puma"
gem "seedbank"
gem "webpacker"

group :test do
  gem "capybara"
  gem "chromedriver-helper"
  gem "formulaic"
  gem "launchy"
  gem "selenium-webdriver"
  gem "shoulda-matchers"
end

group :development, :test do
  gem "awesome_print"
  gem "brakeman", require: false
  gem "bullet"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "faker"
  gem "pry-rails"
  gem "rspec-rails", "~> 3.5"
  gem "rubocop", require: false
  gem "rubocop-rspec", require: false
end

group :development do
  gem "letter_opener"
  gem "spring"
  gem "spring-commands-rspec"
  gem "spring-watcher-listen"
  gem "web-console"
end
