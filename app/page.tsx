'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageData } from './interfaces/image.interface';
import { TagsComponent } from './components/tags';
import { mapTagsData } from './utils/map_tags';
import { GalleryComponent } from './components/gallery';
import { GetListTags } from './service/tags.service';

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const IMAGES_PER_PAGE = parseInt(
    process.env.NEXT_PUBLIC_IMAGES_PER_PAGE || '12',
  );

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

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

  const fetchTags = async () => {
    const defaultTags = [
      'nature',
      'city',
      'food',
      'travel',
      'art',
      'people',
      'technology',
      'animals',
    ];
    // const getTagsData = await GetListTags();
    setTags(defaultTags.concat([]));
    const initialData = mapTagsData(defaultTags, 50);
    setImages(initialData);
    setDisplayedImages(initialData.slice(0, IMAGES_PER_PAGE));
  };

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

  const allTags = Array.from(new Set(images.flatMap((img) => img.tags)));

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
    const filteredImages = images.filter((img) => img.tags.includes(tag));
    setDisplayedImages(filteredImages.slice(0, IMAGES_PER_PAGE));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TagsComponent
        tags={allTags}
        handleTagClick={handleTagClick}
        setDisplayedImages={setDisplayedImages}
        setSelectedTag={setSelectedTag}
        selectedTag={selectedTag}
        setPage={setPage}
        images={images}
        imagesPerPage={IMAGES_PER_PAGE}
      />

      <GalleryComponent images={displayedImages} setTag={handleTagClick} />

      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
