'use client'

import {Noto_Serif} from "next/font/google";
import {Table, Rate, Space, Select, DatePicker, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useParams, useRouter} from 'next/navigation'

const notoSerif = Noto_Serif({subsets: ['latin']})

export default function Moderation() {
  const router = useRouter();
  const params = useParams();

  const dataSource = {
    "title": "LLM",
    "authors": "string",
    "yop": "2023",
    "jName": "ICSE",
    "SEpractice": "string",
    "claim": "string",
    "ROE": "string",
    "TOR": "string",
    "TOP": "string",
    "id": "653231df9858341079519bf6"
  };

  const columns = [
    {title: 'Title', dataIndex: 'title', key: 'title',},
    {title: 'Authors', dataIndex: 'authors', key: 'authors',},
    {title: 'Journal Name', dataIndex: 'jName', key: 'jName',},
    {title: 'Year of Public', dataIndex: 'yop', key: 'yop',},
    {title: 'SE Practice', dataIndex: 'SEpractice', key: 'SEpractice',},
    {title: 'Claim', dataIndex: 'claim', key: 'claim',},
    {title: 'Result of evidence', dataIndex: 'ROE', key: 'ROE',},
    {title: 'Type of research', dataIndex: 'TOR', key: 'TOR',},
    {title: 'Type of participant', dataIndex: 'TOP', key: 'TOP',},
  ];


  return (
      <div style={{
        marginTop: 32,
        marginBottom: 80,
        gap: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <h2 className={notoSerif.className}>Search Result</h2>
        <Space.Compact>
          <Select
              mode="multiple"
              allowClear
              maxTagCount='responsive'
              style={{width: 200}}
              placeholder="Select SE practice"
              options={[
                {label: 122, value: 12},
                {label: 431, value: 13},
                {label: 143432, value: 14},
                {label: 1523, value: 15},
                {label: 5325231, value: 16},
              ]}
          />
          <DatePicker picker="year"/>
          <Button
              style={{backgroundColor: '#2525af'}}
              type="primary"
              icon={<SearchOutlined/>}
              onClick={() => router.push('/searchResult')}
          >
            Search
          </Button>
        </Space.Compact>
        <Table
            dataSource={new Array(15).fill(0).map(() => dataSource)}
            columns={[
              ...columns,
              // {
              //   title: '', dataIndex: 'action', key: 'action',
              //   render: () => (
              //       <Rate/>
              //   )
              // },
            ]}
        />,
      </div>
  )
}