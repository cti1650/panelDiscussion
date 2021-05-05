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
  let t;
  useEffect(() => {
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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>全体会 2021 1Q 開発部</h1>
        <p className={styles.description}>ひとりでパネルディスカッション</p>
        <div className='flex flex-row'>
          <input
            type='text'
            className='border rounded-lg w-72'
            value={newPanelName}
            onChange={(e) => {
              if (newPanelName !== e.target.value) {
                setNewPanelName(e.target.value);
              }
            }}
          ></input>
          <div
            className='mx-2 px-4 border border-gray-400 bg-gray-200 rounded-lg'
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
          <input
            type='checkbox'
            className='m-2'
            value={editMode}
            onChange={(e) => {
              setEditMode(!e.target.checked);
            }}
          ></input>
        </div>
        <div className={styles.grid}>
          {panelData.length !== 0 &&
            panelData.map((item) => <Panel data={item} edit={editMode} />)}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
