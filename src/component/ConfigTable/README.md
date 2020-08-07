# @cofe/easy-ui

Some Components used [antd](https://ant.design/).

Make your life easy，wish you have a happy life.

## Installing

```sh
npm install @jdd/cofe-common
```
## Example
```js
import React, { useRef } from 'react';
import { Button } from 'ant';
import { ConfigTable } from '@jdd/cofe-common/easy-ui';

export default (props) => {
  const currentRef = useRef();
  return (
    <>
      <Button
        onClick={() => { currentRef.current.doQuery(); }}
      >
        Do Query
      <Button/>
      <ConfigTable
        config={...}
        fetchDataFunc={(pagination, filters, sorter) => Promise.resolve({ data: ..., pageSize: ..., current: ..., total: ... })}
        onGetData={data => { console.log("data: ", data) }}
        ref={currentRef}
      />
    </>
  )
}
```
## API

### ConfigTable

##### config
```js
{
  columns: {
    key: any;
    dataIndex: string;
    title: string | reactNode;
    render: (text: string, record: object) => reactNode;
  } // the antd Table columns
  disableOnChangeQuery?: boolean; // the FetchDataTable disableOnChangeQuery
  disableInitialQuery?: boolean; // disable query when didmount
  component?: reactNode; // customzed component
}
```
##### fetchDataFunc
It will be invoked when 'comonentDidmount' and the event 'onChange' of [antd](https://ant.design/) `Table` triggered.
if you provide a [ref](#ref), it will give you a 'doQuery' function to invoked 'fetchDataFunc'.
```js
(pagination, filters, sorter) => Promise<
  current: string | number;
  pageSize: string | number;
  total: string | number;
  data: any;
>
```
##### onGetData
the 'data' is the result of invoking [fetchDataFunc](#fetchDataFunc).
It trigged after [fetchDataFunc](#fetchDataFunc) return the result evertime.
```js
(data) => void
```
##### ref
this will give you a 'doQuery' function to invoked [fetchDataFunc](#fetchDataFunc).

##### antTableProps
Using `Table` of [atnd](https://ant.design/components/table/), this value is the same with `Table` api.
but 'columns', 'dataSource', 'onChange' are disabled.
```js
<ConfigTable
  ...
  antTableProps: { size: "small" }
  ...
/>
```

##### customProps
'customProps' will be post to 'component' of [config](#config)
```js
<ConfigTable
  ...
  customProps: { xxx: ... }
  ...
/>
```

## License

[MIT](LICENSE)