export async function GetListTags() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags`,
  );
  const data = await response.json();
  return data;
}

export async function DeleteTag(tag: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags/${tag}`,
    {
      method: 'DELETE',
    },
  );
  const data = await response.json();
  return data;
}

export async function CreateTag(tag: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tag }),
    },
  );
  const data = await response.json();
  return data;
}
