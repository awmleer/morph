import { Component, OnInit } from '@angular/core';
import marked from 'marked';
import {ActivatedRoute, Params} from "@angular/router";
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";

@Component({
    selector: 'app-presentation-page',
    templateUrl: './presentation-page.component.html',
    styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent implements OnInit {
    filePath:string=null;

    constructor(
        private electronService:NgxElectronService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params)=>{
            console.log(params);
            this.filePath=params['filePath'];
            this.parseFile();
        });
        // this.parseTest(text);
    }

    parseFile(){
        let text = this.electronService.readFile(this.filePath);
        let slideStrings = this.splitText(text);
        console.log(slideStrings);
    }

    splitText(text:string):string[]{
        let lines = text.split('\n');
        let inCodeBlock:boolean = false;
        let temp:string='';
        let slideStrings:string[]=[];
        for (let k in  lines) {
            lines[k]+='\n';
            if (lines[k].match(/^ *```/)) {
                inCodeBlock=!inCodeBlock;
                continue;
            }
            if (inCodeBlock) continue;
            if (lines[k].match(/^ *# /)) { //first heading
                if (temp != '') {
                    slideStrings.push(temp);
                    temp='';
                }
                slideStrings.push(lines[k]);
                continue;
            }
            if (lines[k].match(/^ *###? /)) { //second or third heading
                if (temp != '') {
                    slideStrings.push(temp);
                }
                temp=lines[k];
                continue;
            }
            temp+=lines[k];
        }
        if (temp != '') {
            slideStrings.push(temp);
        }
        return slideStrings;
    }

    // parseTest(text:string){

        // let m = marked.setOptions({});
        // this.parsedHtml=m.parse(text);
        // console.log(this.parsedHtml);
    // }

}
