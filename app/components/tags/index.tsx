import { ImageData } from '@/app/interfaces/image.interface';
import { ModalCreateTag } from '../modal';
import { defaultTags } from '@/app/constants/default_tag';

interface TagsComponentProps {
  tags: string[];
  setDisplayedImages: (images: ImageData[]) => void;
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
  setPage: (page: number) => void;
  images: ImageData[];
  imagesPerPage: number;
  handleTagClick: (tag: string) => void;
  deletedTag: (id: string) => void;
  createdTag: (tag: string) => void;
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
  deletedTag,
  createdTag,
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
        All
      </button>
      {tags.map((tag, index) => (
        <div
          key={`tag-${tag}-${index}`}
          className="flex items-center align-center"
        >
          <button
            key={`tag-${tag}-${index}`}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 text-sm ${
              selectedTag === tag
                ? 'bg-green-500 text-black'
                : 'bg-gray-200 text-black hover:bg-green-300'
            } ${defaultTags.includes(tag) ? 'rounded-full' : 'rounded-l-full'}`}
          >
            #{tag}
          </button>
          {defaultTags.includes(tag) ? null : (
            <button
              onClick={() => deletedTag(tag)}
              className="px-2 py-2 font-bold rounded-r-full text-sm text-black bg-red-300 hover:bg-red-500"
            >
              x
            </button>
          )}
        </div>
      ))}
      <ModalCreateTag funcSubmit={createdTag} />
    </div>
  );
};
