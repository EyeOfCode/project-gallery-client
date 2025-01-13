import { NextResponse } from 'next/server';

export async function GetListTags() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/api/tags`,
  );
  const data = await response.json();
  return NextResponse.json(data);
}
