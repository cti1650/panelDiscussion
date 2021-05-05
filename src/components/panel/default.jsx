import cc from 'classcat';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes } from '@fortawesome/free-solid-svg-icons';

const supabaseUrl = 'https://wcsarblmzxwiecmbnibe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE3NTM1NywiZXhwIjoxOTM1NzUxMzU3fQ.RieDtePOmJHaj5mYxfuvZllLopv02JCbBVEX-XGyYg8';
const supabase = createClient(supabaseUrl, supabaseKey);

export function Panel(props) {
  const { edit,data,onChange } = props;
  return (
    <>
      <button key={data.id} className={cc(['mx-1 my-1 px-2 py-4 text-lg border border-gray-200 rounded-xl border-4 focus:border-red-500 focus:bg-red-100 focus:outline-none',{
        'bg-gray-200' : edit === true,
        'bg-gray-600 text-white' : data.comp === true,
      }])} onDoubleClick={(e)=>{
        supabase
        .from('panels')
        .update({ comp: !data.comp })
        .match({ id: data.id }).then(()=>{
          console.log('update id:' + data.id);
          onChange && onChange(e);
        });
      }}>
        {data.name}
        {edit === true && (<div className='text-center w-full text-red-500 border-none rounded-full'>
          <button className='text-xs' onClick={(e) => {
              if(window.confirm(data.name + 'の投稿を削除してよろしいですか？')){
                supabase
                  .from('panels')
                  .delete()
                  .match({ id: data.id }).then(()=>{
                    console.log('delete id:' + data.id);
                    onChange && onChange(e);
                  });
                }
            }}>× 削除</button></div>)}
      </button>
    </>
  );
}