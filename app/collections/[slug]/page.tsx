import React from 'react';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <>
      <section>
        <p>{slug}</p>
      </section>
    </>
  );
}

export default Page;