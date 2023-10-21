'use client'

import {Noto_Serif} from "next/font/google";
import {
  Button,
  Table,
  Tabs,
  TabsProps,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {Simulate} from "react-dom/test-utils";
import {useState} from "react";

const notoSerif = Noto_Serif({subsets: ['latin']})

const FORM_FIELDS = [
  {label: 'Title', name: 'title'},
  {
    label: 'Authors', name: 'authors', jsx: (
        <Select
            open={false}
            suffixIcon={<></>}
            mode="tags"
            showSearch={false}
            style={{cursor: 'text'}}
            tokenSeparators={[',']}
            placeholder='Input Authors (Use comma or Enter for name separation)'
        />
    )
  },
  {label: 'Journal Name', name: 'jName'},
  {label: 'SE Practice', name: 'sePractice'},
  {label: 'Claim', name: 'claim', jsx: <Input.TextArea placeholder='Input Cliam' rows={4}/>},
  {label: 'Result of evidence', name: 'ROE'},
  {
    label: 'Type of research',
    name: 'TOR',
    jsx: (
        <Select
            open={false}
            suffixIcon={<></>}
            mode="tags"
            showSearch={false}
            style={{cursor: 'text'}}
            tokenSeparators={[',']}
            placeholder='Input type of research (Use comma or Enter for item separation)'
        />
    )
  },
  {
    label: 'Type of participant',
    name: 'TOP',
    jsx: (
        <Select
            open={false}
            suffixIcon={<></>}
            mode="tags"
            showSearch={false}
            style={{cursor: 'text'}}
            tokenSeparators={[',']}
            placeholder='Input type of participant (Use comma or Enter for item separation)'
        />
    )
  },
  {label: 'DOI', name: 'doi'},
]

export default function Moderation() {
  const dataSource = {
    authors: ['Jack'],
    doi: '10.23/1s0d',
    jName: 'Hale',
    number: '1',
    pages: '28-32',
    title: 'Have a Good Day',
    volume: '2',
    yop: '2021',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalInitialValue, setModalInitialValue] = useState<
      {
        doi: string;
        authors?: string[];
        jName?: string;
        number?: string;
        pages?: string;
        title?: string;
        volume?: string;
        yop?: string;
        sePractice?: string;
        claim?: string;
        roe?: string;
        tor?: string[];
        top?: string[];
      }
  >({doi: ''});

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
              dataSource={new Array(15).fill(0).map((item, index) => ({...dataSource, doi: ''+index}))}
              columns={[
                ...columns,
                {
                  title: '',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text, record, index) => (
                      <Button type="primary" onClick={() => {
                        setIsModalOpen(true);
                        setModalInitialValue(record);
                      }} ghost>Analyse</Button>
                  )
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
        <h2 className={notoSerif.className}>Analysis</h2>
        <Tabs defaultActiveKey="1" items={items}/>
        <Modal title="Article Detail" okText='Submit' open={isModalOpen} onOk={() => setIsModalOpen(false)}
               onCancel={() => setIsModalOpen(false)}>
          <Form
              key={modalInitialValue.doi}
              initialValues={modalInitialValue}
              layout="vertical"
          >
            {FORM_FIELDS.map(({label, name, jsx}) => (
                <Form.Item key={name} name={name} label={label}>
                  {jsx ?? <Input placeholder={`Input ${label}`}/>}
                </Form.Item>
            ))}
          </Form>
        </Modal>
      </div>
  )
}