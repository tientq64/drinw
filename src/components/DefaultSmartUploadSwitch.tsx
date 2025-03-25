import { Switch, SwitchProps, Tooltip } from 'antd'
import { ReactNode } from 'react'
import { setIsDefaultSmartUpload } from '../store/setIsDefaultSmartUpload'
import { useAppStore } from '../store/useAppStore'

interface DefaultSmartUploadSwitchProps extends SwitchProps {}

export function DefaultSmartUploadSwitch({
    size,
    ...props
}: DefaultSmartUploadSwitchProps): ReactNode {
    const isDefaultSmartUpload = useAppStore((state) => state.isDefaultSmartUpload)

    const handleDefaultSmartUploadChange = (checked: boolean): void => {
        setIsDefaultSmartUpload(checked)
    }

    return (
        <Tooltip
            rootClassName="pointer-events-none"
            destroyTooltipOnHide
            title="Cách chọn thư mục khi tải lên"
        >
            <Switch
                {...props}
                size={size ?? 'small'}
                checked={isDefaultSmartUpload}
                onChange={handleDefaultSmartUploadChange}
                checkedChildren="Tự động"
                unCheckedChildren="Thủ công"
            />
        </Tooltip>
    )
}
