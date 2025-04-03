import { Form, Input, Select } from 'antd'
import Modal from 'antd/es/modal'
import { DefaultOptionType } from 'antd/es/select'
import { ReactElement, useEffect, useState } from 'react'
import { AccountKindLabel } from '../components/AccountKindLabel'
import { AccountKindEnum, accountKinds } from '../constants/accountKinds'
import { getAccountEmailName } from '../helpers/getAccountEmailName'
import { Account } from '../store/types'
import { updateAccount } from '../store/updateAccount'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    title?: string
    kindName?: AccountKindEnum
}

export function useEditAccountModal(account: Account) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const emailName: string = getAccountEmailName(account.email)

    const handleFormSubmit = ({ title, kindName }: Values): void => {
        close()
        updateAccount(account.email, { title, kindName })
    }

    const close = (): void => {
        setIsOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!isOpen) return
        form.setFieldsValue({
            title: account.title ?? '',
            kindName: account.kindName ?? AccountKindEnum.None
        })
        setTimeout(() => {
            form.focusField('title')
        })
    }, [isOpen])

    const modal: ReactElement = (
        <div onDoubleClick={stopPropagation} onContextMenu={stopPropagation}>
            <Modal
                title="Sửa thông tin tài khoản"
                maskClosable={false}
                destroyOnClose
                open={isOpen}
                onOk={form.submit}
                onCancel={close}
            >
                <Form form={form} labelCol={{ span: 4 }} onFinish={handleFormSubmit}>
                    <Form.Item label="Tên">
                        <Input variant="filled" readOnly value={emailName} />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[
                            {
                                whitespace: true,
                                max: 40
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="kindName" label="Thể loại">
                        <Select
                            options={accountKinds.map<DefaultOptionType>((accountKind) => ({
                                label: <AccountKindLabel kind={accountKind} />,
                                value: accountKind.name
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

    return { isOpen, setIsOpen, close, modal }
}
