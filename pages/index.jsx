import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
  const [TimeKeeper,setTimeKeeper] = useState(null);
  const handleChildonChange = (e) => {
    setPanelData([...panelData]);
  };
  let t;
  useEffect(() => {
    TimeKeeper && clearTimeout(TimeKeeper);
    setTimeKeeper(setTimeout(function () {
      supabase
        .from('panels')
        .select('*')
        .then((doc) => {
          if (panelData !== doc.data) {
            setPanelData(doc.data);
            console.log('update' + new Date().toString());
          }
        });
    }, 5000));
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
        <div className='mt-8 flex flex-row w-full'>
          <textarea
            className='border rounded-lg w-full p-1'
            value={newPanelName}
            tabindex={1}
            onChange={(e) => {
              setNewPanelName(e.target.value);
            }}
            cols={50}
            rows={2}
          />
          <button
            className='mx-2 px-4 py-1 w-24 border border-gray-400 bg-gray-200 rounded-lg'
            tabindex={2}
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
          <label for='checkbox' className='w-24 my-auto'>
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
        <div className='text-2xl text-bold mt-4'>トーク中</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length !== 0 &&
            panelData.map(
              (item) =>
                !item.comp &&
                item.talking && (
                  <Panel
                    data={item}
                    edit={editMode}
                    onChange={handleChildonChange}
                  />
                )
            )}
        </div>
        <div className='text-2xl text-bold mt-4'>テーマ</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length !== 0 &&
            panelData.map(
              (item) =>
                !item.comp &&
                !item.talking && (
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
          ダブルクリック⇒トーク状況切替
        </div>
      </main>
    </div>
  );
}
