import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgxElectronService} from "../ngx-electron/ngx-electron.service";
import marked from 'marked';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    @ViewChild('holder') holderRef : ElementRef;
    parsedHtml:string='<p>test</p>';

    constructor(
        private electronService:NgxElectronService,
        private ngZone: NgZone
    ) { }

    startPresentation(){
        this.electronService.send('enterFullScreen');
    }

    ngOnInit() {
        let holder=this.holderRef.nativeElement;
        console.log(holder);
        holder.ondragover = () => {
            return false;
        };
        holder.ondragleave = holder.ondragend = () => {
            return false;
        };
        holder.ondrop = (e) => {
            e.preventDefault();
            for (let f of e.dataTransfer.files) {
                console.log('File(s) you dragged here: ', f.path);
                let text=this.electronService.readFile(f.path);
                console.log(text);
                this.ngZone.run(()=>{
                    this.parseTest(text);
                });
            }
            return false;
        }
    }

    parseTest(text:string){
        let m = marked.setOptions({});
        this.parsedHtml=m.parse(text);
        console.log(this.parsedHtml);
    }

    // openFile(path:string){
    //     // console.log(this.electronService.ipcRenderer.send('openFile',{path:path}));
    //     console.log(this.electronService.);
    // }

}
