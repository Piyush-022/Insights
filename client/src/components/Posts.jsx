import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { PostContext } from "../PostContext";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const truncatedDetails =
    post.postDetail.length > 100
      ? post.postDetail.substring(0, 200) + "..."
      : post.postDetail;

  return (
    <Link className="w-full md:w-2/3" to={`/post/read/${post._id}`}>
      <div>
        <div className="post bg-white rounded-lg shadow-md m-2 p-4 flex flex-col">
          <p className=" font-bold text-sm text-gray-500">{post.tag}</p>
          <h1 className="text-xl font-bold mb-2">{post.postTitle}</h1>
          <p className="text-gray-600">
            {truncatedDetails}
            {truncatedDetails.length === 203 && (
              <span className=" underline text-blue">Read more</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};
const Posts = () => {
  const { userData, profileLoading } = useContext(UserContext);
  const { posts, loadMore, setLoadMore, postLeft } = useContext(PostContext);
  if (profileLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="posts-page flex flex-wrap justify-center p-4 w-full">
      {posts.map((post) => {
        return <Post key={post._id} post={post} className="" />;
      })}
      {postLeft && (
        <div className="w-full md:w-2/3 mt-5 flex justify-center">
          <button
            className=" text-violet-500 font-semibold"
            onClick={() => {
              setLoadMore(!loadMore);
            }}
          >
            Load More {">>"}
          </button>
        </div>
      )}
      {!postLeft && (
        <div className="w-full md:w-2/3 mt-5 flex justify-center text-black font-semibold">
          No more posts
        </div>
      )}
    </div>
  );
};

export default Posts;
