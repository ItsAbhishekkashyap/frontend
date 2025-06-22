'use client';

import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  keywords?: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default Meta;
