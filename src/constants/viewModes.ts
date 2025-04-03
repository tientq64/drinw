import { MaterialIconName } from 'ts-material-icon-name-list/kebab'

export const enum ViewModeEnum {
    List = 'list',
    Grid = 'grid'
}

export interface ViewMode {
    name: ViewModeEnum
    text: string
    iconName: MaterialIconName
}

export const viewModes: ViewMode[] = [
    {
        name: ViewModeEnum.List,
        text: 'Danh sách',
        iconName: 'format-list-bulleted'
    },
    {
        name: ViewModeEnum.Grid,
        text: 'Lưới',
        iconName: 'grid-view'
    }
]
