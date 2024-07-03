import { useState, useEffect } from 'react';

interface LoadMoreProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  initialPage: number;
  pageSize?: number;
}

const useLoadMore = <T>({
  fetchData,
  initialPage = 1,
  pageSize = 10,
}: LoadMoreProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newData = await fetchData(page);
      setData(prevData => [...prevData, ...newData]);
      if (newData.length < pageSize) {
        setHasMore(false);
      }
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialPage === 1) {
      loadMore();
    }
  }, [initialPage]);

  return { data, isLoading, hasMore, loadMore };
};

export default useLoadMore;
