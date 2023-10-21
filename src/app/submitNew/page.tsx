'use client'

import {Noto_Serif} from "next/font/google";
import {Input, Button, Form, DatePicker, Select, InputNumber} from "antd";
import dayjs from "dayjs";

const notoSerif = Noto_Serif({subsets: ['latin']})

const FORM_FIELDS = [
  {label: 'Title', name: 'title'},
  {
    label: 'Authors',
    name: 'authors',
    jsx: (
        <Select
            open={false}
            suffixIcon={<></>}
            size='large'
            mode="tags"
            showSearch={false}
            style={{width: 640, cursor: 'text'}}
            tokenSeparators={[',']}
            placeholder='Input Authors (Use comma or Enter for name separation)'
        />
    )
  },
  {label: 'Journal Name', name: 'jName'},
  {label: 'Year of Public', name: 'yop', jsx: <DatePicker size='large' picker="year"/>},
  {label: 'Volume', name: 'volume', jsx: <InputNumber size='large' placeholder='Input Volume'/>},
  {label: 'Number', name: 'number', jsx: <InputNumber size='large' placeholder='Input Number'/>},
  {label: 'Pages', name: 'pages'},
  {label: 'DOI', name: 'doi'},
]
export default function SubmitNew() {
  function handleSubmit(formValue: {
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
      yop: formValue.yop.year()
    }

    console.log(params);
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
              <Button size='large' type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
  )
}