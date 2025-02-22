
import type { NextPage } from 'next';
import ProductForm from '../components/Admin/ProductForm';

const Page: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-6">
        <ProductForm />
      </section>  
    </>
  );
};

export default Page;
