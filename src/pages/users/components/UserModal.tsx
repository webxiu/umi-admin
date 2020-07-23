import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const UserModel = props => {
  const [form] = Form.useForm();
  const { visible, record, closeVisible } = props;

  useEffect(() => {
    // 解决报错: Modal组件还没完加载完毕就填入数据 跟react生命周期不符 而报错
    form.setFieldsValue(record);
    // return () => {
    //   console.log('卸载执行 :>> ');
    // };
  }, [visible]);

  const handleOk = () => {
    closeVisible();
  };
  // const handleCancel = ()=>{
  //     visible = false
  // }

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={closeVisible}
      forceRender
    >
      <Form name="basic" form={form}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="创建时间"
          name="create_time"
          rules={[{ required: true, message: '请输入创建时间!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '请输入状态!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModel;
