import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    @ViewChild('holder') holderRef : ElementRef;
    filePath: string=null;

    constructor(
        private zone: NgZone,
        private router: Router
    ) { }

    startPresentation(){
        if (this.filePath) {
            this.router.navigate(['/presentation',{
                filePath: this.filePath
            }]);
        }
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
            this.zone.run(()=>{
                if (e.dataTransfer.files.length > 0) {
                    this.filePath=e.dataTransfer.files[0].path;
                    this.startPresentation();
                }
            });
            return false;
        }
    }

    // openFile(path:string){
    //     // console.log(this.electronService.ipcRenderer.send('openFile',{path:path}));
    //     console.log(this.electronService.);
    // }

}
