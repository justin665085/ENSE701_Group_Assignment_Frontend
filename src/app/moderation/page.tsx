'use client'

import {Noto_Serif} from "next/font/google";
import {Button, Tag, Table, Tabs, TabsProps, Popconfirm} from "antd";
import {Simulate} from "react-dom/test-utils";
import cancel = Simulate.cancel;

const notoSerif = Noto_Serif({subsets: ['latin']})

export default function Moderation() {
  const dataSource = {
    authors: 'Jack',
    doi: '10.23/1s0d',
    jName: 'Hale',
    number: '1',
    pages: '28-32',
    title: 'Have a Good Day',
    volume: '2',
    yop: '2021',
  };

  const columns = [
    {title: 'Title', dataIndex: 'title', key: 'title',},
    {title: 'Authors', dataIndex: 'authors', key: 'authors',},
    {title: 'Journal Name', dataIndex: 'jName', key: 'jName',},
    {title: 'Year of Public', dataIndex: 'yop', key: 'yop',},
    {title: 'Volume', dataIndex: 'volume', key: 'volume',},
    {title: 'Number', dataIndex: 'number', key: 'number',},
    {title: 'Pages', dataIndex: 'pages', key: 'pages',},
    {title: 'DOI', dataIndex: 'doi', key: 'doi',},
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Waiting Queue',
      children:
          <Table
              dataSource={new Array(15).fill(0).map(() => dataSource)}
              columns={[
                ...columns,
                {
                  title: '', dataIndex: 'action', key: 'action', render: () => (
                      <div style={{gap: 8, display: 'flex'}}>
                        <Popconfirm
                            title="Accept this submission"
                            description="Are you sure to accept this submission?"
                            okText="Yes"
                            cancelText="No"
                        >
                          <Button type="primary" ghost>Accept</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Reject this submission"
                            description="Are you sure to reject this submission?"
                            okText="Yes"
                            cancelText="No"
                        >
                          <Button danger>Reject</Button>
                        </Popconfirm>
                      </div>
                  )
                },
              ]}
          />,
    },
    {
      key: '2',
      label: 'History',
      children:
          <Table
              dataSource={new Array(1542).fill(0).map(() => dataSource)}
              columns={[
                ...columns,
                {
                  title: 'State', dataIndex: 'state', key: 'state', render: () => <Tag color="error">Rejected</Tag>
                },
              ]}
          />,
    },
  ];

  return (
      <div style={{
        marginTop: 32,
        marginBottom: 80,
        gap: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <h2 className={notoSerif.className}>Moderation</h2>
        <Tabs defaultActiveKey="1" items={items}/>
      </div>
  )
}