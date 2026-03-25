import { useState, useEffect } from 'react';
import { ALL_ARTICLES, HASHNODE_QUERY } from '../data/constants';

export const useVisitorCount = () => {
  const [visitors, setVisitors] = useState(null);
  
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/sampratigaurav-portfolio/visits/up');
        const data = await res.json();
        setVisitors(data.count);
      } catch {
        setVisitors(null);
      }
    };
    fetchVisitors();
  }, []);
  
  return { visitors };
};

export const useGitHubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [contribTotal, setContribTotal] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/sampratigaurav?y=last');
        const data = await res.json();
        setContributions(data.contributions);
        setContribTotal(data.total.lastYear ?? Object.values(data.total).reduce((a, b) => a + b, 0));
      } catch {
        setContributions([]);
      }
    };
    fetchContributions();
  }, []);

  return { contributions, contribTotal };
};

export const useHashnodeArticles = () => {
  const [posts, setPosts] = useState([]);
  const [articleCount, setArticleCount] = useState(15);

  useEffect(() => {
    const fallbackPosts = ALL_ARTICLES.slice(0, 3).map(a => ({
      title: a.title,
      url: a.url,
      publishedAt: a.date
    }));

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: HASHNODE_QUERY }),
        });
        const data = await res.json();
        const fetchedPosts = data?.data?.publication?.posts?.edges?.map(e => e.node);
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          setPosts(fallbackPosts);
        }
      } catch {
        setPosts(fallbackPosts);
      }
    };

    const fetchArticleCount = async () => {
      try {
        const res = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                publication(host: "sampratigaurav.hashnode.dev") {
                  posts(first: 50) {
                    totalDocuments
                  }
                }
              }
            `
          }),
        });
        const data = await res.json();
        const count = data?.data?.publication?.posts?.totalDocuments;
        if (count) setArticleCount(count);
      } catch {
        // keep fallback 15
      }
    };

    fetchPosts();
    fetchArticleCount();
  }, []);

  return { posts, articleCount };
};
