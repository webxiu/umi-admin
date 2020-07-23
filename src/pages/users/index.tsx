import React, { useState } from 'react';
import { Table, Space, Popconfirm } from 'antd';
import { connect } from 'umi';

import UserModal from './components/UserModal';
import { values } from 'lodash';
import classNames from 'classnames';

const index = ({ users, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a style={{ color: '#f0f' }}>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: time => {
        const d = new Date(time).toLocaleString();
        const t = d.replace(/[\u4e00-\u9fa5]/g, '');
        return <span>{t}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 关闭编辑弹窗
  const closeVisible = () => {
    setVisible(false);
  };

  // 编辑接口调用
  const onFinish = values => {
    const id = record.id;
    dispatch({
      type: 'users/edit',
      payload: { id, ...values },
    });
  };

  // 确认删除
  const confirm = paramas => {
    console.log('确认删除 :>> ');
  };
  // 确认删除
  const cancel = paramas => {
    console.log('取消删除 :>> ');
  };

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <UserModal
        visible={visible}
        closeVisible={closeVisible}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(index);
