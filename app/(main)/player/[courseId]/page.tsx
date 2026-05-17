import Player from "@/components/student/Player";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function page({ params }: Props) {
  const { courseId } = await params;

  return <Player courseId={courseId} />;
}
