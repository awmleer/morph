import {Component, NgZone, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {NgxElectronService} from "../../services/ngx-electron/ngx-electron.service";
import * as mousetrap from 'mousetrap';

@Component({
    selector: 'app-presentation-page',
    templateUrl: './presentation-page.component.html',
    styleUrls: [
        './presentation-page.component.scss',
        './animation.scss',
        '../../../assets/themes/common.scss',
        '../../../assets/themes/github.scss'
    ]
})
export class PresentationPageComponent implements OnInit {
    @ViewChild('currentSlide') currentSlideRef : ElementRef;
    filePath:string=null;
    animationType:string='';
    slideTexts:string[]=[];
    currentPage:number=-1;
    previousTransiting:boolean=false;
    nextTransiting:boolean=false;
    pausing:boolean=false;
    pauseTransitingOut=false;
    mouseMoving:boolean=false;
    mouseMovingTemp:boolean=false;
    mouseMovingCount:number=0;
    animationTime={
        'move': 400,
        'glue': 800
    };


    constructor(
        private electronService:NgxElectronService,
        private route: ActivatedRoute,
        private zone: NgZone
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params:Params)=>{
            console.log(params);
            this.filePath=params['filePath'];
            this.animationType=params['animationType'];
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
            },this.animationTime[this.animationType]+20);
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
            },this.animationTime[this.animationType]+20);
        }
    }

    parseFile(){
        let text = this.electronService.readFile(this.filePath);
        let fileDir = this.filePath.replace(/(?:.(?!\/))+$/,'/');
        let lines = text.split('\n');
        let inCodeBlock:boolean = false;
        let temp:string='';
        this.slideTexts=[];
        for (let k in  lines) {
            lines[k]+='\n';
            //handle code blocks
            if (lines[k].match(/^ *```/)) {
                inCodeBlock=!inCodeBlock;
                temp+=lines[k];
                continue;
            }
            if (inCodeBlock){
                temp+=lines[k];
                continue;
            }
            //fix image file paths
            temp=temp.replace(/!\[(.*)\]\(\.\/(.+)\)/g,`![$1](${fileDir}$2)`);
            //handle headings
            if (lines[k].match(/^ *##?#? /)) {
                if (temp != '') {
                    this.slideTexts.push(temp);
                }
                temp=lines[k];
                continue;
            }
            temp+=lines[k];
        }
        if (temp != '') {
            this.slideTexts.push(temp);
        }
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
