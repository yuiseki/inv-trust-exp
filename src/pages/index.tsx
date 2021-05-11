/// <reference types="@emotion/react/types/css-prop" />
import React from 'react';
import Head from 'next/head';
import tw, { css } from 'twin.macro';
import useSWR from 'swr';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-400`}
`;

export const Home = () => {
  const { data } = useSWR(
    'https://gyazo.com/api/collections/fcb91cdfffa27fb6c2ea955742fed76e/images'
  );
  const sortedData = data
    ?.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    })
    .reverse();
  return (
    <>
      <Head>
        <title>いろんな投資信託に10万円づつ投資してみた結果</title>
      </Head>
      <div css={container}>
        <main>
          <h1 tw='text-5xl font-bold'>
            いろんな投資信託に10万円づつ投資してみた結果
          </h1>
          <div>
            {sortedData &&
              sortedData.map((image) => {
                return (
                  <div tw='m-3' key={image.image_id}>
                    <h2 tw='text-4xl font-bold'>
                      {new Date(image.created_at).toLocaleDateString()}
                    </h2>
                    <h3>{image.created_at}</h3>
                    <div>
                      <img tw='h-full w-full' src={image.url} />
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
