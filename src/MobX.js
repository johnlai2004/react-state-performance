import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { fileOptions } from './Common/fileOptions';
import { fetchData } from './Common/fetchData';


const setContent = content => {
  state.content = content;
}
let state = observable({
  multipleRowsCsv: '',
  isModifyingMultipleRows: false,
  content:[],
  numOfRecords:0
});

const modifyMultipleRows = rowsCsv => {
  state.isModifyingMultipleRows = true;
  const rows = rowsCsv.split(',').map(num => parseInt(num.trim()));
  for(let x in rows) {
    const val = Math.round(Math.random()*10);
    state.content[rows[x]]['age'] = val;
    state.content[rows[x]]['name'] = val;
    state.content[rows[x]]['phone'] = val;
  }
  state.isModifyingMultipleRows = false;
};

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
    {content.length > 0 && <div id="multirows">
      <input type="text" placeholder="Rows (eg. 0,35,241,5)" value={state.multipleRowsCsv} onChange={e=>{state.multipleRowsCsv = e.currentTarget.value;}} />
      <button type="button" onClick={_ => modifyMultipleRows(state.multipleRowsCsv) }>{state.isModifyingMultipleRows ? 'Loading...' : 'Modify Rows with Random Content'}</button>
    </div>}
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
});

export default MobX;
