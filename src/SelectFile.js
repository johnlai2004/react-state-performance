const SelectFile = ({numOfRecords, setNumOfRecords}) => (
    <select value={numOfRecords} onChange={e=>setNumOfRecords(e.currentTarget.value)}>
      <option value="">-- No. of Records --</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="500">500</option>
      <option value="1000">1k</option>
      <option value="5000">5k</option>
      <option value="10000">10k</option>
      <option value="50000">50k</option>
      <option value="100000">100k</option>
      <option value="500000">500k</option>
    </select>
);

export default SelectFile;
