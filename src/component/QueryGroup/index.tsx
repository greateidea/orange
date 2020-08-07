import React, { forwardRef, useImperativeHandle } from 'react';
import { Select, DatePicker, Input, Form, Button, InputNumber, Checkbox } from 'antd';
import { getOtherAntdTableProps } from '../FetchDataTable';
import  { FormProps, FormInstance } from 'antd/lib/form';

const { Item: FormItem } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;
const valuePropNameMap: Dict = {
  'Checkbox': 'checked',
};

type Dict = { [key: string]: any };

type entryType = 'InputNumber' | 'Input' | 'DatePicker' | 'DatePicker' | 'RangePicker' | string | React.ClassicComponentClass<any> | React.FC<any>;
type CriteriaSourceModel = {
  type: entryType;
  component?: JSX.Element;
  name?: string;
  label: string;
  options?: { value: any; label: string }[];
  initialValue?: any;
  rules?: Dict[];
  style?: Dict;
  rangeNames?: string[];
  antdDataEntryProps?: Dict;
  format?: string;
};

type QueryCriteriaGroupModel = {
  source: CriteriaSourceModel[];
  onValidate: (params: Dict) => any;
  initialValues?: any;
  key?: any;
  antdFormProps?: FormProps;
  queryComp?: string | JSX.Element | null;
  onFinishFailed?: (error: Dict) => void;
  buttonLabel?: string;
};

type QCGRefCurrentAttrType = {
  doValidate: () => Promise<any>;
  form: FormInstance;
}

export enum QueryCriteriaCompType {
  DatePicker = 'DatePicker',
  Input = 'Input',
  RangePicker = 'RangePicker',
  Select = 'Select',
  InputNumber = 'InputNumber',
}

const Comps = {
  DatePicker,
  Input,
  RangePicker,
  InputNumber,
  Checkbox,
} as Dict;

// 如果是RangePicker则有可能不设置name，需要设置默认name
const GetItemName = (item: Dict) => {
  const { name, type } = item;
  let formItemName = item.name;

  if (!name && type === QueryCriteriaCompType.RangePicker && Array.isArray(item.rangeNames) && item.rangeNames.length > 1) {
    formItemName = `${item.rangeNames[0]}-${item.rangeNames[1]}`;
  }

  return formItemName;
}

// FormItem默认值覆盖Form默认值
const GetInitialValues = (source: CriteriaSourceModel[], formInitialValuse: Dict) => {
  const finalInitialValues: Dict = { ...formInitialValuse };
  if (Array.isArray(source)) {
    source.forEach((item: object & Dict) => {
      if (item.hasOwnProperty('initialValue')) {
        finalInitialValues[item.name] = item.initialValue;
      }
    });
  }
  return finalInitialValues;
};

export default forwardRef<QCGRefCurrentAttrType | undefined, QueryCriteriaGroupModel>((props, ref) => {
  const { source, onValidate, key, initialValues, antdFormProps, queryComp, onFinishFailed, buttonLabel } = props;
  const [form] = Form.useForm();
  const compList: CriteriaSourceModel[] = Array.isArray(source) ? source.map(itm => ({ ...itm, name: GetItemName(itm) })) : [];
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useImperativeHandle(ref, () => ({
    // doValidate 暴露给父组件的方法
    doValidate: () => _triggerValidate(),
    form
  }));

  const renderFormItem = (itm: CriteriaSourceModel) => {
    let valuePropNameProps: Dict = {};
    if (typeof itm.type === 'string') {
      valuePropNameProps.valuePropName = valuePropNameMap[itm.type]
    }

    return (children: JSX.Element) => (
      <FormItem
        key={itm.name}
        label={itm.label}
        name={itm.name}
        rules={itm.rules}
        { ...valuePropNameProps }
        // initialValue={itm.initialValue}
        style={{ marginBottom: 10, ...(itm.style || {}) }}
      >
        { children }
      </FormItem>
    )
  }

  const getComps = (source: CriteriaSourceModel[]) =>
    source.map((itm: CriteriaSourceModel) => {
      let Comp = null;

      if (itm.type === 'Select') {
        return renderFormItem(itm)(
          <Select allowClear style={{ width: 200 }} {...itm.antdDataEntryProps}>
            {itm.options?.map((opt: Dict) => (
              <Option value={opt.value} key={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        );
      } else if (itm.type === 'Checkbox.Group') {
        return renderFormItem(itm)(
          <Checkbox.Group options={itm.options} {...itm.antdDataEntryProps}/>
        );
      } else if (typeof itm.type === 'string') {
        Comp = Comps[itm.type]
      } else {
        Comp = itm.type || null;
      }

      return Comp ? renderFormItem(itm)(<Comp allowClear {...itm.antdDataEntryProps} />) : null;
    });

  const onFinish = (values: Dict) => {
    compList.forEach((itm: Dict) => {

      const curretValue = values[itm.name];

      if (itm.type === 'DatePicker' && curretValue) {
        values[itm.name] = curretValue.format(itm.format || 'YYYY-MM-DD HH:ss:mm');
      } else if (itm.type === 'RangePicker' && curretValue) {
        const firstName = (itm.rangeNames || [])[0];
        const secondName = (itm.rangeNames || [])[1];
        values[firstName] = curretValue[0].format(itm.format || 'YYYY-MM-DD HH:ss:mm');
        values[secondName] = curretValue[1].format(itm.format || 'YYYY-MM-DD HH:ss:mm');

        delete values[itm.name];
      }
    });

    const newValues = {} as Dict;
    for (let key in values) {
      const originValue = values[key];
      if (originValue !== '' && originValue !== null && originValue !== undefined) {
        newValues[key] = originValue;
      }
    }
    return onValidate(newValues);
  };

  const currentInitialValues = GetInitialValues(compList, initialValues);

  const _triggerValidate = () => {
    return form.validateFields()
    .then(values => {
       return onFinish(values);
    })
    .catch(errorInfo => {
      onFinishFailed && onFinishFailed(errorInfo);
    })
  }

  const renderQueryComp = () => {
    if (queryComp === null) {
      return null
    } else if (queryComp) {
      return (
        <span onClick={() => _triggerValidate()}>{queryComp}</span>
      )
    }

    return <Button type="primary" htmlType="submit"> { buttonLabel || '查询' }</Button>
  }

  return (
    <Form
      form={form}
      key={key}
      layout="inline"
      name="basic"
      initialValues={{ ...(currentInitialValues || {}) }}
      onFinish={onFinish}
      size="middle"
      onFinishFailed={onFinishFailed}
      {...getOtherAntdTableProps(antdFormProps, ['onFinish', 'onFinishFailed'])}
    >
      {getComps(compList)}
      {Array.isArray(compList) && compList.length ? (
        <Form.Item {...tailLayout} key={key} style={{ marginBottom: 10 }}>
          { renderQueryComp() }
        </Form.Item>
      ) : null}
    </Form>
  );
});
