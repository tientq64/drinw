import { useRequest } from 'ahooks'
import { Form, Input, InputRef, Modal } from 'antd'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { updateFile } from '../api/updateFile'
import { DriveFile } from '../helpers/getGoogleDrive'
import { replaceCurrentFile } from '../store/replaceCurrentFile'
import { Account } from '../store/types'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    fileName: string
}

export function useRenameFileModal(file: DriveFile, account: Account) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()
    const updateFileApi = useRequest(updateFile, { manual: true })

    const handleFormSubmit = ({ fileName }: Values): void => {
        if (file.name === fileName) return
        updateFileApi.run(account, file, {
            name: fileName
        })
        close()
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

    useEffect(() => {
        const renamedFile: DriveFile | undefined = updateFileApi.data
        if (renamedFile === undefined) return
        replaceCurrentFile(file, renamedFile)
    }, [updateFileApi.data])

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
