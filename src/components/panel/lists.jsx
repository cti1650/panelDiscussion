import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import {useState,useEffect} from 'react';
import firebase , { db } from '../../../Firebase';

export async function Panels(props) {
  const [lists,setLists] = useState([]);
/*     db.collection('panels').get().then(doc=>{
      console.log(doc);
      doc.docs().forEach(item=>{
        setLists([...lists,item.data()])
      });
    }); */
  return (
    <>
      <div>
        { lists.length === 0 ? (<div></div>) : lists.map(item=>(
          <div>{item.panelName}</div>
        ))
        }
      </div>
    </>
  );
}