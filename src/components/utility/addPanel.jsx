import cc from 'classcat';
import {useState,useEffect} from 'react';

/* 作成中 */

export function AddPanelBox(props) {
  const { text,edit,handleTextChange,handleTextAdd,handleEditChange } = props;
  const [newText,setNewText] = useState(text);
  const [newEdit,setNewEdit] = useState(edit);
  return (
    <>
      <div className='mt-8 flex flex-row w-full'>
        <textarea
          className='border rounded-lg w-full p-1'
          value={newText}
          tabindex={0}
          onChange={(e) => {
            if (newText !== e.target.value) {
              setNewText(e.target.value);
              handleTextChange(newText);
            }
            e.preventDefault();
          }}
          cols={50}
          rows={2}
        />
        <button
          className='mx-2 px-4 py-1 w-24 border border-gray-400 bg-gray-200 rounded-lg'
          tabindex={1}
          onClick={(e) => {
            if (newText) {
              handleTextAdd();
              setNewText('');
              handleTextChange('');
            }
            e.preventDefault();
          }}
        >
          追加
        </button>
        <label for='checkbox' className='w-24 my-auto'>
          <input
            type='checkbox'
            className='m-2'
            value={newEdit}
            id='checkbox'
            tabindex={2}
            onChange={(e) => {
              setNewEdit(e.target.checked);
              handleEditChange(newEdit);
              e.preventDefault();
            }}
          ></input>
          編集
        </label>
      </div>
    </>
  );
}