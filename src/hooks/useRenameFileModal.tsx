import { Form, Input, Modal } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { updateFile } from '../api/updateFile'
import { File } from '../helpers/getGoogleDrive'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    fileName: string
}

export function useRenameFileModal(file: File) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const handleFormSubmit = ({ fileName }: Values): void => {
        close()
        if (file.name === fileName) return
        updateFile(file, { name: fileName })
    }

    const close = (): void => {
        setIsOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!isOpen) return
        form.setFieldValue('fileName', file.name)
        setTimeout(() => {
            form.focusField('fileName')
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
                        name="fileName"
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
