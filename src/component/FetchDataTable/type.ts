import { TableProps } from 'rc-table/lib/Table';

export type Dict = {[key: string]: any};

export type OriginDataModal =
  | {
      current?: string | number;
      pageSize?: string | number;
      total?: string | number;
      data: any;
    }
  | undefined;

export type fetchDataFuncType = (pagination: Dict, filters: Dict, sort: Dict, ...reset: any) => Promise<OriginDataModal | undefined>;

export type antdTablePropsType = TableProps<any> | Dict;

export type FdtRefCurrentAttrType = {
  doQuery: () => void;
}

export type FetchDataTableModel = {
  columns: Dict[];
  antdTableProps?: TableProps<any> | Dict;
  disableInitialQuery?: boolean; // 是否需要挂载时自动查询
  disableOnChangeQuery?: boolean; // 禁用onChange时自动查询
  ref?: React.Ref<any>;
  onGetData?: (data: any) => any; // 获取远程数据后的回调
  fetchDataFunc?: fetchDataFuncType;
};