import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
    </section>
  );
};

export default NotFoundPage;