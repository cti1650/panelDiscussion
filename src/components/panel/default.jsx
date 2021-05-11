import cc from 'classcat';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faEdit,faFlag,faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';

const supabaseUrl = 'https://wcsarblmzxwiecmbnibe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDE3NTM1NywiZXhwIjoxOTM1NzUxMzU3fQ.RieDtePOmJHaj5mYxfuvZllLopv02JCbBVEX-XGyYg8';
const supabase = createClient(supabaseUrl, supabaseKey);

export function Panel(props) {
  const { edit,data,onChange } = props;
  return (
    <>
      <button key={data.id} className={cc(
        ['relative mx-1 my-1 px-2 whitespace-pre-wrap rounded-xl shadow focus:outline-none',
          {
            'py-5 text-lg border-none bg-gray-600 text-white' : data.comp === true,
            'py-5 text-lg border border-gray-200 bg-gray-200' : data.talking === false && edit === true,
            'py-5 text-lg border border-gray-200 bg-white' : data.talking === false && edit === false,
            'py-9 text-xl w-full border border-red-500 bg-white' : data.talking === true,
          }
        ]
        )} onDoubleClick={(e)=>{
          supabase
          .from('panels')
          .update({ comp: !data.comp, talking:false })
          .match({ id: data.id }).then(()=>{
            console.log('update id:' + data.id);
        });
      }}>
        {data.name}
        {edit === true && (
          <div className='text-center w-full text-gray-400 border-none focus:outline-none rounded-full'>
            <button className='text-xs' onClick={(e) => {
                if(window.confirm(data.name + 'の投稿を削除してよろしいですか？')){
                  supabase
                    .from('panels')
                    .delete()
                    .match({ id: data.id }).then(()=>{
                      console.log('delete id:' + data.id);
                    });
                  }
              }}>
                <FontAwesomeIcon icon={faTrash} size='xs' className='w-4 h-4' />
            </button>
          </div>
        )}
        {data.comp === false && (
          <div className={cc(
            [
              'absolute top-0 right-3', 
              {
                'text-red-400':data.talking,
                'text-gray-200':!data.talking,
              }, 
              'border-none focus:outline-none rounded-full'
              ]
            )}>
            <button className='text-xs focus:outline-none' onClick={(e) => {
              supabase
              .from('panels')
              .update({ talking: false })
              .match({ talking: true }).then(()=>{
                console.log('reset talking panel');
                if(!data.talking){
                  supabase
                    .from('panels')
                    .update({ talking: true })
                    .match({ id: data.id }).then(()=>{
                      console.log('talking id:' + data.id);
                    });
                }
              });
              }}><FontAwesomeIcon icon={faFlag} size='xs' className='w-4 h-4' />
            </button>
          </div>
        )}
      </button>
    </>
  );
}