const FadedTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 className="italic opacity-25 lowercase text-[4rem] leading-[4rem] md:text-[16rem] md:leading-[14rem] md:-mt-10 font-bold w-fit whitespace-nowrap mx-auto">
      {text}
    </h1>
  );
};

export default FadedTitle;
