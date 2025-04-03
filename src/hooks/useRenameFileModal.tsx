import { Form, Input, Modal } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { renameFile } from '../api/renameFile'
import { File } from '../helpers/getGoogleDrive'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    newName: string
}

export function useRenameFileModal(file: File) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const handleFormSubmit = ({ newName }: Values): void => {
        close()
        if (newName === file.name) return
        renameFile(file, newName)
    }

    const close = (): void => {
        setIsOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!isOpen) return
        form.setFieldValue('newName', file.name)
        setTimeout(() => {
            form.focusField('newName')
        })
    }, [isOpen])

    const modal: ReactElement = (
        <div onDoubleClick={stopPropagation} onContextMenu={stopPropagation}>
            <Modal
                title="Đổi tên"
                maskClosable={false}
                destroyOnClose
                open={isOpen}
                onOk={form.submit}
                onCancel={close}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item
                        name="newName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên không được để trống'
                            },
                            {
                                whitespace: true,
                                message: 'Tên không được chỉ có khoảng trắng'
                            },
                            {
                                warningOnly: true,
                                validator: (_, value, cb) => {
                                    cb(value === file.name ? 'Tên mới giống với tên cũ' : undefined)
                                }
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
