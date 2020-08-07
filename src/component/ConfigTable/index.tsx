import React , { forwardRef } from 'react';
import FetchDataTable from '../FetchDataTable';
import { fetchDataFuncType, Dict, antdTablePropsType, FdtRefCurrentAttrType } from '../FetchDataTable/type';

/**
 * fetchDataFunc: Function
 * antdTableProps?: TableProps<any>; antd Table 组件的props
 * onGetData?: (data?: Dict | string) => any; 获取数据后的回调
 * config 配置信息
 * customProps?: Dict; 传给自定义组件的props
 * configKey: string; the key
 */

type ConfigTableModal = {
  config: Dict;
  fetchDataFunc: fetchDataFuncType;
  configKey: string;
  antdTableProps?: antdTablePropsType;
  onGetData?: (data?: Dict | string) => any;
  customProps?: Dict;
}

export default forwardRef<FdtRefCurrentAttrType & any, ConfigTableModal>((props, ref) => {
  const { config = {}, onGetData, antdTableProps, fetchDataFunc, configKey } = props;
  const { customProps, ...resetProps } = props;
  const { columns, disableInitialQuery, disableOnChangeQuery, component: CustomerCompConstructor } = config;
  const keyProp = { key: configKey };

  return (
    <div>
      {
        CustomerCompConstructor
          ? <CustomerCompConstructor {...resetProps} {...keyProp} { ...customProps }/>
          : <FetchDataTable
              fetchDataFunc={fetchDataFunc}
              columns={columns}
              disableInitialQuery={disableInitialQuery}
              disableOnChangeQuery={disableOnChangeQuery}
              onGetData={onGetData}
              antdTableProps={antdTableProps}
              {...keyProp}
              ref={ref}
            />
      }
    </div>
  )
})
