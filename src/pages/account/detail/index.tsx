import { getUserInfo } from '@/services/ai/user';
import { useParams } from '@umijs/max';
import { Button, Card, Descriptions, Modal, Form, Input, Select, message, Tabs, Space } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import './index.less';

type UserDetailInfo = {
  accountId: string;
  name: string;
  phone: string;
  email: string;
  memberLevel: string;
  package: string;
  createTime: string;
  totalAmount: number;
  lastOrderTime: string;
  remainingDays: number;
  token?: number;
  consumePoints?: number;
  imageCount?: number;
  musicCount?: number;
  pptCount?: number;
};

// 订单记录类型
type OrderRecord = {
  id: string;
  orderNo: string;
  amount: number;
  memberLevel: string;
  package: string;
  createTime: string;
  status: string;
};

// 对话记录类型
type ChatRecord = {
  id: string;
  model: string;
  prompt: string;
  response: string;
  token: number;
  createTime: string;
  status: string;
};

// 积分消耗类型
type PointRecord = {
  id: string;
  model: string;
  feature: string;
  pointChange: number;
  remainingPoints: number;
  createTime: string;
};

// 修改记录类型
type ModifyRecord = {
  id: string;
  modifyType: string;
  modifyTarget: string;
  beforeValue: string;
  afterValue: string;
  operator: string;
  modifyTime: string;
};

const UserDetail: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserDetailInfo>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const params = useParams<{ id: string }>();

  const fetchUserInfo = async () => {
    if (params.id) {
      try {
        const res = await getUserInfo({ accountId: params.id });
        if (res.code === 200) {
          // 补充一些后端可能没有的字段
          setUserInfo({
            ...res.data,
            token: 10000, // 模拟数据
            consumePoints: 11,
            imageCount: 11,
            musicCount: 12,
            pptCount: 11,
          });
        }
      } catch (error) {
        message.error('获取用户信息失败');
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [params.id]);

  const handleModify = async (values: any) => {
    console.log('修改的值:', values);
    // TODO: 调用修改接口
    message.success('修改成功');
    setIsModalVisible(false);
    fetchUserInfo(); // 重新获取用户信息
  };

  // 订单记录列定义
  const orderColumns: ProColumns<OrderRecord>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'index', width: 48 },
    { title: '订单号', dataIndex: 'orderNo' },
    { title: '订单金额', dataIndex: 'amount' },
    { title: '购买会员', dataIndex: 'memberLevel' },
    { title: '购买套餐', dataIndex: 'package' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { 
      title: '状态', 
      dataIndex: 'status',
      valueEnum: {
        '未支付取消': { text: '未支付取消', status: 'Default' },
        '支付成功': { text: '支付成功', status: 'Success' },
      }
    },
  ];

  // 对话记录列定义
  const chatColumns: ProColumns<ChatRecord>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'index', width: 48 },
    { title: '模型', dataIndex: 'model' },
    { title: '提示词', dataIndex: 'prompt' },
    { title: '返回', dataIndex: 'response' },
    { title: '消耗token', dataIndex: 'token' },
    { title: '时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { 
      title: '状态', 
      dataIndex: 'status',
      valueEnum: {
        '成功': { text: '成功', status: 'Success' },
        '失败': { text: '失败', status: 'Error' },
      }
    },
  ];

  // 积分消耗列定义
  const pointColumns: ProColumns<PointRecord>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'index', width: 48 },
    { title: '模型', dataIndex: 'model' },
    { title: '功能', dataIndex: 'feature' },
    { title: '积分变动', dataIndex: 'pointChange' },
    { title: '剩余积分', dataIndex: 'remainingPoints' },
    { title: '时间', dataIndex: 'createTime', valueType: 'dateTime' },
  ];

  // 修改记录列定义
  const modifyColumns: ProColumns<ModifyRecord>[] = [
    { title: '序号', dataIndex: 'index', valueType: 'index', width: 48 },
    { title: '修改类型', dataIndex: 'modifyType' },
    { title: '修改对象', dataIndex: 'modifyTarget' },
    { title: '变更前', dataIndex: 'beforeValue' },
    { title: '变更后', dataIndex: 'afterValue' },
    { title: '操作人', dataIndex: 'operator' },
    { title: '修改时间', dataIndex: 'modifyTime', valueType: 'dateTime' },
  ];

  // Mock数据
  const mockOrderData: OrderRecord[] = [
    {
      id: '1',
      orderNo: 'xxxxxxx',
      amount: 100,
      memberLevel: '月会员',
      package: '基础套餐',
      createTime: '2024-12-12 11:11:11',
      status: '未支付取消',
    },
    {
      id: '2',
      orderNo: 'xxxxxxx',
      amount: 100,
      memberLevel: '月会员',
      package: '基础套餐',
      createTime: '2024-12-12 11:11:11',
      status: '支付成功',
    },
  ];

  const mockChatData: ChatRecord[] = [
    {
      id: '1',
      model: '3.5',
      prompt: '-',
      response: 'xxxxxxxxxxxx',
      token: 0,
      createTime: '2024-12-12 11:11:11',
      status: '成功',
    },
    {
      id: '2',
      model: '4o',
      prompt: 'xxxxxxxxxxxx',
      response: '-',
      token: 0,
      createTime: '2024-12-12 11:11:11',
      status: '失败',
    },
  ];

  const mockPointData: PointRecord[] = [
    {
      id: '1',
      model: 'mj',
      feature: '绘图',
      pointChange: -1,
      remainingPoints: 1,
      createTime: '2024-12-12 11:11:11',
    },
    {
      id: '2',
      model: 'suno',
      feature: '作曲',
      pointChange: -1,
      remainingPoints: 2,
      createTime: '2024-12-12 11:11:11',
    },
  ];

  const mockModifyData: ModifyRecord[] = [
    {
      id: '1',
      modifyType: '基础信息',
      modifyTarget: '姓名',
      beforeValue: '-1',
      afterValue: '1',
      operator: '用户',
      modifyTime: '2024-12-12 11:11:11',
    },
    {
      id: '2',
      modifyType: '会员相关',
      modifyTarget: '积分',
      beforeValue: '27',
      afterValue: '27000',
      operator: '王大川',
      modifyTime: '2024-12-12 11:11:11',
    },
  ];

  if (!userInfo) {
    return null;
  }

  return (
    <div className="user-detail">
      <Card
        className="user-detail-card"
        title="用户信息"
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            强制修改
          </Button>
        }
      >
        <Descriptions column={3}>
          <Descriptions.Item label="姓名">{userInfo.name}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
          <Descriptions.Item label="会员等级">{userInfo.memberLevel}</Descriptions.Item>
          <Descriptions.Item label="购买套餐">{userInfo.package}</Descriptions.Item>
          <Descriptions.Item label="截止日期">{userInfo.lastOrderTime}</Descriptions.Item>
          <Descriptions.Item label="剩余积分">{userInfo.consumePoints}</Descriptions.Item>
        </Descriptions>

        <Descriptions column={4}>
          <Descriptions.Item label="累计消耗token">{userInfo.token}</Descriptions.Item>
          <Descriptions.Item label="绘图次数">{userInfo.imageCount}</Descriptions.Item>
          <Descriptions.Item label="作曲次数">{userInfo.musicCount}</Descriptions.Item>
          <Descriptions.Item label="PPT次数">{userInfo.pptCount}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="user-detail-tabs" style={{ marginTop: 24 }}>
        <Tabs
          items={[
            {
              key: 'order',
              label: '订单记录',
              children: (
                <ProTable<OrderRecord>
                  columns={orderColumns}
                  dataSource={mockOrderData}
                  rowKey="id"
                  search={false}
                  pagination={false}
                  dateFormatter="string"
                />
              ),
            },
            {
              key: 'chat',
              label: '对话记录',
              children: (
                <ProTable<ChatRecord>
                  columns={chatColumns}
                  dataSource={mockChatData}
                  rowKey="id"
                  search={{
                    filterType: 'light',
                  }}
                  pagination={false}
                  dateFormatter="string"
                />
              ),
            },
            {
              key: 'point',
              label: '积分消耗',
              children: (
                <ProTable<PointRecord>
                  columns={pointColumns}
                  dataSource={mockPointData}
                  rowKey="id"
                  search={{
                    filterType: 'light',
                  }}
                  pagination={false}
                  dateFormatter="string"
                />
              ),
            },
            {
              key: 'modify',
              label: '修改记录',
              children: (
                <ProTable<ModifyRecord>
                  columns={modifyColumns}
                  dataSource={mockModifyData}
                  rowKey="id"
                  search={false}
                  pagination={false}
                  dateFormatter="string"
                />
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="强制修改"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={500}
        className="user-detail-modal"
      >
        <Form
          form={form}
          onFinish={handleModify}
          initialValues={{
            memberLevel: userInfo.memberLevel,
            package: userInfo.package,
            lastOrderTime: userInfo.lastOrderTime,
            remainingPoints: userInfo.consumePoints,
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="会员等级" name="memberLevel">
            <Select>
              <Select.Option value="月会员">月会员</Select.Option>
              <Select.Option value="季会员">季会员</Select.Option>
              <Select.Option value="年会员">年会员</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="购买套餐" name="package">
            <Select>
              <Select.Option value="基础套餐">基础套餐</Select.Option>
              <Select.Option value="专业版">专业版</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="截止日期" name="lastOrderTime">
            <Input />
          </Form.Item>
          <Form.Item label="剩余积分" name="remainingPoints">
            <Input />
          </Form.Item>

          <div className="divider" />

          <Form.Item 
            label="操作人"
            className="operator-item"
          >
            <Input value={userInfo.name} disabled />
          </Form.Item>
          <Form.Item 
            label="确认操作人" 
            name="confirmOperator"
            required
            rules={[{ required: true, message: '请输入确认操作人' }]}
          >
            <Input placeholder="请输入确认操作人" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} className="form-footer">
            <Button 
              onClick={() => setIsModalVisible(false)} 
              className="cancel-button"
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDetail; 