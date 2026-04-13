import { useState, useEffect } from "react";

export function useRouter() {
  
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    }
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    }
  }, []);

  function navigateTo(path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  function handleSearch(event, inputName = 'search') {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get(inputName);

    const url = searchTerm 
        ? `/search?text=${encodeURIComponent(searchTerm)}` 
        : '/search';

    navigateTo(url);
    event.target.reset();
  }

  return { currentPath, searchParams, navigateTo, handleSearch };
}