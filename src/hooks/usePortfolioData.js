import { useState, useEffect } from 'react';

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
