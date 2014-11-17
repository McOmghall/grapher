# encoding: UTF-8

require "anemone"

Anemone.crawl(URI.encode("http://es.wikipedia.org/wiki/España")) do |anemone|
  anemone.on_every_page do |page|
    puts page.url
  end
end
