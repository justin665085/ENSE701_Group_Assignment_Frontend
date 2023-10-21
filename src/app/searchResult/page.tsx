'use client'

import {Noto_Serif} from "next/font/google";
import {Table, Space, DatePicker, Button, Input, message} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";

const notoSerif = Noto_Serif({subsets: ['latin']})

export default function Moderation() {
  const router = useRouter();
  const params = useSearchParams()

  const paramPractice = params.get('practice') ?? '';
  const paramYear = params.get('year') ?? '';

  const [practice, setPractice] = useState(paramPractice);
  const [year, setYear] = useState(paramYear);

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
          <Input
              value={practice ?? ''}
              onChange={(e) => setPractice(e.target.value)}
              style={{ width: 200 }}
              placeholder='Input SE Practice'
          />
          <DatePicker
              onChange={(dayjs) => setYear(''+dayjs?.year())}
              picker="year"
              {...(year === null || year.length === 0 ? {} : {value: dayjs().year(+year)})}
          />
          <Button
              style={{backgroundColor: '#2525af'}}
              type="primary"
              icon={<SearchOutlined/>}
              onClick={() => {
                router.push(`/searchResult?practice=${practice}&year=${year}`)
              }}
          >
            Search
          </Button>
        </Space.Compact>
        <ResultTable key={''+paramYear+paramPractice} practice={paramPractice} year={paramYear} />
      </div>
  )
}

function ResultTable({practice, year}:{practice: string, year: string}) {
  const initialed = useRef(false);
  const [pending, setPending] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  async function search() {
    setPending(true);
    const res = await fetch(`/api/search?practice=${practice}&year=${year}`,)

    if (!res.ok) {
      setPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    setPending(false);

    const response = await res.json();

    if (response.code === 0) {
      setSearchResult(response.data);
    } else {
      message.error(response.msg ?? 'error');
    }
  }

  if (!initialed.current) {
    search();
    initialed.current = true;
  }

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
      <Table
          loading={pending}
          dataSource={searchResult}
          columns={[
            ...columns,
            // {
            //   title: '', dataIndex: 'action', key: 'action',
            //   render: () => (
            //       <Rate/>
            //   )
            // },
          ]}
      />
  )
}