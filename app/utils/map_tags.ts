import { ImageData } from '../interfaces/image.interface';

export const mapTagsData = (tags: string[], count: number): ImageData[] => {
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
