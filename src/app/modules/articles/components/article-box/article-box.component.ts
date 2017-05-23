/**
 * Created by talgvili on 27/12/2016.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'article-box',
    templateUrl: 'article-box.component.html',
    styleUrls: ["article-box.component.scss"]
})
export class ArticleBox implements OnInit {
    @Input() article;
    constructor() { }



    ngOnInit(){
        console.log(" @@@@@@@@@@ On init");
    }

    ngOnDestroy(){
        console.error("Destoryed")
    }

    ngOnChanges(){
        console.log("With params ", this.article)
    }
}
