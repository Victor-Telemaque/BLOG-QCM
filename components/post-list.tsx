import { FunctionComponent } from "react";
import { Article } from "../interface/article.interface";
import PostCard from "./post-card";

type PostListProps = {
  items: Article[];
};

const PostList: FunctionComponent<PostListProps> = (props) => {
  const { items } = props;

  return (
    <div className="mt-8">
      <h1 className="text-4xl mb-4 tracking-tight font-extrabold dark:text-cool-gray-100">
        Recent <span className="text-red-400">posts</span>
      </h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-flow-row auto-rows-fr">
        {items.map((item) => (
          <PostCard {...item}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default PostList;
