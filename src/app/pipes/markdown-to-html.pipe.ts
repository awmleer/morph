import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import * as highlight from 'highlightjs';

@Pipe({
    name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {

    transform(text: any): string {
        let m = marked.setOptions({
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        });
        return m.parse(text);
    }

}
