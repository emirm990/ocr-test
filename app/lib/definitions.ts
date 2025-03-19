export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Record = {
  id: string;
  user_id: string;
  text: string;
  imagepath: string;
}
