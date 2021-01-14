import { useState } from 'react';
import SelectFile from './SelectFile';

const fetchData = async (numOfRecords) => {
  const response = await fetch(`./data/${numOfRecords}.json`)
  const result = await response.json();
  return result;
}
const Hook = () => {

  const [content, setContent] = useState([]);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const editRecord = (index, fieldName, fieldValue) => {
    content[index][fieldName] = parseInt(fieldValue);
    setContent([...content]);
  };
  return (
    <div>
    <SelectFile {...{numOfRecords,setNumOfRecords}} />
    <button onClick={async ()=>setContent(await fetchData(numOfRecords))}>Load Records</button>
    {content.length > 0 && <p>Showing <strong>{content.length}</strong> records</p>}
    <table>
    <thead>
      <tr>
	<td>Name</td>
	<td>Age</td>
	<td>Phone</td>
      </tr>
    </thead>
    <tbody>
    {content.length > 0 ? content.map((row,k)=>(
      <tr key={`k-${k}`}>
        <td><input type="number" value={row.name} onChange={e => editRecord(k,'name',e.currentTarget.value)} /></td>
        <td><input type="number" value={row.age} onChange={e => editRecord(k,'age',e.currentTarget.value)} /></td>
        <td><input type="number" value={row.phone} onChange={e => editRecord(k,'phone',e.currentTarget.value)} /></td>
      </tr>
    )) : <tr><td colSpan="3">No records available</td></tr>}
    </tbody>
    </table>
    </div>
  );
}

export default Hook;
