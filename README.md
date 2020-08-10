# @bigorange/ui

Some Components used [antd](https://ant.design/).

Make your life easy，wish you have a happy life.

## Installing

```sh
npm install @bigorange/ui
```
## Example
```js
import { FetchDataTable, ButtonGroup} from '@bigorange/ui';

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

### FetchDataTable

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
It will be invoked when 'comonentDidmount' and 'onChange' of [antd](https://ant.design/) `Table` triggered.
Provide a [ref](#ref), the 'doQuery' function can be used to tigger 'fetchDataFunc'.
```js
(pagination, filters, sorter) => Promise<
  current: string | number;
  pageSize: string | number;
  total: string | number;
  data: any;
>
```
##### onGetData
The 'data' is the result of invoking [fetchDataFunc](#fetchDataFunc).
It trigged after [fetchDataFunc](#fetchDataFunc) return the result evertime.
```js
(data) => void
```
##### ref
This provide a 'doQuery' function for invoking [fetchDataFunc](#fetchDataFunc).
```js
import React, { useRef } from 'react';

const myRef = useRef();

<FetchDataTable
  ...
  ref={ myRef } // then you can trigger the `fetchDataFunc` by 'myRef.current.doQuery()'
  ...
/>
```
##### disableInitialQuery
Boolean, if you don't want trigger the [fetchDataFunc](#fetchDataFunc) when 'componetDidmount', set it "true".
```js
<FetchDataTable
  ...
  disableInitialQuery
  ...
/>
```
##### disableOnChangeQuery
Boolean, if you don't want trigger the [fetchDataFunc](#fetchDataFunc) in 'onChange' of [atnd](https://ant.design/components/table/) Table, set it "true".
```js
<FetchDataTable
  ...
  disableOnChangeQuery
  ...
/>
```

##### antdTableProps
`FetchDataTable` use `Table` of [atnd](https://ant.design/components/table/), this value is the same with `Table` api.
but 'columns', 'dataSource', 'onChange' are disabled.
```js
<FetchDataTable
  ...
  antdTableProps: { size: "small" }
  ...
/>
```

### ButtonGroup

##### direction
"horizontal" | "vertical"

##### source
The button list, options:

`label`: the button label,

`key`: give every button a key,

`antdButtonProps`: the [ButtonGroup](#ButtonGroup) use Button of [antd](https://ant.design/components/button/),  this value is the same with `Button` api.

`clickedButtonStyle`: this include 'style' and 'antdButtonProps', it will be apply to the button clicked.

##### onClick
the the button's 'label' & 'key' will put into the params.
```js
(label, key) => {}
```

### ConfigTable
Example

```js
import React, { useRef } from 'react';
import { Button } from 'ant';
import { ConfigTable } from '@bigorange/ui';

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

### QueryGroup
```js
import { QueryGroup } from '@bigorange/ui';
import moment from 'moment';

const startMoment = moment().subtract(1, 'years');
const endMoment = moment();

// the QueryGroup Config
const config = [
  {
    label: 'Name',
    name: "name",
    type: 'Input',
    rules: [
      {
        required: true,
        message: 'Please input name!',
      },
    ],
    initialValue: 'Orange'
  },
  {
    label: 'Phone',
    name: "phone",
    type: 'Input',
    rules: [
      {
        required: true,
        message: 'Please input phone!',
      },
    ],
  },
  {
    label: 'Fruits',
    name: "fruits",
    type: 'Select',
    options: [
      {
        label: 'Orange',
        value: 'orange',
      },
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Mango',
        value: 'mango'
      },
    ],
    initialValue: 'orange',
  },
  {
    label: 'Start Date',
    name: 'start',
    type: 'DatePicker',
    rules: [
      {
        required: true,
        message: '请输入开始日期!',
      },
    ],
    format: 'YYYY-MM-DD',
  },
  {
    label: 'Month',
    name: 'month',
    type: 'DatePicker',
    rules: [
      {
        required: true,
        message: '请选择月份!',
      },
    ],
    format: 'YYYY-MM',
    antdDataEntryProps: {
      picker: 'month',
    },
  },
  {
    label: '创建时间',
    type: 'RangePicker',
    rangeNames: ['startTime', 'endTime'], // default name: "startTime-endTime"
    initialValue: [startMoment, endMoment],
  },
  {
    label: '是否上天',
    name: 'upSky',
    type: 'Checkbox',
    initialValue: true,
  },
  {
    label: '左青龙右白虎',
    name: 'godAnimal',
    type: 'Checkbox.Group',
    options: [
      { label: '青龙', value: 'green dragon' },
      { label: '白虎', value: 'white tiger' },
    ],
    initialValue: [],
  },
  {
    label: '自定义输入框',
    name: 'coolNumber',
    type: CustomerInput, // your customized form control
    initialValue: 111,
  },
]

export default (props) => {
  return (
    <>
      <Button
        onClick={() => {
          ref.current?.doValidate().then(r => {
            if (r) {
              console.log(r);
              ref.current?.form.resetFields();
            }
          })
        }}
      >
        查询
      </Button>
      <QueryGroup
        source={config}
        onValidate={(values: Dict) => {
          console.log("values: ", values)
          return "good";
        }}
        queryComp={<a>点击查询</a>} // or queryComp={null}
        initialValues={{ name: 'a cool name', phone: '123' }}
        ref={ref}
      />
    </>
  )
}
```

### QueryGroup API

##### source
```js
{
  type: 'InputNumber' | 'Input' | 'DatePicker' | 'DatePicker' | 'RangePicker' | JSX.Element; // it's value could be your customized form control
  name?: string;
  label: string;
  options?: { value: any; label: string }[];
  initialValue?: any;
  rules?: {[key: string]: any}; // antd form api "rules"
  style?: Dict;
  rangeNames?: string[];
  antdDataEntryProps?: {[key: string]: any}; // antd Data Entry Components' Props
  format?: string; // the data format, eg. 'YYYY-MM-DD HH:ss:mm'
}
```
##### onValidate
return the form data.

#### queryComp
your customzed comoponent used to trigger [onValidate](#onValidate)

#### antdFormProps
`QueryGroup` use the antd [Form](https://ant.design/components/form/), `antdFormProps` is hust the same with `antd Form` [API](https://ant.design/components/form/#API), but `onFinishFailed` `onFinish` are disabled in `antdFormProps`.
```js
  <QueryGroup
    ...
    antdFormProps={{ layout: 'vertical' }}
    ...
  />
```
#### ref
the `FormInstance` is the with `antd Table` FormInstance

```js
ref.current: { doValidate: () => Promise<any>; form: FormInstance },
```

#### buttonLable
the default button's label

## License

[MIT](LICENSE)
