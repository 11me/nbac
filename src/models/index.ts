export interface Feed {
  id:           number,
  guid:         string,
  title:        string,
  author?:      string,
  pub_date:     string,
  content?:     string,
  source_id:    number,
  seen:         number // boolean
}

export interface Source {
  id:          number,
  name:        string,
  url:         string,
  last_update: number,
  notify:      number, // boolean
  state:       number, // boolean
  source_type: string
}
