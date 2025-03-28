import { useRequest } from 'ahooks'
import { Form, Input, Modal } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { createDir } from '../api/createDir'
import { DriveFile } from '../helpers/getGoogleDrive'
import { Account } from '../store/types'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    dirName: string
}

export function useCreateDirModal(parentDir: DriveFile, account: Account) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const handleFormSubmit = ({ dirName }: Values): void => {
        close()
        createDir(account, parentDir, dirName)
    }

    const close = (): void => {
        setIsOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!isOpen) return
        form.setFieldValue('dirName', '')
        setTimeout(() => {
            form.focusField('dirName')
        })
    }, [isOpen])

    const modal: ReactElement = (
        <div onDoubleClick={stopPropagation} onContextMenu={stopPropagation}>
            <Modal
                title="Thư mục mới"
                maskClosable={false}
                destroyOnClose
                open={isOpen}
                onOk={form.submit}
                onCancel={close}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item
                        name="dirName"
                        rules={[
                            {
                                required: true,
                                whitespace: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

    return { isOpen, setIsOpen, close, modal }
}
