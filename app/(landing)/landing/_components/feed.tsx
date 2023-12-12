'use client';

import { useEffect, useState } from 'react';
import PromptCard from './informeCard';

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} />
      ))}
    </div>
  );
};

const InformesFeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      const response = await fetch('/api/informes');
      const data = await response.json();

      setPosts(data);
    };

    fetchInformes();
  }, []);
  return (
    <div>
      <PromptCardList data={posts} />
    </div>
  );
};

export default InformesFeedPage;
