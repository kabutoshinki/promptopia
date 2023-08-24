"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: any) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState<any[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) => regex.test(item?.creator?.username) || regex.test(item?.tag) || regex.test(item?.prompt)
    );
  };

  // const filterPrompts = (searchText: string) => {
  //   const regex = new RegExp(`${searchText}`, "i"); // 'i' flag for case-insensitive search
  //   return allPosts.filter(
  //     (item) => regex.test(item?.creator?.username) || regex.test(item?.tag) || regex.test(item?.prompt)
  //   );
  // };

  const handleSearchChange = (e: any) => {
    console.log(e.target.value);

    // clearTimeout(searchTimeout);
    if (searchTimeout) {
      clearTimeout(searchTimeout); // Clear the previous timeout if it exists
    }
    setSearchText(e.target.value);

    // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = filterPrompts(e?.target?.value);
    //     setSearchedResults(searchResult);
    //   }, 500)
    // );
    const timeoutId = setTimeout(() => {
      const searchResult = filterPrompts(e?.target?.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
