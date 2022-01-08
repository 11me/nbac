export interface Feed {
  id:          number,
  guid:        string,
  title:       string,
  author:      string,
  pub_date:    string,
  content:     string,
  source_id:   number,
  seen:        boolean
}

export interface Source {
  id:          number,
  url:         string,
  last_update: string,
  notify:      boolean,
  state:       boolean
}
