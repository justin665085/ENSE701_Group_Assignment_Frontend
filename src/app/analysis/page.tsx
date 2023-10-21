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
  Select, message, FormInstance,
} from "antd";
import {useEffect, useRef, useState} from "react";
import {NewArticle} from "@/app/submitNew/page";

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

export type AnalyseRecord = {
  id: string,
  authors?: string[];
  jName?: string;
  title?: string;
  yop?: string;
  sePractice?: string;
  claim?: string;
  ROE?: string;
  TOR?: string[];
  TOP?: string[];
  DOI?: string[];
}

export default function Moderation() {
  const [waitingList, setWaitingList] = useState<({ id: string; } & NewArticle)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialValue, setModalInitialValue] = useState<AnalyseRecord>({id: '-1'});
  const [modalSubmitPending, setModalSubmitPending] = useState(false);

  async function freshData() {
    const res = await fetch('/api/fetchAnalysis')

    if (!res.ok) {
      setModalSubmitPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    let response = await res.json();

    setWaitingList(response.data);
  }

  useEffect(() => {
    freshData();
  }, []);

  const modalForm = useRef<FormInstance>(null);

  async function handleModalSubmit() {
    if(modalForm.current === null) return;
    const formValue: AnalyseRecord = modalForm.current.getFieldsValue()
    console.log(formValue)
    setModalSubmitPending(true);
    const res = await fetch(`/api/analyse`, {method: 'post', body: JSON.stringify(formValue)})

    if (!res.ok) {
      setModalSubmitPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    setModalSubmitPending(false);

    const response = await res.json();

    if (response.code === 0) {
      console.log(response);
      setIsModalOpen(false);
      freshData();
      message.success('Success');
    } else {
      message.error(response.msg ?? 'error');
    }
  }

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
              columns={[
                ...columns,
                {
                  title: '',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text, record) => (
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
        <Modal title="Article Detail" okText='Submit' open={isModalOpen} onOk={handleModalSubmit}
               confirmLoading={modalSubmitPending}
               onCancel={() => setIsModalOpen(false)}>
          <Form
              ref={modalForm}
              key={modalInitialValue.id}
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