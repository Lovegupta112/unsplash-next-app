export type PostType = {
  userId: {
    email: string;
    name: string;
  };
  postId: string;
  title: string;
  tags: string[];
  img: string;
};
