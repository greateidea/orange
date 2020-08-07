import React, { useState, useRef } from 'react';
import { Button, Modal, Divider } from 'antd';
import QueryCriteriaGroup from '../../component/QueryGroup';
import config from './config';
import { Dict } from '../../component/FetchDataTable/type';

export default () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<{doValidate: () => any, form: any }>();
  const ref2 = useRef<{doValidate: () => any, form: any }>();
  const [queryGroupConfig, setQueryGroupConfig] = useState(config);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };

  return (
    <div>
      <Button onClick={() => { ref.current?.doValidate().then((r: any) => console.log("查询起来: ", r)) }}>查询起来</Button>
      <QueryCriteriaGroup
        source={config}
        onValidate={(values: Dict) => {
          console.log("values: ", values)
          return "perfect done"
        }}
        queryComp={<a>点击查询</a>} 
        initialValues={{ name: 'a cool name', phone: '123' }}
        ref={ref}
      />

    <Divider />

      <Button onClick={() => { setVisible(true) }}>Query In Modal</Button>
      <Modal
        visible={visible}
        onCancel={() => { setVisible(false) }}
        onOk={() => {
          ref2.current?.doValidate()
          .then((r: any) => {
            if(r) {
              console.log('doValidate: ', r)
              setVisible(false);
              ref2.current?.form.resetFields();
            }
          });
        }}
      >
        <QueryCriteriaGroup
          source={queryGroupConfig}
          onValidate={(values: Dict) => {
            console.log("values: ", values)
            return "doQuery sucess"
          }}
          queryComp={null}
          initialValues={{ name: 'a cool name', phone: '123' }}
          antdFormProps={{
            layout: 'horizontal',
            onValuesChange: ((changedValues, allValues) => {
              if(allValues.godAnimal?.includes('white tiger')) {
                console.log('onValuesChange', changedValues)
                setQueryGroupConfig(config.concat([
                  { type: "Input", name: "external1", label: "额外表单项1" },
                  { type: "Input", name: "external2", label: "额外表单项2" },
                ] as any))
              } else {
                setQueryGroupConfig(config);
              }
            }),
            ...formItemLayout
          }} 
          ref={ref2}
        />
      </Modal>
    </div>
  )
}
