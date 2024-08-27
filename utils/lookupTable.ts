// utils/lookupTable.ts

// 这是一个简化的查找表示例
/*
const [x1, setX1] = useState(2)    //iks
const [x2, setX2] = useState(5)    //user
const [x3, setX3] = useState(10)   //prod per user
const [x4, setX4] = useState(1000) //sms per sec
const [x5, setX5] = useState(0)    //bandwidth
const [x6, setX6] = useState(0)    //response time
*/
// 实际使用时，您需要用真实的测试数据替换这个表
export const lookupTable = [
    { x1: 1, x2: 5, x3: 10, x4: 1000, x5: 50000, x6: 50000 },
    { x1: 2, x2: 10, x3: 20, x4: 2000, x5: 400000, x6: 200000 },
    { x1: 3, x2: 15, x3: 30, x4: 3000, x5: 1350000, x6: 450000 },
    { x1: 4, x2: 20, x3: 40, x4: 4000, x5: 3200000, x6: 800000 },
  ];
  
  interface LookupEntry {
    x1: number;
    x2: number;
    x3: number;
    x4: number;
    x5: number;
    x6: number;
  }
  
  function distance(a: LookupEntry, b: LookupEntry): number {
    return Math.sqrt(
      Math.pow((a.x1 - b.x1) / 4, 2) +
      Math.pow((a.x2 - b.x2) / 20, 2) +
      Math.pow((a.x3 - b.x3) / 40, 2) +
      Math.pow((a.x4 - b.x4) / 4000, 2)
    );
  }
  
  function linearInterpolate(y1: number, y2: number, x: number): number {
    return y1 + (y2 - y1) * x;
  }
  
  export function predictX5X6(x1: number, x2: number, x3: number, x4: number): { x5: number, x6: number, error: number } {
    const input = { x1, x2, x3, x4, x5: 0, x6: 0 };
    
    // 找到最接近的两个点
    const sortedEntries = [...lookupTable].sort((a, b) => 
      distance(input, a) - distance(input, b)
    );
    
    const nearest1 = sortedEntries[0];
    const nearest2 = sortedEntries[1];
  
    // 计算插值因子
    const d1 = distance(input, nearest1);
    const d2 = distance(input, nearest2);
    const factor = d1 / (d1 + d2);
  
    // 使用线性插值计算x5和x6
    const x5 = linearInterpolate(nearest1.x5, nearest2.x5, factor);
    const x6 = linearInterpolate(nearest1.x6, nearest2.x6, factor);
  
    // 估算误差（这里使用了一个简单的方法，实际应用中可能需要更复杂的误差估算）
    const error = Math.max(
      Math.abs(nearest1.x5 - nearest2.x5) / nearest1.x5,
      Math.abs(nearest1.x6 - nearest2.x6) / nearest1.x6
    ) * 100; // 转换为百分比
  
    return { x5, x6, error };
  }