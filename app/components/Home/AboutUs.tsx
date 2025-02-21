import React, { FC } from 'react';

const AboutUs: FC = () => {
  return (
    <section>
      <div className="w-full flex items-center gap-4 mt-10">
        <h2 className="text-nowrap">A bit about us</h2>
        <div className="w-full h-[1px] bg-foreground-faded"></div>
      </div>
    </section>
  );
};

export default AboutUs;
