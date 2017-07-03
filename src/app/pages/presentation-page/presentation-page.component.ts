import {Component, NgZone, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";
import * as mousetrap from 'mousetrap';

@Component({
    selector: 'app-presentation-page',
    templateUrl: './presentation-page.component.html',
    styleUrls: [
        './presentation-page.component.scss',
        '../../../assets/themes/common.scss',
        '../../../assets/themes/github.scss'
    ]
})
export class PresentationPageComponent implements OnInit {
    @ViewChild('currentSlide') currentSlideRef : ElementRef;
    filePath:string=null;
    slideTexts:string[]=[];
    currentPage:number=-1;
    previousTransiting:boolean=false;
    nextTransiting:boolean=false;
    pausing:boolean=false;
    pauseTransitingOut=false;
    mouseMoving:boolean=false;
    mouseMovingTemp:boolean=false;
    mouseMovingCount:number=0;


    constructor(
        private electronService:NgxElectronService,
        private route: ActivatedRoute,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params)=>{
            console.log(params);
            this.filePath=params['filePath'];
            this.parseFile();
            this.currentPage=0;//set currentPage
        });
        setInterval(()=>{
            if (this.mouseMovingTemp==false) {
                this.mouseMovingCount++;
            }
            if (this.mouseMovingCount > 10) {
                this.zone.run(()=>{
                    this.mouseMoving=false;
                });
            }
        },200);
        document.onmousemove=()=>{
            this.mouseMovingTemp=false;
            this.mouseMovingCount=0;
            if (this.mouseMoving == false) {
                this.zone.run(()=>{
                    this.mouseMoving=true;
                });
            }
        };
        this.bindKeyboardShortcuts();
    }

    ngAfterViewInit(){
        this.electronService.send('enterFullScreen');
    }

    previousPage(){
        if (this.previousTransiting || this.nextTransiting) return;
        if(this.currentPage>0){
            this.previousTransiting=true;
            setTimeout(()=>{
                this.currentPage--;
                this.previousTransiting=false;
                this.currentSlideRef.nativeElement.scrollTop=0;
            },420);
        }
    }

    nextPage(){
        if (this.nextTransiting || this.previousTransiting) return;
        if (this.currentPage<this.slideTexts.length-1) {
            this.nextTransiting=true;
            setTimeout(()=>{
                this.currentPage++;
                this.nextTransiting=false;
                this.currentSlideRef.nativeElement.scrollTop=0;
            },420);
        }
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
                temp+=lines[k];
                continue;
            }
            if (inCodeBlock){
                temp+=lines[k];
                continue;
            }
            if (lines[k].match(/^ *##?#? /)) { //heading
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

    togglePause(){
        if (this.pausing) {
            this.pauseTransitingOut=true;
            setTimeout(()=>{
                this.zone.run(()=>{
                    this.pausing=false;
                    this.pauseTransitingOut=false;
                });
            },1000);
        }else {
            this.pausing=true;
        }
    }

    toggleFullScreen(){
        this.electronService.send('toggleFullScreen');
    }

    bindKeyboardShortcuts(){
        mousetrap.bind('space',()=>{
            this.zone.run(()=>{
                this.nextPage();
            });
            return false;
        });
        mousetrap.bind('right',()=>{
            this.zone.run(()=>{
                this.nextPage();
            });
        });
        mousetrap.bind('left',()=>{
            this.zone.run(()=>{
                this.previousPage();
            });
        });
        mousetrap.bind('enter',()=>{
            this.zone.run(()=>{
                this.nextPage();
            });
        });
        mousetrap.bind('return',()=>{
            this.zone.run(()=>{
                this.nextPage();
            });
        });
        mousetrap.bind('esc',()=>{
            this.zone.run(()=>{
                this.toggleFullScreen();
            });
        });
        mousetrap.bind('p',()=>{
            this.zone.run(()=>{
                this.togglePause();
            });
        });
    }

}
