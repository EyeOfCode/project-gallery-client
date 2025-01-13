'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageData } from './interfaces/image.interface';
import Image from 'next/image';

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const IMAGES_PER_PAGE = 12;

  const generateSampleData = (count: number): ImageData[] => {
    const tags = [
      'nature',
      'city',
      'food',
      'travel',
      'art',
      'people',
      'technology',
      'animals',
    ];
    const usedIds = new Set<number>();

    return Array.from({ length: count }, () => {
      let newId: number;
      do {
        newId = Math.floor(Math.random() * 1000000) + 1;
      } while (usedIds.has(newId));
      usedIds.add(newId);

      const numTags = Math.floor(Math.random() * 4) + 1;
      const selectedTags = new Set<string>();
      while (selectedTags.size < numTags) {
        selectedTags.add(tags[Math.floor(Math.random() * tags.length)]);
      }

      return {
        id: newId,
        width: Math.floor(Math.random() * 200) + 200, // 200-400px
        height: Math.floor(Math.random() * 200) + 200, // 200-400px
        tags: Array.from(selectedTags),
      };
    });
  };

  useEffect(() => {
    const initialData = generateSampleData(50);
    setImages(initialData);
    setDisplayedImages(initialData.slice(0, IMAGES_PER_PAGE));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, selectedTag, images]);

  const loadMoreImages = () => {
    setLoading(true);
    const filteredImages = selectedTag
      ? images.filter((img) => img.tags.includes(selectedTag))
      : images;

    const nextImages = filteredImages.slice(
      page * IMAGES_PER_PAGE,
      (page + 1) * IMAGES_PER_PAGE,
    );

    if (nextImages.length > 0) {
      setDisplayedImages((prev) => [...prev, ...nextImages]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setPage(1);
    const filteredImages = images.filter((img) =>
      tag === selectedTag ? true : img.tags.includes(tag),
    );
    setDisplayedImages(filteredImages.slice(0, IMAGES_PER_PAGE));
  };

  const allTags = Array.from(new Set(images.flatMap((img) => img.tags)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag, index) => (
          <button
            key={`tag-${tag}-${index}`}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTag === tag
                ? 'bg-green-500 text-black'
                : 'bg-gray-200 text-black hover:bg-green-300'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {displayedImages.map((img) => (
          <div key={img.id} className="mb-4 break-inside-avoid">
            <div className="relative group">
              <Image
                src={`https://placehold.co/${img.width}x${img.height}`}
                alt={`Image ${img.id}`}
                width={img.width}
                height={img.height}
                className="w-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-lg">
                <div className="flex flex-wrap gap-2">
                  {img.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-sm text-white bg-black/30 px-2 py-1 rounded-full cursor-pointer hover:bg-black/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
