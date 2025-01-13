import { ImageData } from '@/app/interfaces/image.interface';

interface TagsComponentProps {
  tags: string[];
  setDisplayedImages: (images: ImageData[]) => void;
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
  setPage: (page: number) => void;
  images: ImageData[];
  imagesPerPage: number;
  handleTagClick: (tag: string) => void;
}

export const TagsComponent: React.FC<TagsComponentProps> = ({
  tags,
  setDisplayedImages,
  setSelectedTag,
  selectedTag,
  setPage,
  images,
  imagesPerPage,
  handleTagClick,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        key="all-tags"
        onClick={() => {
          setSelectedTag(null);
          setPage(1);
          setDisplayedImages(images.slice(0, imagesPerPage));
        }}
        className={`px-4 py-2 rounded-full text-sm ${
          !selectedTag
            ? 'bg-green-500 text-black'
            : 'bg-gray-200 text-black hover:bg-green-300'
        }`}
      >
        ทั้งหมด
      </button>
      {tags.map((tag, index) => (
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
      <button className="px-4 py-2 rounded-full text-sm bg-gray-200 text-black hover:bg-green-300">
        +
      </button>
    </div>
  );
};
