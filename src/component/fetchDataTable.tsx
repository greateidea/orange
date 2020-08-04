import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Table, Empty } from 'antd';
import { TableProps } from 'rc-table/lib/Table';

/**
 * columns: 表头
 * disableInitialQuery: 禁用挂载时查询
 * onGetData: 获取远程数据后的回调
 * andtTableProps: antd Table的props, columns, dataSource会被忽略
 * ref: 获取内部方法，例如点击查询时处罚查询
 * fetchDataFunc: 获取远程数据的函数，在组件挂在时和onChange事件时执行
 */
type Dict = {[key: string]: any};

type OriginDataModal =
  | {
      current: string | number;
      pageSize: string | number;
      total: string | number;
      data: any;
    }
  | undefined;

type FetchDataTableModel = {
  columns: Dict[];
  antdTableProps?: TableProps<any> & Dict;
  disableInitialQuery?: boolean; // 是否需要挂载时自动查询
  ref?: React.Ref<any>;
  onGetData?: (data: any) => any; // 获取远程数据后的回调
  fetchDataFunc?: (pagination: Dict) => Promise<OriginDataModal | undefined>;
};

type FdtRefCurrentAttrType = {
  doQuery: () => void;
}

const getOtherAntdTableProps = (originAntdTableProps = {}) => {
  let currentAntdTableProps: Dict = {};
  const disableList = ['columns', 'dataSource', 'onChange'];

  for (let key in originAntdTableProps) {
    if (disableList.findIndex(disabledKey => disabledKey === key) > -1) {
      console.warn(`the props [${key}] will be ignore.`);
    } else {
      currentAntdTableProps[key] === (originAntdTableProps as Dict)[key];
    }
  }
};

export default forwardRef<FdtRefCurrentAttrType, FetchDataTableModel>((props, ref) => {
  const { columns, disableInitialQuery, antdTableProps, onGetData, fetchDataFunc } = props;
  const [data, setData] = useState<Dict[]>([]);
  const [pagination, setPagination] = useState<any>({ current: '1', pageSize: '10', total: '0' });
  const [loading, setLoading] = useState<boolean>(false);

  const instanceValue = useRef<any>({ unmount: false });

  const newInvokeFetchData = (pagination: Dict) => {
    setLoading(true);
    fetchDataFunc &&
      fetchDataFunc(pagination).then((originData: OriginDataModal) => {
        if (originData) {
          const { data, pageSize, current, total } = originData;
          if (instanceValue.current.unmount) {
            return;
          }
          setPagination({ current, pageSize, total });
          setData(Array.isArray(data) ? data : []);
          onGetData && onGetData(originData);
        }
        setLoading(false);
        return originData;
      });
  };

  useEffect(() => {
    instanceValue.current.unmount =  false;
    if (!disableInitialQuery) {
      newInvokeFetchData && newInvokeFetchData({ current: 1, pageSize: 10 });
    }
    return () => {
      instanceValue.current.unmount = true;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    // doQuery 暴露给父组件的方法
    doQuery: () => {
      console.log('do query');
      newInvokeFetchData && newInvokeFetchData({ current: 1, pageSize: 10 });
    },
  }));

  const handleTableChange = (tablePagination: Dict, filters: Dict, sorter: Dict) => {
    console.log('pagination, filters, sorter', tablePagination, filters, sorter);
    const { current, pageSize } = pagination;
    if (!current || !pageSize) {
      // 返回的数据没有分页信息，不需要分页时查询
      return;
    }

    newInvokeFetchData(tablePagination);
  };

  return (
    <>
      {Array.isArray(data) && data.length ? (
        <Table
          size="small"
          columns={columns}
          dataSource={data.map((itm: any) => ({ ...itm, key: itm.name }))}
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          {...getOtherAntdTableProps(antdTableProps)}
        />
      ) : (
        <Empty />
      )}
    </>
  );
});
