import { history } from '@umijs/max';
import { getUserList } from '@/services/ai/user';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

// 扩展 UserItem 类型定义
type UserItem = {
  accountId: string;
  createBy: string;
  createTime: string;
  email: string;
  id: string;
  imgUrl: string;
  loginTime: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  memberLevel?: string; // 会员等级
  package?: string; // 购买套餐
  remainingDays?: number; // 剩余天数
  totalAmount?: number; // 累计下单金额
  lastOrderTime?: string; // 最近下单时间
};

const columns: ProColumns<UserItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: '用户ID',
    dataIndex: 'accountId',
    copyable: true,
  },
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '会员等级',
    dataIndex: 'memberLevel',
    valueEnum: {
      '自然会员': { text: '自然会员' },
      '月会员': { text: '月会员' },
      '季会员': { text: '季会员' },
      '年会员': { text: '年会员' },
    },
  },
  {
    title: '购买套餐',
    dataIndex: 'package',
    valueEnum: {
      '基础版': { text: '基础版' },
      '专业版': { text: '专业版' },
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '最近下单时间',
    dataIndex: 'lastOrderTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '累计下单金额',
    dataIndex: 'totalAmount',
    hideInSearch: true,
  },
  {
    title: '剩余天数',
    dataIndex: 'remainingDays',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (_, record) => [
      <a
        key="view"
        onClick={() => {
          history.push(`/account/detail/${record.accountId}`);
        }}
      >
        查看
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  
  return (
    <ProTable<UserItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const { current, pageSize, ...rest } = params;
        const listRes = await getUserList({
          pageNumber: current || 1,
          pageSize: pageSize || 10,
          ...rest,
        });
        
        if(listRes.code === 200){
          return {
            data: listRes.data.records,
            success: true,
            total: listRes.data.total,
          };
        }
        return {
          data: [],
          success: false,
          total: 0,
        };
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
    />
  );
};
