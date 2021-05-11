import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Panel } from '../src/components/panel/default';
import { DammyPanel } from '../src/components/panel/dammy';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcsarblmzxwiecmbnibe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE3NTM1NywiZXhwIjoxOTM1NzUxMzU3fQ.RieDtePOmJHaj5mYxfuvZllLopv02JCbBVEX-XGyYg8';
const supabase = createClient(supabaseUrl, supabaseKey);

const updateDB = async () =>{
  return await supabase
      .from('panels')
      .select('*');
}

export default function Home() {
  const [panelData, setPanelData] = useState([]);
  const [newPanelName, setNewPanelName] = useState('');
  const [editMode, setEditMode] = useState(false);
  useEffect(async ()=>{
    let DB = await updateDB();
    setPanelData(DB.data);
  },[]);

  useEffect(()=>{
    supabase
      .from('panels')
      .on('*',async ()=>{
        let DB = await updateDB();
        setPanelData(DB.data);
      })
      .subscribe();
  },[]);
  
  return (
    <div className='w-full'>
      <Head>
        <title>パネルディスカッション</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative w-full bg-green-50'>
        <h1
          className='text-center text-2xl font-bold md:text-6xl pt-2 md:py-4'
          style={{ color: '#0E6163' }}
        >
          パネルディスカッション
        </h1>
        <p className='text-center text-lg md:text-2xl py-1 sm:py-2'>
          Qin しまぶー × じゃけぇ
        </p>
        <label for='checkbox' className='absolute top-0 right-0 p-2 text-sm md:text-base w-12 md:w-20 my-auto'>
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
      <main className='container max-w-4xl px-8 sm:mx-auto flex flex-col'>
        <div className='text-2xl text-bold mt-4'>トーク中</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length === 0 ? (<DammyPanel />) :
            panelData.map(
              (item) =>
                !item.comp &&
                item.talking && (
                  <Panel
                    data={item}
                    edit={editMode}
                  />
                )
            )}
        </div>
        <div className='text-2xl text-bold mt-4'>テーマ</div>
        <div className='w-full flex flex-row flex-wrap justify-items-center'>
          {panelData.length === 0 ? (<DammyPanel />) :
            panelData.map(
              (item) =>
                !item.comp &&
                !item.talking && (
                  <Panel
                    data={item}
                    edit={editMode}
                  />
                )
            )}
        </div>
        <div className='text-2xl text-bold mt-4'>トーク済み</div>
        <div className='w-full pb-40 flex flex-row flex-wrap justify-items-center'>
          {panelData.length === 0 ? (<DammyPanel />) :
            panelData.map((item) => item.comp && <Panel data={item} />)}
        </div>
        <div className='fixed bottom-0 left-0 z-10 mt-8 px-3 py-1 flex flex-row w-full h-auto bg-white'>
          <textarea
            className='resize-none z-20 border rounded-lg w-full h-full p-1 h-20 focus:h-40'
            value={newPanelName}
            tabIndex={1}
            onChange={(e) => {
              setNewPanelName(e.target.value);
            }}
            cols={50}
            rows={2}
          />
          <button
            className='-ml-10 z-50 text-gray-400 border-none bg-while focus:outline-none focus:shadow-outline'
            tabIndex={2}
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
            <FontAwesomeIcon icon={faPaperPlane} className='w-6 h-6' />
          </button>
        </div>
      </main>
    </div>
  );
}
