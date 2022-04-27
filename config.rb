config[:signup] = true

require 'slim'
require 'sass'

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload,
    no_swf: true,
    livereload_css_target: 'assets/stylesheets/app.css.sass'
end

activate :middleman_simple_thumbnailer

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# turn all year-shaped directories into proxy pages
Dir.entries('source').select{|entry| File.directory?(File.join('source',entry)) && entry =~ /\d{4}/ }.each do |path|
  proxy "/#{path}/index.html", 'year.html', locals: { year: path }, ignore: true
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings
#
activate :external_pipeline,
  name: :webpack,
  command: build? ? 'yarn run build' : 'yarn run watch',
  source: ".tmp/dist",
  latency: 1

configure :build do
end

ignore /.swp/
ignore /.keep/
