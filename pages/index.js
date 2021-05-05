import Head from 'next/head';
import styles from '../styles/Home.module.css';
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
    <div className='container'>
      <Head>
        <title>パネルディスカッション</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-full w-full flex flex-col items-center'>
        <div className='w-full bg-green-50'>
          <h1 className={styles.title} style={{ color: '#0E6163' }}>
            パネルディスカッション
          </h1>
          <p className={styles.description}>Qin しまぶー × じゃけぇ</p>
        </div>

        <div className='mt-8 flex flex-row'>
          <input
            type='text'
            className='border rounded-lg w-72 p-1'
            value={newPanelName}
            onChange={(e) => {
              if (newPanelName !== e.target.value) {
                setNewPanelName(e.target.value);
              }
            }}
          ></input>
          <div
            className='mx-2 px-4 py-1 border border-gray-400 bg-gray-200 rounded-lg'
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
          </div>
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
        <div className='text-lg text-bold mt-4'>未完了</div>
        <div className={styles.grid}>
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
        <div className='text-lg text-bold mt-4'>完了</div>
        <div className={styles.grid}>
          {panelData.length !== 0 &&
            panelData.map(
              (item) => item.comp && <Panel data={item} edit={editMode} />
            )}
        </div>
      </main>
    </div>
  );
}
