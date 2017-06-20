/**
 * Created by talgvili on 22/12/2016.
 */
"use strict;"
import {Component, OnInit} from '@angular/core';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {Observable, Subscription} from "rxjs/Rx";
import {AnonymousSubject} from "rxjs/Subject";
import {select, NgRedux} from "@angular-redux/store";

/**
 *   I would like to point out that this is a SMART component.
 *   This component is root of the module,
 *   and it's the ONLY ONE to manage the data or use redux actions !
 *   every other directive (like articles-view) is a dumb component,
 *   which only DISPLAY the data or dispatch events.
 */
@Component({
  selector: 'article-component',
  template: `
    <articles-view [articles]="articles" [error]="error" [pending]="pending" (articleSubmit)="onArticleSubmit($event)"  (removeArticle)="removeArticle($event)"></articles-view>
  `
})
export class ArticlesComponent implements OnInit {
  private articles: Array<any>;
  private error;
  private pending;


  private articleSub: Subscription;
  private userSub: Subscription;
  private throttleSub: Subscription;


  /**
   * instead of the @select decorator, you can :
   *     this.articles = this.ngRedux.select('articles');
   */
  @select(state => state.articlesReducer) private articlesReducer$: AnonymousSubject<any>;
  @select(state => state.usersReducer) private usersReducer$: AnonymousSubject<any>;

  constructor(private articlesActions: ArticlesActions, private ngRedux: NgRedux<any>) {

    /**
     * Subscriptions .
     */
    this.articleSub = this.articlesReducer$.subscribe((data) => {
      console.log(data, new Date().getTime())
    });

    this.userSub = this.usersReducer$.subscribe((data) => {
      console.log(data, new Date().getTime())
    })

    let merge$ = Observable.merge(this.usersReducer$, this.articlesReducer$).timestamp().do((x) => {
      this.refreshData();
      console.log('%c REGULAR UPDATE ' + x.timestamp, 'background: #555; color: #bada55', x.value);
    })


    // TODO : why it doesn't work as expected?!
    // The merge$ emits values, and here it only emits once and happens again only
    // when the reducers change much later.
    this.throttleSub = merge$.throttleTime(1).map((x) => {
      console.log('%c THROTTLE UPDATE ' + x.timestamp, 'background: #222; color: #bada55', x.value);
    }).subscribe(() => {
    })
  }


  /**
   * The reason for the common function is that we want to be updated only
   * when articles and users reducers are updated, not when the whole state is updated.
   * @param data
   */
  refreshData() {
    let articleReducer = this.ngRedux.getState().articlesReducer

    this.error = articleReducer.error;
    this.pending = articleReducer.pending;

    let normalizedArticles = articleReducer.articles;
    let relevantArticlesIDS = Object.keys(normalizedArticles)

    const articles = this.articlesActions.denormalizeArticles(relevantArticlesIDS);
    this.articles = _.values(articles);

    console.log(this.articles);

  }

  ngOnInit() {
    this.articlesActions.fetchArticles();
  }


  /**
   * IMPORTANT !!!
   * ------------UNSUBSCRIBE THE SUBSCRIBERS --------
   */
  ngOnDestroy() {
    this.articleSub.unsubscribe();
    this.userSub.unsubscribe();
    this.throttleSub.unsubscribe();
  }

  onArticleSubmit(article) {
    this.articlesActions.addArticle(article)
  }

  removeArticle(id) {
    this.articlesActions.removeArticle(id)
  }
}
