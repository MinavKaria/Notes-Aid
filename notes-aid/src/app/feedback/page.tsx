// src/app/feedback/page.tsx

import React from 'react';

const FeedbackPage = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-start bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Submit Feedback / Notes / Feature Request</h1>
      
      <div className="w-full max-w-4xl aspect-[4/3]">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf1-1avq8IoT-nIpXLacg-5YDz-HM4XyxeJRKrUTRsb9nkW6w/viewform?embedded=true" //replace with your own form id
          width="100%"
          height="100%"
          className="w-full h-full border-none"
          allowFullScreen
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Having trouble loading the form?{' '}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSf1-1avq8IoT-nIpXLacg-5YDz-HM4XyxeJRKrUTRsb9nkW6w/viewform?embedded=true" //replace with your own form id
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open it in a new tab
        </a>
      </p>
    </div>
  );
};

export default FeedbackPage;
