interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { query } = await searchParams;
  return <div>Hello {query}</div>;
}
