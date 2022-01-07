interface Feed {
  title:   string
  author:  string
  pubDate: string
  content: string
}

export interface Feeds {
  feeds: Feed[]
}
