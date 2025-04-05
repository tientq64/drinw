import isHtml from 'is-html'
import isUrlHttp from 'url-http'

export const enum DroppedTextTypeEnum {
    Url = 0,
    SourceCode = 1,
    Text = 2
}

export function guessDroppedTextType(text: string): DroppedTextTypeEnum {
    if (isUrlHttp(text)) {
        return DroppedTextTypeEnum.Url
    }
    if (isHtml(text)) {
        return DroppedTextTypeEnum.SourceCode
    }
    return DroppedTextTypeEnum.Text
}
