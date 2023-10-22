'use client'

import {Noto_Serif} from "next/font/google";
import {Button, message, Table, Tabs, TabsProps, Popconfirm} from "antd";
import {useEffect, useState} from "react";
import {NewArticle} from "@/app/submitNew/page";
import {noCacheHeader} from "@/common/const";

const notoSerif = Noto_Serif({subsets: ['latin']})

export default function Moderation() {
  const [fetching, setFetching] = useState(false);

  const [waitingList, setWaitingList] = useState<({id: string;}&NewArticle)[]>([]);

  async function freshData() {
    setFetching(true);
    const res = await fetch('/api/fetchModeration',
        {
          headers: noCacheHeader
        })
    setFetching(false);

    if (!res.ok) {
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    let response = await res.json();

    setWaitingList(response.data);
  }

  useEffect(() => {
    freshData();
  }, []);

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
              dataSource={waitingList}
              loading={fetching}
              columns={[
                ...columns,
                {
                  title: '',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text, record) => (
                      <RowAction record={record} onSuccess={freshData} />
                  )
                },
              ]}
          />,
    },
    // {
    //   key: '2',
    //   label: 'History',
    //   children:
    //       <Table
    //           dataSource={waitingList}
    //           columns={[
    //             ...columns,
    //             {
    //               title: 'State', dataIndex: 'state', key: 'state', render: () => <Tag color="error">Rejected</Tag>
    //             },
    //           ]}
    //       />,
    // },
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

function RowAction({record, onSuccess}:{record:{id:string}&NewArticle, onSuccess: Function}) {
  const [pending, setPending] = useState(false);

  async function moderate(opinion: 0 | 1) {
    console.log(opinion);
    setPending(true);
    const res = await fetch(`/api/moderate`, {
      method: 'post',
      body: JSON.stringify({
        ...record,
        opinion,
      }),
      headers: noCacheHeader
    })

    if (!res.ok) {
      setPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    setPending(false);

    const response = await res.json();

    if (response.code === 0) {
      console.log(response);
      onSuccess();
      message.success('Success');
    } else {
      message.error(response.msg ?? 'error');
    }
  }

  return (
      <div style={{gap: 8, display: 'flex'}}>
        <Popconfirm
            title="Accept this submission"
            description="Are you sure to accept this submission?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => moderate(1)}
        >
          <Button loading={pending} type="primary" ghost>Accept</Button>
        </Popconfirm>
        <Popconfirm
            title="Reject this submission"
            description="Are you sure to reject this submission?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => moderate(0)}
        >
          <Button loading={pending} danger>Reject</Button>
        </Popconfirm>
      </div>
  );
}