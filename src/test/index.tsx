import React from 'react';
import FetchDataTable from '../component/fetchDataTable';
import ButtonGroup from '../component/buttonGroup';

const ButtonGroupSource = [
  { label: '陈西露', key: "cxl", clickedButtonStyle: { type: "dashed" } },
  { label: '周大成', key: "zdc", antdButtonProps: { type: "link" }, clickedButtonStyle: { type: "dashed" }},
];

const TableColumes = [
  { dataIndex: 'name', title: '姓名', key: 'name' },
  { dataIndex: 'age', title: '年龄', key: 'age' },
  { dataIndex: 'type', title: '身份', key: 'type' },
];

const TestData = [
  { name: '陈西露0', age: '18', type: 'wife' },
  { name: '陈西露1', age: '18', type: 'wife' },
  { name: '陈西露2', age: '18', type: 'wife' },
  { name: '陈西露3', age: '18', type: 'wife' },
  { name: '陈西露4', age: '18', type: 'wife' },
  { name: '陈西露5', age: '18', type: 'wife' },
  { name: '陈西露6', age: '18', type: 'wife' },
  { name: '陈西露7', age: '18', type: 'wife' },
  { name: '陈西露8', age: '18', type: 'wife' },
  { name: '陈西露9', age: '18', type: 'wife' },
  { name: '陈西露10', age: '18', type: 'wife' },
  { name: '陈西露11', age: '18', type: 'wife' },
  { name: '陈西露12', age: '18', type: 'wife' },
  { name: '陈西露13', age: '18', type: 'wife' },
  { name: '陈西露14', age: '18', type: 'wife' },
  { name: '陈西露15', age: '18', type: 'wife' },
  { name: '陈西露16', age: '18', type: 'wife' },
  { name: '陈西露17', age: '18', type: 'wife' },
  { name: '陈西露18', age: '18', type: 'wife' },
  { name: '陈西露19', age: '18', type: 'wife' },
  { name: '周大成0', age: '20', type: 'hasband' },
  { name: '周大成1', age: '20', type: 'hasband' },
  { name: '周大成2', age: '20', type: 'hasband' },
  { name: '周大成3', age: '20', type: 'hasband' },
  { name: '周大成4', age: '20', type: 'hasband' },
  { name: '周大成5', age: '20', type: 'hasband' },
  { name: '周大成6', age: '20', type: 'hasband' },
  { name: '周大成7', age: '20', type: 'hasband' },
  { name: '周大成8', age: '20', type: 'hasband' },
  { name: '周大成9', age: '20', type: 'hasband' },
  { name: '周大成10', age: '20', type: 'hasband' },
  { name: '周大成11', age: '20', type: 'hasband' },
  { name: '周大成12', age: '20', type: 'hasband' },
  { name: '周大成13', age: '20', type: 'hasband' },
  { name: '周大成14', age: '20', type: 'hasband' },
  { name: '周大成15', age: '20', type: 'hasband' },
  { name: '周大成16', age: '20', type: 'hasband' },
  { name: '周大成17', age: '20', type: 'hasband' },
  { name: '周大成18', age: '20', type: 'hasband' },
  { name: '周大成19', age: '20', type: 'hasband' },
]

const getTestData = (pagination: any) => {
  const { current, pageSize } = pagination;
  const startIndex = current * pageSize - pageSize;
  const endIndex = startIndex + pageSize;
  return TestData.slice(startIndex, endIndex);
}

const fetchDataFunc = (pagination: any) => {
  console.log("do query");
  return Promise.resolve({ ...pagination, total: 40, data: getTestData(pagination), });
};

const antdTableProps = { size: 'default' };

export default function TestComponents(props = {}) {

  return (
    <div>
      <ButtonGroup 
        direction="horizontal"
        source={ButtonGroupSource}
        onClick={(value: any) => { console.log("clicked button: value, ", value) }}
      />
      <FetchDataTable
        key="table"
        columns={TableColumes}
        fetchDataFunc={fetchDataFunc}
        antdTableProps={antdTableProps}
      />
    </div>
  )
}

