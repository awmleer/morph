import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxElectronService} from "../ngx-electron/ngx-electron.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    @ViewChild('holder') holderRef : ElementRef;
    constructor(
        private electronService:NgxElectronService
    ) { }

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
                console.log(this.electronService.readFile(f.path));
            }
            return false;
        }
    }

    // openFile(path:string){
    //     // console.log(this.electronService.ipcRenderer.send('openFile',{path:path}));
    //     console.log(this.electronService.);
    // }

}
