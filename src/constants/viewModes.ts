export const enum ViewModeEnum {
    List = 'list',
    Grid = 'grid'
}

export interface ViewMode {
    name: ViewModeEnum
    text: string
    iconName: string
}

export const viewModes: ViewMode[] = [
    {
        name: ViewModeEnum.List,
        text: 'Danh sách',
        iconName: 'format_list_bulleted'
    },
    {
        name: ViewModeEnum.Grid,
        text: 'Lưới',
        iconName: 'grid_view'
    }
]
