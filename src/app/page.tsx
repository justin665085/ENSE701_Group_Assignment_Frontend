'use client'

import {Noto_Serif} from "next/font/google";
import {Button, DatePicker, Select, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const notoSerif = Noto_Serif({subsets: ['latin']})

export default function Home() {
  return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
        paddingBottom: 80,
      }}>
        <h1 style={{ color: '#1e1e8f' }} className={notoSerif.className}>Find Articles By</h1>
        <Space.Compact style={{ border: '16px solid #f4f4f4', borderRadius: 24}} size="large">
          <Select
              mode="multiple"
              allowClear
              size='large'
              maxTagCount='responsive'
              style={{ width: 200 }}
              placeholder="Select SE practice"
              options={[
                {label: 122, value: 12},
                {label: 431, value: 13},
                {label: 143432, value: 14},
                {label: 1523, value: 15},
                {label: 5325231, value: 16},
              ]}
          />
          <DatePicker.RangePicker picker="year" />
          <Button style={{ backgroundColor: '#2525af' }} type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Space.Compact>


      </div>
  )
}
