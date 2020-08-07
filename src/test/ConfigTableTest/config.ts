import moment from 'moment';

const start = moment()
  .subtract(1, 'years')
  .format('YYYY-MM-DD 00:00:00');

const end = moment().format('YYYY-MM-DD 23:59:59');

// 影像信息查询
const bankplusimage = {
  queryUrl: 'bankplus/queryUserImage',
  key: 'bankplusimage',
  columns: [
    {
      title: '订单号',
      dataIndex: 'orderNum',
      key: 'orderNum',
    },
    {
      title: '渠道名称',
      dataIndex: 'channelName',
      key: 'channelName',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '身份证号',
      dataIndex: 'certNo',
      key: 'certNo',
    },
    {
      title: '签发机关',
      dataIndex: 'signOrg',
      key: 'signOrg',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '地址',
      dataIndex: 'addr',
      key: 'addr',
    },
    {
      title: '有效期',
      dataIndex: 'validDate',
      key: 'validDate',
    },
    {
      title: '民族',
      dataIndex: 'nation',
      key: 'nation',
    },
    {
      title: '正面地址',
      dataIndex: 'frontUrl',
      key: 'frontUrl',
    },
    {
      title: '反面地址',
      dataIndex: 'backUrl',
      key: 'backUrl',
    },
    {
      title: '上传类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '图片来源',
      dataIndex: 'imageSource',
      key: 'imageSource',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '状态描述',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    },
    {
      title: '错误码',
      dataIndex: 'errorCode',
      key: 'errorCode',
    },
    {
      title: '错误文案',
      dataIndex: 'errorMsg',
      key: 'errorMsg',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: '修改时间',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
    },
    {
      title: '来源渠道',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '门户入口',
      dataIndex: 'portalDesc',
      key: 'portalDesc',
    },
  ],
  queryParams: {
    pageSize: '10',
    pageNo: '1',
    start,
    end,
    // channelCode: '',
  },
  queryCriteria: [
    {
      type: 'DatePicker',
      label: '创建开始日期',
      name: 'start',
      rules: [
        {
          required: true,
          message: '请输入开始日期!',
        },
      ],
    },
    {
      type: 'DatePicker',
      label: '创建结束日期',
      name: 'end',
      rules: [
        {
          required: true,
          message: '请输入结束日期!',
        },
      ],
    },
    // 渠道名称
    {
      type: 'ChannelSelect',
      label: '渠道名称',
      name: 'channelCode',
      rules: [
        {
          required: true,
          message: '请选择!',
        },
      ],
    },
  ],
  disableOnChangeQuery: true,
  needJdpin: true,
};

export default bankplusimage;
