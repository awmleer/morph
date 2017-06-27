import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    @ViewChild('holder') holderRef : ElementRef;
    parsedHtml:string='<p>test</p>';
    filePath: string=null;

    constructor(
        private electronService:NgxElectronService,
        private router: Router
    ) { }

    startPresentation(){
        if (this.filePath) {
            this.router.navigate(['/presentation',{
                filePath: this.filePath
            }]);
        }
        this.electronService.send('enterFullScreen');
    }

    ngOnInit() {
        let holder=this.holderRef.nativeElement;
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
                this.filePath=f.path;
                let text=this.electronService.readFile(this.filePath);
                console.log(text);
            }
            return false;
        }
    }

    // openFile(path:string){
    //     // console.log(this.electronService.ipcRenderer.send('openFile',{path:path}));
    //     console.log(this.electronService.);
    // }

}
