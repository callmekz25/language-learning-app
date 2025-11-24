import React from 'react';
import { useSearch } from '../search.hooks';
import { useSearchParams } from 'react-router-dom';
import CollectionSkeleton from '@/modules/collection/components/collectionSkeleton';
import CollectionList from '@/modules/collection/components/collectionList';

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const { data, isLoading } = useSearch({ q: q! });
  console.log(data);

  return (
    <div className="max-w-[1200px] mt-10 mx-auto px-4 py-8">
      <h3 className="text-xl font-medium">Result for "{q}"</h3>
      <div className="mt-4">Collections</div>
      <div className="mt-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <CollectionSkeleton key={i} />
            ))}
          </div>
        ) : data.data.length > 0 ? (
          <CollectionList collections={data.data ?? []} readOnly={true} />
        ) : (
          <div className="">No result match</div>
        )}
      </div>
    </div>
  );
};

export default Search;
