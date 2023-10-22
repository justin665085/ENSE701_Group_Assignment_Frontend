'use client'

import {Noto_Serif} from "next/font/google";
import {Input, Button, Form, DatePicker, Select, message} from "antd";
import dayjs from "dayjs";
import {useState} from "react";
import {noCacheHeader} from "@/common/const";

const notoSerif = Noto_Serif({subsets: ['latin']})

export type NewArticle = {
  doi?: string;
  authors?: string;
  jName?: string;
  number?: string;
  pages?: string;
  title?: string;
  volume?: string;
  yop?: string;
}

const FORM_FIELDS = [
  {label: 'Title', name: 'title'},
  {label: 'Authors', name: 'authors',},
  {label: 'Journal Name', name: 'jName'},
  {label: 'Year of Public', name: 'yop', jsx: <DatePicker size='large' picker="year"/>},
  {label: 'Volume', name: 'volume'},
  {label: 'Number', name: 'number'},
  {label: 'Pages', name: 'pages'},
  {label: 'DOI', name: 'doi'},
]
export default function SubmitNew() {
  const [pending, setPending] = useState(false);

  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(formValue: {
    authors: string
    doi: string
    jName: string
    number: number
    pages: string
    title: string
    volume: number
    yop: dayjs.Dayjs
  }) {
    let params = {
      ...formValue,
      yop: formValue.yop?.year()
    }
    console.log(params);

    setPending(true);
    const res = await fetch('/api/submitNew', {
      method: 'post',
      body: JSON.stringify(params),
      headers: noCacheHeader
    })

    if (!res.ok) {
      setPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    const response = await res.json();

    setPending(false);

    if (response.code === 0) {
      message.success('success');
      setFormKey(k => k+1);
    } else {
      message.error(response.msg ?? 'error');
    }
  }

  return (
      <>
        <div style={{
          marginTop: 32,
          marginBottom: 160,
          gap: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <h2 className={notoSerif.className}>Submit New Article</h2>
          <Form
              key={formKey}
              onFinish={handleSubmit}
              labelCol={{span: 4}}
              wrapperCol={{span: 12}}
              layout="vertical"
          >
            {FORM_FIELDS.map(({label, name, jsx}) => (
                <Form.Item key={name} name={name} label={label}>
                  {jsx ?? <Input size='large' placeholder={`Input ${label}`} style={{width: 640}}/>}
                </Form.Item>
            ))}
            <Form.Item style={{marginTop: 40}}>
              <Button loading={pending} size='large' type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
  )
}