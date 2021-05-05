import cc from 'classcat';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wcsarblmzxwiecmbnibe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE3NTM1NywiZXhwIjoxOTM1NzUxMzU3fQ.RieDtePOmJHaj5mYxfuvZllLopv02JCbBVEX-XGyYg8';
const supabase = createClient(supabaseUrl, supabaseKey);

export function Panel(props) {
  const { edit,data } = props;
  return (
    <>
      <div className={cc(['mx-1 my-1 px-2 py-4 border border-gray-200 rounded-xl',{
        'bg-gray-100' : !edit,
      }])}>
        {data.name}
        {!edit && (<div className='text-center w-full text-red-500 border-none rounded-full' onClick={(e) => {
                supabase
                  .from('panels')
                  .delete()
                  .eq('id',data.id);
            }}>×</div>)}
      </div>
    </>
  );
}