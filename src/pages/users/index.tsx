import React, { useState } from 'react';
import { connect } from 'umi';
import { Table, Space, Popconfirm, Button } from 'antd';
import UserModal from './components/UserModal';

const index = ({ users, dispatch, tableLoading }) => {
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
    const id = record && record.id ? record.id : 0;

    if (id) {
      dispatch({ type: 'users/edit', payload: { id, values } });
    } else {
      dispatch({ type: 'users/add', payload: { values } });
    }
    setVisible(false); // 失败弹窗也关闭  不合理
  };

  // 确认删除
  const confirm = paramas => {
    const id = record.id;
    dispatch({ type: 'users/delete', payload: { id } });
    console.log('确认删除id', id);
  };
  // 取消删除
  const cancel = paramas => {
    console.log('取消删除 :>> ');
  };

  const addHander = () => {
    setVisible(true);
    setRecord(undefined); // 添加清空输入框
  };

  return (
    <div>
      <Button type="primary" onClick={addHander}>
        添加
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={tableLoading}
      />
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
  // console.log('state :>> ', state);
  return {
    users: state.users,
    tableLoading: state.loading.models.users,
  };
};

export default connect(mapStateToProps)(index);
