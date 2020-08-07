import React, { useRef } from 'react';
import { Button } from 'antd';
import ConfigTable from '../../component/ConfigTable';
import config from './config';
// import { fetchDataFunc } from '../index';

const TestData = [
  { name: 'name0', age: '18', type: 'type1' },
  { name: 'name1', age: '18', type: 'type1' },
  { name: 'name2', age: '18', type: 'type1' },
  { name: 'name3', age: '18', type: 'type1' },
  { name: 'name4', age: '18', type: 'type1' },
  { name: 'name5', age: '18', type: 'type1' },
  { name: 'name6', age: '18', type: 'type1' },
  { name: 'name7', age: '18', type: 'type1' },
  { name: 'name8', age: '18', type: 'type1' },
  { name: 'name9', age: '18', type: 'type1' },
  { name: 'name10', age: '18', type: 'type1' },
  { name: 'name11', age: '18', type: 'type1' },
  { name: 'name12', age: '18', type: 'type1' },
  { name: 'name13', age: '18', type: 'type1' },
  { name: 'name14', age: '18', type: 'type1' },
  { name: 'name15', age: '18', type: 'type1' },
  { name: 'name16', age: '18', type: 'type1' },
  { name: 'name17', age: '18', type: 'type1' },
  { name: 'name18', age: '18', type: 'type1' },
  { name: 'name19', age: '18', type: 'type1' },
  { name: '1name0', age: '20', type: 'type2' },
  { name: '1name1', age: '20', type: 'type2' },
  { name: '1name2', age: '20', type: 'type2' },
  { name: '1name3', age: '20', type: 'type2' },
  { name: '1name4', age: '20', type: 'type2' },
  { name: '1name5', age: '20', type: 'type2' },
  { name: '1name6', age: '20', type: 'type2' },
  { name: '1name7', age: '20', type: 'type2' },
  { name: '1name8', age: '20', type: 'type2' },
  { name: '1name9', age: '20', type: 'type2' },
  { name: '1name10', age: '20', type: 'type2' },
  { name: '1name11', age: '20', type: 'type2' },
  { name: '1name12', age: '20', type: 'type2' },
  { name: '1name13', age: '20', type: 'type2' },
  { name: '1name14', age: '20', type: 'type2' },
  { name: '1name15', age: '20', type: 'type2' },
  { name: '1name16', age: '20', type: 'type2' },
  { name: '1name17', age: '20', type: 'type2' },
  { name: '1name18', age: '20', type: 'type2' },
  { name: '1name19', age: '20', type: 'type2' },
]

const fetchDataFunc = (pagination: any) => {
  console.log("do query1111111");
  return Promise.resolve({ data: TestData, current: 1 });
};

export default () => {

  const ref = useRef<{ doQuery: () => {} }>();

  return(
    <>
      <Button onClick={() => { ref.current?.doQuery(); }}> Do Query </Button>
      <ConfigTable
        config={config}
        fetchDataFunc={fetchDataFunc}
        configKey={config.key}
        ref={ref}
      />
    </>
  )
}