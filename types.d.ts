interface EventType {
  id: string;
  type: string;
  actor: Actor;
  repo: Repo;
  payload: Payload;
  public: boolean;
  created_at: string;
}

interface Payload {
  action: string;
  repository_id: number;
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string;
  ref_type: string;
  head: string;
  before: string;
  commits: Commit[];
}

interface Commit {
  sha: string;
  author: Author;
  message: string;
  distinct: boolean;
  url: string;
}

interface Author {
  email: string;
  name: string;
}

interface Repo {
  id: number;
  name: string;
  url: string;
}

interface Actor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}