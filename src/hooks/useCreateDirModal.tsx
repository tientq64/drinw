import { Form, Input, Modal } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { DriveFile } from '../helpers/getGoogleDrive'
import { useAppStore } from '../store/useAppStore'
import { Account } from '../store/types'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    dirName: string
}

export function useCreateDirModal(parentDir: DriveFile, account: Account) {
    const currentFiles = useAppStore((state) => state.currentFiles)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const handleFormSubmit = ({ dirName }: Values): void => {
        close()
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
                        <Input spellCheck={false} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

    return { isOpen, setIsOpen, close, modal }
}
