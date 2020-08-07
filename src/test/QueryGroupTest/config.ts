import moment from 'moment';
import CustomerInput from './CustomerQueryComp/customerInput';

const startMoment = moment().subtract(1, 'years');
const endMoment = moment();

export default [
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
    // name: 'startTime-endTime',
    type: 'RangePicker',
    rangeNames: ['startTime', 'endTime'],
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
    type: CustomerInput,
    antdDataEntryProps: { allowClear: true },
    initialValue: 111,
  },
]