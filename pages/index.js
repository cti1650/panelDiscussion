import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Panel } from '../src/components/panel/default';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcsarblmzxwiecmbnibe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE3NTM1NywiZXhwIjoxOTM1NzUxMzU3fQ.RieDtePOmJHaj5mYxfuvZllLopv02JCbBVEX-XGyYg8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [panelData, setPanelData] = useState([]);
  const [newPanelName, setNewPanelName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const handleChildonChange = (e) => {
    setPanelData([...panelData]);
  };
  let t;
  useEffect(() => {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(function () {
      supabase
        .from('panels')
        .select('*')
        .then((doc) => {
          if (panelData !== doc.data) {
            setPanelData(doc.data);
          }
        });
    }, 5000);
  }, [panelData]);
  return (
    <div className='w-full'>
      <Head>
        <title>パネルディスカッション</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full bg-green-50'>
        <h1
          className='text-center text-2xl sm:text-6xl py-2 sm:py-4'
          style={{ color: '#0E6163' }}
        >
          パネルディスカッション
        </h1>
        <p className='text-center text-lg sm:text-2xl py-1 sm:py-2'>
          Qin しまぶー × じゃけぇ
        </p>
      </div>
      <main className='container max-w-4xl px-8 sm:mx-auto flex flex-col'>
        <div className='mt-8 flex flex-row'>
          <input
            type='text'
            className='border rounded-lg w-1/2 p-1'
            value={newPanelName}
            tabindex={0}
            onChange={(e) => {
              if (newPanelName !== e.target.value) {
                setNewPanelName(e.target.value);
              }
            }}
          ></input>
          <button
            className='mx-2 px-4 py-1 border border-gray-400 bg-gray-200 rounded-lg'
            tabindex={1}
            onClick={(e) => {
              if (newPanelName) {
                supabase
                  .from('panels')
                  .insert([{ name: newPanelName }])
                  .then(() => {
                    setNewPanelName('');
                  });
              }
            }}
          >
            追加
          </button>
          <label for='checkbox'>
            <input
              type='checkbox'
              className='m-2'
              value={editMode}
              id='checkbox'
              onChange={(e) => {
                setEditMode(e.target.checked);
              }}
            ></input>
            編集
          </label>
        </div>
        <div className='text-2xl text-bold mt-4'>テーマ</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length !== 0 &&
            panelData.map(
              (item) =>
                !item.comp && (
                  <Panel
                    data={item}
                    edit={editMode}
                    onChange={handleChildonChange}
                  />
                )
            )}
        </div>
        <div className='text-2xl text-bold mt-4'>トーク済み</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length !== 0 &&
            panelData.map((item) => item.comp && <Panel data={item} />)}
        </div>
        <div className='mt-8 text-xs text-right'>
          パネルクリック⇒強調表示、ダブルクリック⇒トーク状況切替
        </div>
      </main>
    </div>
  );
}
