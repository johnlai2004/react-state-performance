import { useState } from 'react';
import Hook from './Hook';
import MobX from './MobX';

const App = () => {

  const [ experiment, setExperiment ] = useState('');

  if(experiment === 'mobx')
    return <MobX />;
  if(experiment === 'hook')
    return <Hook />;
  return (
    <div id="choose">
      <button type="button" onClick={()=>setExperiment('hook')}>Test React Hooks</button>
      <button type="button" onClick={()=>setExperiment('mobx')}>Test MobX</button>
    </div>
  );
}; 
export default App;
