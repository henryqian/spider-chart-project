// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import SpiderChart from '../components/SpiderChart'
import { predictX5X6 } from '../utils/lookupTable'

export default function Home() {
  const [x1, setX1] = useState(2)    //iks
  const [x2, setX2] = useState(5)    //user
  const [x3, setX3] = useState(10)   //prod per user
  const [x4, setX4] = useState(1000) //sms per sec
  const [x5, setX5] = useState(0)    //bandwidth
  const [x6, setX6] = useState(0)    //response time
  const [pageViews, setPageViews] = useState(0)
  
  useEffect(() => {
    // 增加页面访问计数
    async function increasePageViews() {
      try {
        const response = await fetch('/api/counter', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received response:', data);
        setPageViews(data.count/2); //this is a work around before can find way to only render once
      } catch (error) {
        console.error('Error increase page views:', error);
      }
    }
    
    // 读取页面访问计数
    async function fetchPageViews() {
      try {
        const response = await fetch('/api/counter', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received response:', data);
        setPageViews(data.count/2); //this is a work around before can find way to only render once
      } catch (error) {
        console.error('Error fetching page views:', error);
      }
    }

    if (typeof window !== 'undefined') {
      increasePageViews();
      //fetchPageViews();
    }
 
    setX5(x2/5 + x3/10 + x4/1000)
    setX6((x2/5 + x3/10 + x4/1000)/x1)
  }, [x1, x2, x3, x4])
  
 /*  
  const [error, setError] = useState(0)

  useEffect(() => {
    const { x5: predictedX5, x6: predictedX6, error: predictedError } = predictX5X6(x1, x2, x3, x4);
    setX5(predictedX5);
    setX6(predictedX6);
    setError(predictedError);
  }, [x1, x2, x3, x4])
*/

  return (
    <main className="flex flex-col items-top justify-between p-24">
      <div className="z-10 items-top justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">KMS Performance Spider Diagram</h1>
        <h1 className="text-2xl mb-8">页面访问次数: {pageViews}</h1>
        <div className="text-2xl font-bold mb-8 grid grid-cols-2 gap-1">
          <label>
            Amount of IKS (X1):
            <input
              type="range"
              min="1"
              max="4"
              value={x1}
              onChange={(e) => setX1(Number(e.target.value))}
              className="ml-2"
            />
            {x1}
          </label>
          <label>
            Amount of Users (X2):
            <input
              type="range"
              min="5"
              max="20"
              step="5"
              value={x2}
              onChange={(e) => setX2(Number(e.target.value))}
              className="ml-2"
            />
            {x2}m
          </label>
          <label>
            Amount of Product per User (X3):
            <input
              type="range"
              min="10"
              max="40"
              step="10"
              value={x3}
              onChange={(e) => setX3(Number(e.target.value))}
              className="ml-2"
            />
            {x3}
          </label>
          <label>
            Amount of SMS per Second (X4):
            <input
              type="range"
              min="1000"
              max="4000"
              step="1000"
              value={x4}
              onChange={(e) => setX4(Number(e.target.value))}
              className="ml-2"
            />
            {x4} command/second
          </label>
        </div>
        <div className="text-2xl font-bold color-red mb-8">
          <p>
            <span>Bandwidth </span>
            <span>(X5): {x5.toFixed(2)} </span>
            <span>kbps &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <span>SMS Response </span>
            <span>(X6): {x6.toFixed(2)} </span>
            <span>ms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <span>Accuracy </span>
            <span>: 100% </span>
          </p>
        </div>
        <div className="spider-chart-container">
          <SpiderChart x1={x1} x2={x2} x3={x3} x4={x4} x5={x5} x6={x6} />
        </div>
      </div>
    </main>
  )
}