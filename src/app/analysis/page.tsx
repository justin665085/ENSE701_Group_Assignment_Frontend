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
  Select, message, FormInstance, DatePicker, Popconfirm,
} from "antd";
import {useEffect, useRef, useState} from "react";
import {NewArticle} from "@/app/submitNew/page";
import dayjs, {Dayjs} from "dayjs";
import {BASE_URL, noCacheHeader} from "@/common/const";

const notoSerif = Noto_Serif({subsets: ['latin']})

const FORM_FIELDS = [
  {label: 'Title', name: 'title'},
  {
    label: 'Authors', name: 'authors',
    // jsx: (
    //     <Select
    //         open={false}
    //         suffixIcon={<></>}
    //         mode="tags"
    //         showSearch={false}
    //         style={{cursor: 'text'}}
    //         tokenSeparators={[',']}
    //         placeholder='Input Authors (Use comma or Enter for name separation)'
    //     />
    // )
  },
  {label: 'Year of Public', name: 'yop', jsx: <DatePicker size='large' picker="year"/>},
  {label: 'Journal Name', name: 'jName'},
  {label: 'SE Practice', name: 'SEpractice'},
  {label: 'Claim', name: 'claim', jsx: <Input.TextArea placeholder='Input Cliam' rows={4}/>},
  {label: 'Result of evidence', name: 'ROE'},
  {
    label: 'Type of research',
    name: 'TOR',
    // jsx: (
    //     <Select
    //         open={false}
    //         suffixIcon={<></>}
    //         mode="tags"
    //         showSearch={false}
    //         style={{cursor: 'text'}}
    //         tokenSeparators={[',']}
    //         placeholder='Input type of research (Use comma or Enter for item separation)'
    //     />
    // )
  },
  {
    label: 'Type of participant',
    name: 'TOP',
    // jsx: (
    //     <Select
    //         open={false}
    //         suffixIcon={<></>}
    //         mode="tags"
    //         showSearch={false}
    //         style={{cursor: 'text'}}
    //         tokenSeparators={[',']}
    //         placeholder='Input type of participant (Use comma or Enter for item separation)'
    //     />
    // )
  },
  {label: 'DOI', name: 'doi'},
]

export type AnalyseRecord = {
  id: string,
  authors?: string;
  jName?: string;
  title?: string;
  yop?: Dayjs;
  sePractice?: string;
  claim?: string;
  ROE?: string;
  TOR?: string;
  TOP?: string;
  DOI?: string;
}

export default function Moderation() {
  const [waitingList, setWaitingList] = useState<({ id: string; } & NewArticle)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialValue, setModalInitialValue] = useState<AnalyseRecord>({id: '-1'});
  const [modalSubmitPending, setModalSubmitPending] = useState(false);

  const [fetching, setFetching] = useState(false);

  async function freshData() {
    setFetching(true);
    const res = await fetch(
        `${BASE_URL}/api/browseAllReviewedPaper`,
        {
          headers: noCacheHeader
        }
    )

    setFetching(false);

    if (!res.ok) {
      setModalSubmitPending(false);
      message.error('Failed to fetch data');
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    setWaitingList(data);
  }

  useEffect(() => {
    freshData();
  }, []);

  const modalForm = useRef<FormInstance>(null);

  async function handleModalSubmit() {
    if (modalForm.current === null) return;

    const formValue: AnalyseRecord = modalForm.current.getFieldsValue()

    let param = {
      ...formValue,
      yop: formValue.yop?.year()
    }

    console.log(param)
    setModalSubmitPending(true);
    const res = await fetch(`/api/analyse`, {method: 'post', body: JSON.stringify(param), headers: noCacheHeader})

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

  async function handleDecline(title: string) {
    let param = {title, decline: true};

    const res = await fetch(`/api/analyse`, {method: 'post', body: JSON.stringify(param), headers: noCacheHeader})

    if (!res.ok) {
      setModalSubmitPending(false);
      message.error('Failed to submit');
      throw new Error('Failed to submit')
    }

    const response = await res.json();

    if (response.code === 0) {
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
              loading={fetching}
              columns={[
                ...columns,
                {
                  title: '',
                  dataIndex: 'action',
                  key: 'action',
                  render: (text, record) => (
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button type="primary" onClick={() => {
                          setIsModalOpen(true);
                          setModalInitialValue({
                            ...record,
                            yop: dayjs().year(+(record.yop ?? 0))
                          });
                        }} ghost>Analyse</Button>
                        <Popconfirm
                            title="Decline this submission"
                            description="Are you sure to decline this submission?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDecline(record.title ?? '')}
                        >
                          <Button danger>Decline</Button>
                        </Popconfirm>
                      </div>
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