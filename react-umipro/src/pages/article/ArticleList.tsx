import { PageContainer } from '@ant-design/pro-layout'

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import React, { useRef } from 'react';

import { fetchCnodeList } from '@/services/ant-design-pro/api'


const columns: ProColumns<API.Article>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    order: 100000,
    // tip: '标题过长会自动收缩',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ],
    // },
  },
  {
    disable: true,
    title: '访问量',
    dataIndex: 'visit_count',
    hideInSearch: true,
    align: 'center',
    render: (_:any, row:any) => {
      return <div>{row.reply_count} / {row.visit_count}</div>
    }
  },
  {
    disable: true,
    title: '品类',
    dataIndex: 'tab',
    align: 'center',
    order: 10000,
    valueType: 'select',
    // filters: true,
    // onFilter: true,
    // valueType: 'select',
    valueEnum: {
      default: { text: '全部', status: 'Default' },
      good: {
        text: '精华',
        status: 'Success',
      },
      ask: {
        text: '问答',
        status: 'Success',
      },
      share: {
        text: '分享',
        status: 'Error',
      },
      job: {
        text: '招聘',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    // hideInSearch: true,

    dataIndex: 'create_at',
    sorter: (a,b) => {
      // console.log('a', a)
      // console.log('b', b)
      return Date.parse(a.create_at) - Date.parse(b.create_at)
    },
    order: 9999,
    valueType: 'dateRange',
    align: 'center',
    render: (_:any, row: any) => {
      return <div>{ Date.parse(row.create_at)}</div>
    },
    // hideInTable: true,
    // search: {
    //   transform: (value) => {
    //     return {
    //       startTime: value[0],
    //       endTime: value[1],
    //     };
    //   },
    // },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

// 页面
const ArticleList: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer
      header={{
        title: '你好',
        breadcrumb: null
      }}
      content="文章列表页面"

    >
      <ProTable<API.Article>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log('---request', params, sort, filter)

          const pp = {
            tab: params.tab==='default'?'':params.tab,
            limit: params.pageSize,
            page: params.current
          }

          return fetchCnodeList({params: pp})

          // return request<{
          //   data: GithubIssueItem[];
          // }>('https://proapi.azurewebsites.net/github/issues', {
          //   params,
          //   method: 'GET'
          // });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          total: 51,
          onChange: (page) => console.log(page),
          pageSizeOptions: [2,5,10,20]
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  )
}
export default ArticleList
