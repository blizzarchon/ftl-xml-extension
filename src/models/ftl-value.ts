import {FtlFile} from './ftl-file';
import {Node} from 'vscode-html-languageservice';
import {Location, Position, TextDocument} from 'vscode';

export abstract class FtlValue {
    constructor(name: string, file: FtlFile, node: Node, document: TextDocument) {
        this.file = file;
        this.name = name;
        this.offset = node.start;
        this.position = document.positionAt(node.start);
    }

    public abstract readonly kind: string;
    public file: FtlFile
    public name: string;
    public offset: number;
    public position: Position;

    toLocation() {
        return new Location(this.file.uri, this.position);
    }
}
