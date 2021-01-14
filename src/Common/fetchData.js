const fetchData = async (numOfRecords) => {
  const response = await fetch(`./data/${numOfRecords}.json`);
  const result = await response.json();
  return result;
}
export { fetchData };
