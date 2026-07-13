import React, { useEffect, useState } from 'react';

const formatEvent = (event) => {
  const repoName = event.repo.name.split('/').pop();
  switch (event.type) {
    case 'PushEvent':
      return `PUSHED TO ${repoName}`;
    case 'CreateEvent':
      return `CREATED ${event.payload.ref_type ? event.payload.ref_type.toUpperCase() : 'REPO'} ${repoName}`;
    case 'WatchEvent':
      return `STARRED ${repoName}`;
    case 'PullRequestEvent':
      return `${event.payload.action.toUpperCase()} PR IN ${repoName}`;
    case 'IssuesEvent':
      return `${event.payload.action.toUpperCase()} ISSUE IN ${repoName}`;
    case 'ForkEvent':
      return `FORKED ${repoName}`;
    case 'IssueCommentEvent':
      return `COMMENTED ON ${repoName}`;
    default:
      return null;
  }
};

export default function GithubActivity() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/sampratigaurav/events/public')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        const uniqueEvents = [];
        const seenRepos = new Set();

        for (const event of data) {
          const formatted = formatEvent(event);
          if (formatted && !seenRepos.has(event.repo.name)) {
            uniqueEvents.push(formatted);
            seenRepos.add(event.repo.name);
          }
          if (uniqueEvents.length >= 3) break;
        }

        setEvents(uniqueEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch github activity', err);
        setEvents(['CONNECTION TO GITHUB FAILED']);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  const displayString = loading
    ? 'ESTABLISHING SECURE CONNECTION...'
    : events.length > 0
      ? events[currentIndex]
      : 'NO RECENT TRANSMISSIONS';

  return (
    <div
      title="Live Activity"
      className="mt-5 font-mono text-[10.5px] text-red flex items-center gap-[8px] tracking-[0.06em] bg-[#c62e22]/10 border-[1.5px] border-[#c62e22]/30 px-[10px] py-[8px] rounded-sm inline-flex max-w-full shadow-[2px_2px_0_rgba(198,46,34,0.15)] overflow-hidden cursor-help"
    >
      <span className="shrink-0 w-[6px] h-[6px] rounded-full bg-red opacity-90 animate-pulse"></span>
      <span className="truncate select-none">
        <span className="text-ink2 mr-[6px]">SYS.LOG &gt;</span>
        {displayString}
        <span className="inline-block w-[6px] h-[10px] bg-red ml-[4px] translate-y-[1px] sg-blink"></span>
      </span>
    </div>
  );
}
