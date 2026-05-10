export default async function page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  return <div>{query}</div>;
}
