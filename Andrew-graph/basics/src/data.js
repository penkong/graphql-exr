// demo user data
let users = [
  {
    id: "1",
    name: "mk",
    email: "tse@gmial.com",
  },
  {
    id: "2",
    name: "mk2",
    email: "1tse@gmial.com",
  },
  {
    id: "3",
    name: "mk3",
    email: "2tse@gmial.com",
  },
  {
    id: "4",
    name: "mk4",
    email: "3tse@gmial.com",
  },
];

let posts = [
  { id: "11", title: "post1", body: "body1", published: false, author: "1" },
  { id: "12", title: "post2", body: "body2", published: false, author: "2" },
  { id: "13", title: "post3", body: "body3", published: true, author: "3" },
];

let comments = [
  { id: "24", text: "hale lu yaaaaa!", author: "3", post: "12" },
  { id: "32", text: "hale na lu yaaaaa!", author: "4", post: "13" },
  { id: "43", text: "hale bashe lu yaaaaa!", author: "1", post: "11" },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
