# @cofe/easy-ui

Some Components used [antd](https://ant.design/).

Make your life easy，wish you have a happy life.

## Installing

```sh
npm install @jdd/cofe-common
```
## Example
```js
import { QueryGroup } from '@jdd/cofe-common/easy-ui';
import moment from 'moment';

const startMoment = moment().subtract(1, 'years');
const endMoment = moment();

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
    label: '自定义输入框',
    name: 'coolNumber',
    type: CustomerInput, // your customized form control
    initialValue: 111,
  },
]

export default (props) => {
  return (
    <>
      <Button onClick={() => { ref.current?.doValidate() }}>查询</Button>
      <QueryCriteriaGroup
        source={config}
        onValidate={(values: Dict) => { console.log("values: ", values) }}
        queryComp={<a>点击查询</a>} 
        initialValues={{ name: 'a cool name', phone: '123' }}
        ref={ref}
      />
    </>
  )
}
```
## API

### QueryGroup

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

## License
[MIT](LICENSE)
