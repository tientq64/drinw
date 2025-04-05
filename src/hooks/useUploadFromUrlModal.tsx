import { Checkbox, Form, Input, Modal } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import { addPageUrlToUploadQueue } from '../helpers/addPageUrlToUploadQueue'
import { File } from '../helpers/getGoogleDrive'
import { tryStartUploadFromQueue } from '../helpers/tryStartUploadFromQueue'
import { useAppStore } from '../store/useAppStore'
import { stopPropagation } from '../utils/stopPropagation'

interface Values {
    pageUrl: string
    isSmartUpload: boolean
}

export function useUploadFromUrlModal(destDir: File) {
    const isDefaultSmartUpload = useAppStore((state) => state.isDefaultSmartUpload)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [form] = Form.useForm<Values>()

    const handleFormSubmit = ({ pageUrl, isSmartUpload }: Values): void => {
        close()
        addPageUrlToUploadQueue({ pageUrl, isSmartUpload, destDir })
        tryStartUploadFromQueue()
    }

    const close = (): void => {
        setIsOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!isOpen) return
        form.setFieldValue(
            'pageUrl',
            // 'https://www.youtube.com/watch?v=cuadlyuH610'
            // 'https://www.youtube.com/watch?v=0Yi6RPUkUdY'
            // 'https://x.com/Rainmaker1973/status/1904070678455660617'
            'https://www.tiktok.com/@minmin080201/video/7484511735022456082'
        )
        form.setFieldValue('isSmartUpload', isDefaultSmartUpload)
        setTimeout(() => {
            form.focusField('pageUrl')
        })
    }, [isOpen])

    const modal: ReactElement = (
        <div onDoubleClick={stopPropagation} onContextMenu={stopPropagation}>
            <Modal
                title="Tải tệp lên từ URL"
                maskClosable={false}
                destroyOnClose
                open={isOpen}
                onOk={form.submit}
                onCancel={close}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item
                        name="pageUrl"
                        rules={[
                            {
                                type: 'url',
                                required: true
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null} name="isSmartUpload" valuePropName="checked">
                        <Checkbox>Tự động chọn thư mục khi tải lên</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

    return { isOpen, setIsOpen, close, modal }
}
