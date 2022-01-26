import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Article } from "../interface/article.interface";
const unified = require("unified");
const highlight = require("remark-highlight.js");
var markdown = require("remark-parse");
var html = require("remark-html");

const postsDirectory = path.join(process.cwd(), "posts");

const getAllPostsIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

const getPostData = async (id: string): Promise<Article> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(markdown)
    .use(highlight)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    content: contentHtml,
    ...matterResult.data,
    theme: matterResult.data.theme || "indigo",
    tags: (matterResult.data.tags as string).trim().split(","),
  } as Article;
};

const getPostsBySeries = (series: string): Article[] => {
  const posts = getPostsData();
  return sortPosts(posts, "asc").filter((p) => p.series === series);
};

const sortPosts = (
  posts: Article[],
  direction: "asc" | "desc" = "desc"
): Article[] => {
  return posts.sort((a, b) => {
    if (direction === "desc") {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.date < b.date) {
        return -1;
      } else {
        return 1;
      }
    }
  });
};

const getPostsData = (): Article[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      tags: (matterResult.data.tags as string).trim().split(","),
    } as Article;
  });
  // Sort posts by date
  return sortPosts(allPostsData);
};

export { getAllPostsIds, getPostData, getPostsData, getPostsBySeries };
