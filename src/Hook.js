import { useState } from 'react';
import { fileOptions } from './Common/fileOptions';
import { fetchData } from './Common/fetchData';

const Hook = () => {

  const [content, setContent] = useState([]);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const editRecord = (index, fieldName, fieldValue) => {
    content[index][fieldName] = parseInt(fieldValue);
    setContent([...content]);
  };
  return (
    <div>
    <h1>React Hooks</h1>
    <select value={numOfRecords} onChange={async e=>{ setNumOfRecords(e.currentTarget.value); setContent(await fetchData(e.currentTarget.value)); }}>
      <option value="">-- No. of Records --</option>
      {fileOptions.map(option=><option key={`o-${option.val}`} value={option.val}>{option.text}</option>)}
    </select>
    {content.length > 0 && <p>Showing <strong>{content.length}</strong> records</p>}
    <table>
    <thead>
      <tr>
	<td>Name</td>
	<td>Age</td>
	<td>Phone</td>
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
        <td>{row.name}</td>
        <td>{row.age}</td>
        <td>{row.phone}</td>
      </tr>
    )) : <tr><td colSpan="3">No records available</td></tr>}
    </tbody>
    </table>
    </div>
  );
};

export default Hook;
