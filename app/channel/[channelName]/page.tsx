'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import Call from "@/components/Call";

export default function Page({ params }: { params: { channelName: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  console.log("channelName:", params.channelName);
  console.log("token:", token);

  if (!token) {
    return <div className="flex flex-col items-center pt-40">Token is missing. Cannot join the call Cannot join the call.</div>;
  }

  return (
    <main className="flex w-full flex-col">
      <div className="flex flex-col items-center mt-8">
        <Call channelN={params.channelName} tokennn={token} />
      </div>
    </main>
  );
}
