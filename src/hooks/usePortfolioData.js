import { useState, useEffect } from 'react';
import { ALL_ARTICLES, HASHNODE_QUERY } from '../data/constants';

export const useVisitorCount = () => {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch(
          'https://api.counterapi.dev/v1/sampratigaurav-portfolio/visits/up'
        );
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
        const res = await fetch(
          'https://github-contributions-api.jogruber.de/v4/sampratigaurav?y=last'
        );
        const data = await res.json();
        setContributions(data.contributions);
        setContribTotal(
          data.total.lastYear ??
            Object.values(data.total).reduce((a, b) => a + b, 0)
        );
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
    const fallbackPosts = ALL_ARTICLES.slice(0, 3).map((a) => ({
      title: a.title,
      url: a.url,
      publishedAt: a.date,
    }));

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: HASHNODE_QUERY }),
        });
        const data = await res.json();
        const fetchedPosts = data?.data?.publication?.posts?.edges?.map(
          (e) => e.node
        );
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
            `,
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

export const useGitHubActivity = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/users/sampratigaurav/events/public'
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        const validEvents = data
          .filter((e) =>
            ['PushEvent', 'CreateEvent', 'WatchEvent'].includes(e.type)
          )
          .slice(0, 10);

        const getRelativeTime = (dateStr) => {
          const diffInSeconds = Math.floor(
            (new Date() - new Date(dateStr)) / 1000
          );
          if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
          const diffInMinutes = Math.floor(diffInSeconds / 60);
          if (diffInMinutes < 60)
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
          const diffInHours = Math.floor(diffInMinutes / 60);
          if (diffInHours < 24)
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
          const diffInDays = Math.floor(diffInHours / 24);
          return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        };

        const formattedLogs = validEvents.map((e) => {
          const time = getRelativeTime(e.created_at);
          if (e.type === 'PushEvent') {
            return `> [syslog] ${time}: pushed to ${e.repo.name}`;
          }
          if (e.type === 'CreateEvent') {
            return `> [syslog] ${time}: created repository ${e.repo.name}`;
          }
          if (e.type === 'WatchEvent') {
            return `> [syslog] ${time}: starred repository ${e.repo.name}`;
          }
          return `> [syslog] ${time}: repository event on ${e.repo.name}`;
        });

        setLogs(
          formattedLogs.length
            ? formattedLogs
            : ['> [syslog] no recent activity found.']
        );
      } catch {
        setLogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return { logs, isLoading };
};
