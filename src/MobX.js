import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { fileOptions } from './Common/fileOptions';
import { fetchData } from './Common/fetchData';


const setContent = content => {
  state.content = content;
}
let state = observable({
  content:[],
  numOfRecords:0
});

const MobX = observer(() => {

  const editRecord = (index, fieldName, fieldValue) => {
    state.content[index][fieldName] = parseInt(fieldValue);
  };
  let { content, numOfRecords } = state;

  return (
    <div>
    <h1>MobX</h1>
    <select value={numOfRecords} onChange={async e=>{ state.numOfRecords = e.currentTarget.value; setContent(await fetchData(e.currentTarget.value))}}>
      <option value="">-- No. of Records --</option>
      {fileOptions.map(option=><option key={`o-${option.val}`} value={option.val}>{option.text}</option>)}
    </select>
    {content.length > 0 && <p>Showing <strong>{content.length}</strong> records</p>}
    <div id="display">
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
    <table>
    <thead>
      <tr>
	<td>Name</td>
	<td>Age</td>
	<td>Phone</td>
      </tr>
    </thead>
    <tbody>
    {content.map((row,k)=>(
      <tr key={`read-${k}`}>
        <td>{row.name}</td>
        <td>{row.age}</td>
        <td>{row.phone}</td>
      </tr>
    ))}
    </tbody>
    </table>
    </div>
    </div>
  );
});

export default MobX;
