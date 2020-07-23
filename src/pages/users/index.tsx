import React, { useState } from 'react';
import { Table, Space } from 'antd';
import { connect } from 'umi';

import UserModal from './components/UserModal';

const index = props => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
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
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const closeVisible = () => {
    setVisible(false);
  };

  return (
    <div>
      <Table columns={columns} dataSource={props.users} rowKey="id" />
      <UserModal
        visible={visible}
        closeVisible={closeVisible}
        record={record}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};
const mapDispatchToState = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToState)(index);
