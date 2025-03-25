import { Button, Form, Input, InputNumber, Radio, Switch } from 'antd'
import useApp from 'antd/es/app/useApp'
import { ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { MB } from '../constants/constants'
import { viewModes } from '../constants/viewModes'
import { setIsDefaultSmartUpload } from '../store/setIsDefaultSmartUpload'
import { setMasterEmail } from '../store/setMasterEmail'
import { setMaxUploadQueueSize } from '../store/setMaxUploadQueueSize'
import { setMotion } from '../store/setMotion'
import { setViewModeName } from '../store/setViewModeName'
import { useAppStore } from '../store/useAppStore'

interface SettingValues {
    masterEmail: string
    maxUploadQueueSize: number
}

export function SettingsPage(): ReactNode {
    const masterEmail = useAppStore((state) => state.masterEmail)
    const viewModeName = useAppStore((state) => state.viewModeName)
    const isDefaultSmartUpload = useAppStore((state) => state.isDefaultSmartUpload)
    const maxUploadQueueSize = useAppStore((state) => state.maxUploadQueueSize)
    const motion = useAppStore((state) => state.motion)

    const [form] = Form.useForm()
    const { message } = useApp()

    const initialValues: SettingValues = {
        masterEmail: masterEmail ?? '',
        maxUploadQueueSize
    }

    const handleSettingsSubmit = (values: SettingValues): void => {
        setMasterEmail(values.masterEmail || undefined)
        setMaxUploadQueueSize(values.maxUploadQueueSize)
        message.success('Đã lưu cài đặt')
    }

    return (
        <div className="h-full p-4">
            <Form
                form={form}
                initialValues={initialValues}
                labelCol={{ span: 8 }}
                labelWrap
                onFinish={handleSettingsSubmit}
            >
                <Form.Item
                    label="Email chính"
                    name="masterEmail"
                    rules={[
                        {
                            type: 'email'
                        }
                    ]}
                >
                    <Input className="w-64" />
                </Form.Item>

                <Form.Item label="Kiểu hiển thị">
                    <Radio.Group
                        value={viewModeName}
                        onChange={(event) => setViewModeName(event.target.value)}
                    >
                        {viewModes.map((viewMode) => (
                            <Radio value={viewMode.name}>
                                <div className="flex min-w-16 flex-col items-center justify-center">
                                    <Icon name={viewMode.iconName} />
                                    {viewMode.text}
                                </div>
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Hiệu ứng chuyển động">
                    <Switch
                        checkedChildren="Bật"
                        unCheckedChildren="Tắt"
                        checked={motion}
                        onChange={(checked) => setMotion(checked)}
                    />
                </Form.Item>

                <Form.Item
                    label="Dung lượng tải lên đồng thời tối đa"
                    name="maxUploadQueueSize"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <InputNumber
                        className="w-32"
                        min={1 * MB}
                        max={1024 * MB}
                        step={1 * MB}
                        formatter={(value) => String(Math.round(Number(value) / MB))}
                        parser={(displayValue) => Math.round(Number(displayValue) * MB)}
                        changeOnWheel
                        suffix="MB"
                    />
                </Form.Item>

                <Form.Item label="Cách chọn thư mục khi tải lên">
                    <Radio.Group
                        value={isDefaultSmartUpload}
                        onChange={(event) => setIsDefaultSmartUpload(event.target.value)}
                    >
                        <Radio value={true}>
                            <div className="flex min-w-16 flex-col items-center justify-center">
                                <Icon name="smart_toy" />
                                Tự động
                            </div>
                        </Radio>

                        <Radio value={false}>
                            <div className="flex min-w-16 flex-col items-center justify-center">
                                <Icon name="back_hand" />
                                Thủ công
                            </div>
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={null}>
                    <Button htmlType="submit" type="primary">
                        Lưu cài đặt
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
