import { getUserInfo } from '@/services/ai/user';
import { useParams } from '@umijs/max';
import { Button, Card, Descriptions, Modal, Form, Input, Select, message } from 'antd';
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