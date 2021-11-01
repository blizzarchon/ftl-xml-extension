import {
    MarkupContent,
    Node,
    Range as HtmlRange,
    TextDocument as HtmlTextDocument
} from "vscode-html-languageservice";
import {MarkdownString, Position, Range, TextDocument} from "vscode";


export function toTextDocumentHtml(d: TextDocument): HtmlTextDocument {
    return {...d, uri: d.uri.toString()};
}

export function isLoadEvent(node: Node) {
    return node.tag == "loadEvent";
}

export function inLoadAttribute(node: Node): boolean {
    return !!(node.tag == 'event' && node.attributes && 'load' in node.attributes);
}

export function convertDocumentation(documentation: string | MarkupContent | undefined): string | MarkdownString | undefined {
    if (typeof documentation === 'object' && 'kind' in documentation) {
        if (documentation.kind == 'markdown') {
            return new MarkdownString(documentation.value);
        }
        return documentation.value;
    }
    return documentation;
}

export function toRange(start: number, end: number, document: TextDocument) {
    return new Range(document.positionAt(start), document.positionAt(end));
}

export function convertRange(range: HtmlRange): Range {
    let start = range.start;
    let end = range.end;
    return new Range(new Position(start.line, start.character), new Position(end.line, end.character));
}
