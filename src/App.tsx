import React from 'react';
import './App.css';
import { Contender, duel } from './Contender';
import contenders from './contenders';

function App() {
  var contendersList: { name: string, contender: Contender<any> }[] = Object.values(contenders);
  contendersList.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          {contendersList.map(contender => 
            <th>{contender.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {contendersList.map(contenderA =>
          <tr>
            <td>{contenderA.name}</td>
            {contendersList.map(contenderB =>
              <td>{JSON.stringify(duel(contenderA.contender, contenderB.contender, 1000))}</td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;
