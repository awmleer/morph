import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';

@Pipe({
    name: 'markdownToHtml'
})
export class MarkdownToHtmlPipe implements PipeTransform {

    transform(text: any): string {
        let m = marked.setOptions({});
        console.log(m.parse(text));//just for debug
        return m.parse(text);
    }

}
