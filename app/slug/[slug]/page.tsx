import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import LinkDetailsCard from '@/components/LinkDetailsCard'; // adjust the path if necessary

type Props = {
  params: { slug: string };
};

export default async function SlugPage({ params }: Props) {
  await connectToDB();

  const found = await Url.findOne({ slug: params.slug });

  if (!found) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-600">Link not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Analytics & Details for: <span className="text-blue-600">{found.slug}</span>
      </h1>
      <LinkDetailsCard link={{ _id: found._id.toString(), alias: found.slug }} />
    </div>
  );
}