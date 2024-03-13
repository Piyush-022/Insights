import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export const PostContext = createContext({});
export const PostContextProvider = ({ children }) => {
  const { setProfileLoading, profileLoading } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [postLeft, setPostLeft] = useState(true);

  const loadPosts = async () => {
    try {
      setProfileLoading(true);
      const { data } = await axios.get("/post?offset=" + offset);
      if (data.posts.length < 10) {
        setPostLeft(false);
      }
      setPosts((prev) => [...prev, ...data.posts]);
      setOffset(offset + 10);
    } catch (error) {
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [loadMore]);

  return (
    <PostContext.Provider value={{ posts, postLeft, loadMore, setLoadMore }}>
      {children}
    </PostContext.Provider>
  );
};
