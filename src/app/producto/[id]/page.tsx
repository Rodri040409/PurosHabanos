import { redirect } from 'next/navigation';

export default function ProductoRedirectPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/?producto=${params.id}`);
}
