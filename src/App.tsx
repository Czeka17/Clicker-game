import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LeftTab from './components/left-tab';
import Farm from './components/farm';
import Egg from './components/egg';

const upgradesData = [
  { id: 1, name: 'Chicken', basePrice: 10, multiplier: 1,type:'Eggs', bought:0 },
  { id: 2, name: 'Black Chicken', basePrice: 20, multiplier: 2 ,type:'eggs'},
  { id: 3, name: 'Green Chicken', basePrice: 50, multiplier: 3,type:'eggs' },
  { id: 4, name: 'Blue Chicken', basePrice: 100, multiplier: 5,type:'eggs' },
  { id: 5, name: 'Gold Chicken', basePrice: 1000, multiplier: 5,type:'eggs' }
];

function App() {
  const [boughtUpgrades,setBoughtUpgrades] = useState<number>(0)
  const [numberOfUpgradesToBuy,setNumberOfUpgradesToBuy] = useState<number>(1)
  const [eggs, setEggs] = useState<number>(0);
  const [eggsPerSecond,setEggsPerSecond] = useState<number>(0)
  const [eggsPerClick, setEggsPerClick] = useState<number>(1)
  const [upgrades, setUpgrades] = useState(upgradesData.map(upgrade => ({
    ...upgrade,
    currentPrice: upgrade.basePrice
  })));
  function BuyUpgrade(upgradeId: number) {
    const selectedUpgrade = upgrades.find(upgrade => upgrade.id === upgradeId);
    if (selectedUpgrade && numberOfUpgradesToBuy > 1 && eggs >= (selectedUpgrade.currentPrice * numberOfUpgradesToBuy + (10 * numberOfUpgradesToBuy) + numberOfUpgradesToBuy)) {
      setEggs(prevEggs => prevEggs - (selectedUpgrade.currentPrice * numberOfUpgradesToBuy + (10 * numberOfUpgradesToBuy) + numberOfUpgradesToBuy));
      setEggsPerSecond(prevEggs => prevEggs + selectedUpgrade.multiplier * numberOfUpgradesToBuy);

      setBoughtUpgrades((prevBoughtUpgrades) => prevBoughtUpgrades + numberOfUpgradesToBuy)
      
      

      setUpgrades(prevUpgrades => prevUpgrades.map(upgrade =>
        upgrade.id === upgradeId ? {
          ...upgrade,
          currentPrice: upgrade.currentPrice * numberOfUpgradesToBuy + 10 * numberOfUpgradesToBuy + numberOfUpgradesToBuy
        } : upgrade
      ));
    }else if(selectedUpgrade && numberOfUpgradesToBuy === 1 && eggs >= selectedUpgrade.currentPrice) {
      setEggs(prevEggs => prevEggs - selectedUpgrade.currentPrice);
      setEggsPerSecond(prevClicks => prevClicks + selectedUpgrade.multiplier);

      setBoughtUpgrades((prevBoughtUpgrades) => prevBoughtUpgrades + numberOfUpgradesToBuy)
      setUpgrades(prevUpgrades => prevUpgrades.map(upgrade =>
        upgrade.id === upgradeId ? {
          ...upgrade,
          currentPrice: upgrade.currentPrice + 10 + numberOfUpgradesToBuy
        } : upgrade
      ));

    }
  }

  function GetEgg(){
    setEggs((prevEggs) => prevEggs + eggsPerClick)
  }

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const updatePoints = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setEggs((prevEggs) => prevEggs + eggsPerSecond * deltaTime);
      animationFrame = requestAnimationFrame(updatePoints);
    };


    animationFrame = requestAnimationFrame(updatePoints);

    return () => cancelAnimationFrame(animationFrame);
  }, [eggsPerSecond]);
  
  

  function Gamble() {
    setEggs((prevEggs) => (Math.random() < 0.5 ? prevEggs * 2 : 0));
  }
  return (
    <div className="App">
      <LeftTab/>
      <div className='farm'>
      <Farm GetEgg={GetEgg} boughtUpgrades={boughtUpgrades}/>
      </div>
    
     <div className='tab'>
    <div className='magazine'>
    <div>
    <Egg width={2*32}/>
     <p>eggs:{eggs.toFixed(0)}</p>
    </div>
    <div>
    <Egg width={2*32}/>

    </div>
    <div>
    <Egg width={2*32}/>
    </div>
    </div>
     
      <ul className='number'>
        <li><button onClick={() => setNumberOfUpgradesToBuy(1)}>1</button></li>
        <li><button onClick={() => setNumberOfUpgradesToBuy(10)}>10</button></li>
        <li><button onClick={() => setNumberOfUpgradesToBuy(100)}>100</button></li>
        <li><button onClick={() => setEggs((prevEggs) => prevEggs + 1)}>click</button></li>
        
      </ul>
      <ul className='addons'>
        <li onClick={() => setEggsPerClick(2)}>x2</li>
        <li onClick={() => setEggsPerSecond((prevEggs) => prevEggs * 2)}>ex2</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
      <ul className='upgrades'>
          {upgrades.map(upgrade => (
            <li key={upgrade.id}>
              <p>{upgrade.name}</p>
              <p>Multiplier: {upgrade.multiplier}</p>
              <p>{numberOfUpgradesToBuy === 1 ? upgrade.currentPrice : upgrade.currentPrice * numberOfUpgradesToBuy + 10 * numberOfUpgradesToBuy + numberOfUpgradesToBuy}</p>
              <button onClick={() => BuyUpgrade(upgrade.id)}>buy</button>
            </li>
          ))}
          <li><button onClick={() => Gamble()}>GAMBLE</button></li>
        </ul>
     </div>
     
    </div>
  );
}

export default App;
