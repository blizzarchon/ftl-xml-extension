import {
    IAttributeData,
    IHTMLDataProvider,
    ITagData,
    IValueData,
    newHTMLDataProvider
} from "vscode-html-languageservice";
import {FtlData, EventNamesValueSet} from './data/ftl-data';
import {FtlFile} from './ftl-file';
import {Event} from 'vscode';

export class FtlDataProvider implements IHTMLDataProvider {

    constructor(onFileParsed: Event<{ file: FtlFile; files: Map<string, FtlFile> }>) {
        onFileParsed(e => {
            this.updateFtlData(e.files);
        });
    }

    updateFtlData(files: Map<string, FtlFile>) {
        let values = EventNamesValueSet.values;
        values.length = 0;
        let eventNames = Array.from(files.values()).flatMap(value => value.events);
        values.push(...eventNames.map(event => ({name: event.name})));
    }

    htmlDataProvider = newHTMLDataProvider('ftl-data', FtlData);

    getId(): string {
        return "ftl-data";
    }

    isApplicable(languageId: string): boolean {
        return languageId == "ftl-xml";
    }

    provideTags(): ITagData[] {
        return this.htmlDataProvider.provideTags();
    }

    provideAttributes(tag: string): IAttributeData[] {
        return this.htmlDataProvider.provideAttributes(tag);
    }

    provideValues(tag: string, attribute: string): IValueData[] {
        let results = this.htmlDataProvider.provideValues(tag, attribute);
        return results;
    }
}
