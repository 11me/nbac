export interface Feed {
  id?:           number
  guid:          string
  title:         string
  author?:       string
  pub_date:      string
  content?:      string
  source_id:     number
  seen:          number
}

export interface Source {
  id?:           number
  name:          string
  url:           string
  last_update?:  number
  notify?:       number
  state?:        number
  source_type:   string
}

export interface Err {
  message: string
}

export interface DBResult {
  err?: Err
  changes?: number
  lastId?:  number
  data?:    any[]
}

export interface FetchResult {
  data?: any[] | any
  err?:  Err
}


export interface Alert {
  SelectSQL: string,
  TypeErr: string
}
