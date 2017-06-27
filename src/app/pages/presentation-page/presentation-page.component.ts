import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";

@Component({
    selector: 'app-presentation-page',
    templateUrl: './presentation-page.component.html',
    styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent implements OnInit {
    filePath:string=null;
    slideTexts:string[]=[];

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
        this.slideTexts=this.splitText(text);
        console.log(this.slideTexts);
    }

    splitText(text:string):string[]{
        let lines = text.split('\n');
        let inCodeBlock:boolean = false;
        let temp:string='';
        let slideTexts:string[]=[];
        for (let k in  lines) {
            lines[k]+='\n';
            if (lines[k].match(/^ *```/)) {
                inCodeBlock=!inCodeBlock;
                continue;
            }
            if (inCodeBlock) continue;
            if (lines[k].match(/^ *# /)) { //first heading
                if (temp != '') {
                    slideTexts.push(temp);
                    temp='';
                }
                slideTexts.push(lines[k]);
                continue;
            }
            if (lines[k].match(/^ *###? /)) { //second or third heading
                if (temp != '') {
                    slideTexts.push(temp);
                }
                temp=lines[k];
                continue;
            }
            temp+=lines[k];
        }
        if (temp != '') {
            slideTexts.push(temp);
        }
        return slideTexts;
    }

    // parseTest(text:string){

        // let m = marked.setOptions({});
        // this.parsedHtml=m.parse(text);
        // console.log(this.parsedHtml);
    // }

}
