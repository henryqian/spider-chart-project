// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import SpiderChart from '../components/SpiderChart'

export default function Home() {
  const [x1, setX1] = useState(2)    //iks
  const [x2, setX2] = useState(5)    //user
  const [x3, setX3] = useState(10)   //prod per user
  const [x4, setX4] = useState(1000) //sms per cmd
  const [x5, setX5] = useState(0)    //bandwidth
  const [x6, setX6] = useState(0)    //response time

  useEffect(() => {
      setX5(x2/5 + x3/10 + x4/1000)
      setX6((x2/5 + x3/10 + x4/1000)/x1)
  }, [x1, x2, x3, x4])

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">KMS Performance Spider Diagram</h1>
        <div className="text-2xl mb-8 grid grid-cols-2 gap-4">
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
        <div className="text-2xl mb-8">
          <p>System Bandwidth (X5): {x5.toFixed(2)} kbps       SMS Response Time (X6): {x6.toFixed(2)} ms</p>
        </div>
        <div className="spider-chart-container">
          <SpiderChart x1={x1} x2={x2} x3={x3} x4={x4} x5={x5} x6={x6} />
        </div>
      </div>
    </main>
  )
}