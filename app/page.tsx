'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { getAgoraToken } from '@/components/request/request';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [agoraTokenData, setAgoraTokenData] = useState<any>(null);

  const getAgoraTokennn = async () => {
    setLoading(true);
    const channelName = Date.now().toString();
    try {
      const { data } = await getAgoraToken(channelName);
      if (data.data) {
      setAgoraTokenData(data.data);
      console.log(data.data, "agoraTokenData");    
      const encodedToken = encodeURIComponent(data.data);
      console.log("token in home page", encodedToken);
      router.push(`/channel/${channelName}?token=${encodedToken}`);  
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const channelName = "1727006347271";
  const token = "007eJxTYPDqvaaXYGk57UL9N/6FBpM/bdS8/G7Rj61LlhW6tD9clBKkwGCUZJCUkmKQkmqZZmiSYmGSlJyWZpGWZGBsnmpiapRsvI3tQ9oxkQ9pWZzTmBkZGBlYgBgEmMAkM5hkAZO8DIbmRuYGBmbGFpam5kYMDACgwyNn"; // Replace with your token
   
  const handleNavigation = () => {
    const encodedToken = encodeURIComponent(token);
    console.log("token in home page", encodedToken);
    router.push(`/channel/${channelName}?token=${encodedToken}`);
  }


  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 mt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        <span className="text-white">NextJS</span> <span className="text-white">Agora Video Call</span>
      </h1>
      <div className="text-center">
       <button
          onClick={() => getAgoraTokennn()}
          className="block w-full inline-flex items-center justify-center px-5 py-3 mt-5 text-base font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Create Meeting
        </button>
        <button
          onClick={() => handleNavigation()}
          className="block w-full inline-flex items-center justify-center px-5 py-3 mt-5 text-base font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Join Meeting
        </button>
      </div>
    </div>
  )
}
