import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const upgradesData = [
  { id: 1, name: 'Kuot', basePrice: 10, multiplier: 1 },
  { id: 2, name: 'Kuot', basePrice: 20, multiplier: 2 },
  { id: 3, name: 'Kuot', basePrice: 50, multiplier: 3 },
  { id: 4, name: 'Kuot', basePrice: 100, multiplier: 5 },
  { id: 5, name: 'Kuot', basePrice: 1000, multiplier: 5 }
];
function App() {
  const [count,setCount] = useState<number>(0)
  const [clicksPerSecond,setClicksPerSecond] = useState<number>(0)
  const [numberOfUpgradesToBuy,setNumberOfUpgradesToBuy] = useState<number>(1)
  const [upgrades, setUpgrades] = useState(upgradesData.map(upgrade => ({
    ...upgrade,
    currentPrice: upgrade.basePrice
  })));
  function BuyUpgrade(upgradeId: number) {
    const selectedUpgrade = upgrades.find(upgrade => upgrade.id === upgradeId);
    if (selectedUpgrade && numberOfUpgradesToBuy > 1 && count >= (selectedUpgrade.currentPrice * numberOfUpgradesToBuy + (10 * numberOfUpgradesToBuy) + numberOfUpgradesToBuy)) {
      setCount(prevCount => prevCount - (selectedUpgrade.currentPrice * numberOfUpgradesToBuy + (10 * numberOfUpgradesToBuy) + numberOfUpgradesToBuy));
      setClicksPerSecond(prevClicks => prevClicks + selectedUpgrade.multiplier * numberOfUpgradesToBuy);

      setUpgrades(prevUpgrades => prevUpgrades.map(upgrade =>
        upgrade.id === upgradeId ? {
          ...upgrade,
          currentPrice: upgrade.currentPrice * numberOfUpgradesToBuy + 10 * numberOfUpgradesToBuy + numberOfUpgradesToBuy
        } : upgrade
      ));
    }else if(selectedUpgrade && numberOfUpgradesToBuy === 1 && count >= selectedUpgrade.currentPrice) {
      setCount(prevCount => prevCount - selectedUpgrade.currentPrice);
      setClicksPerSecond(prevClicks => prevClicks + selectedUpgrade.multiplier);

      setUpgrades(prevUpgrades => prevUpgrades.map(upgrade =>
        upgrade.id === upgradeId ? {
          ...upgrade,
          currentPrice: upgrade.currentPrice + 10 + numberOfUpgradesToBuy
        } : upgrade
      ));

    }
  }

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const updatePoints = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setCount((prevCount) => prevCount + clicksPerSecond * deltaTime);
      animationFrame = requestAnimationFrame(updatePoints);
    };

    animationFrame = requestAnimationFrame(updatePoints);

    return () => cancelAnimationFrame(animationFrame);
  }, [clicksPerSecond]);

  function Gamble() {
    setCount((prevCount) => (Math.random() < 0.5 ? prevCount * 2 : 0));
  }
  return (
    <div className="App">
     <div>
      <ul>
        <li><button onClick={() => setNumberOfUpgradesToBuy(1)}>1</button></li>
        <li><button onClick={() => setNumberOfUpgradesToBuy(10)}>10</button></li>
        <li><button onClick={() => setNumberOfUpgradesToBuy(100)}>100</button></li>
      </ul>
      <ul>
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
     <div>
        <div><p>{count.toFixed(0)}</p><p>{clicksPerSecond}</p></div>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>CLICK</button>
     </div>
    </div>
  );
}

export default App;
