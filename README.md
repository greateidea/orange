# @bigorange/ui

Some Components used [antd](https://ant.design/).

Make your life easy，wish you have a happy life.

## Installing

```sh
npm install @bigorange/ui
```
## Example
```js
import { FetchDataTble, ButtonGourp } from 'bigorange/ui';

export default (props) => {
  return (
    <>
      <ButtonGroup
        direction="horizontal"
        source=[
          { label: 'Button1', key: 'Button1', clickedButtonStyle: { type: "dashed" } },
          { label: 'Button2', key: 'Button2', antdButtonProps: { type: 'link' }, clickedButtonStyle: { type: "dashed" } },
        ]
        onClick={(config => console.log(config))}
      />
      <FetchDataTable
        columns={...}
        fetchDataFunc={(pagination, filters, sorter) => Promise.resolve({ data: ..., pageSize: ..., current: ..., total: ... })}
        onGetData={data => { console.log("data: ", data) }}
      />
    </>
  )
}
```
## API

### FetchDataTble

##### columns
```js
{
  key: string | number,
  dataIndex: string | number,
  title: string | number | JSX.Element,
  render?: (test: string, record: Dict) => string | number | JSX.Element,
}[]
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
```js
import React, { useRef } from 'react';

const myRef = useRef();

<FetchDataTble
  ...
  ref={ myRef } // then you can trigger the `fetchDataFunc` by 'myRef.current.doQuery()'
  ...
/>
```
##### disableInitialQuery
boolean, if you don't want trigger the [fetchDataFunc](#fetchDataFunc) when 'componetDidmount', set it "true".
```js
<FetchDataTble
  ...
  disableInitialQuery
  ...
/>
```
##### antTableProps
`FetchDataTble` use `Table` of [atnd](https://ant.design/components/table/), this value is the same with `Table` api.
but 'columns', 'dataSource', 'onChange' are disabled.
```js
<FetchDataTble
  ...
  antTableProps: { size: "small" }
  ...
/>
```

### BttonGroup

##### direction
"horizontal" | "vertical"

##### source
the button list, options:

`label`: the button label,

`key`: give every button a key,

`antdButtonProps`: the [BttonGroup](#BttonGroup) use Button of [antd](https://ant.design/components/button/),  this value is the same with `Button` api.

`clickedButtonStyle`: this value have two attributes, 'style' and 'antdButtonProps', it will be apply to the button clicked.

##### onClick
the function will put the the button's 'label' & 'key' to the params.


## License

[MIT](LICENSE)