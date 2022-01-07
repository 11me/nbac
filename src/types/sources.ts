export default interface DbSource {
  id: number;
  title: string;
  notifications: boolean;
  url: string;
  state: boolean;
  last_update: string;
  sourceType: string;
}

export default interface Test {
  id: number;
  name: string
}
