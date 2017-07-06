/**
 * Created by talgvili on 22/12/2016.
 */

/**
 * Every test should have this :
 */
var chai = require('chai')
import * as sinon from 'sinon';
import { assert, expect } from 'chai'
import { spy } from 'sinon'
// Letting spies use assertions
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);


import {NgRedux, NgReduxModule} from '@angular-redux/store';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import {ArticlesActions} from './articles.actions';
import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { normalize } from 'normalizr'
import {articleSchema} from "../../store/schemas";

let articlesMock = [{
        "id": 1,
        "title": "Some Article",
        "author": {
            "id": 7,
            "name": "Dan"
        },
        "contributors": [
            {
                "id": 10,
                "name": "Abe"
            },
            {
                "id": 15,
                "name": "Fred"
            }
        ]
    },
        {
            "id": 2,
            "title": "Some Article",
            "author": {
                "id": 10,
                "name": "Abe"
            },
            "contributors": [
                {
                    "id": 4,
                    "name": "Tal"
                },
                {
                    "id": 15,
                    "name": "Fred"
                }
            ]
        }
    ]


describe('articles action creators', () => {
    var dispatchSpy;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                NgReduxTestingModule
            ],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                ArticlesActions
            ]
        });

        MockNgRedux.reset();

        dispatchSpy = spy(MockNgRedux.getInstance(), "dispatch");
    });

    afterEach(() => {
        dispatchSpy.restore();
    })


    it('should add article', inject([ArticlesActions], (articlesActions /** It will be the service Variable !!*/) => {
        // Set up
        let articleData = articlesMock[0]
        let articleNormalized = normalize(articleData, articleSchema)
        // Getting the article object only.
        let article = articleNormalized.entities.articles
        let users = articleNormalized.entities.users

        const expectedAction = {
            type: ArticlesActions.SET_ARTICLE, /** It will be the service CLASS INSTANCE !! That's why I can reach his static members.*/
            payload: {
                article: article,
                users
            }
        };


        // Actions
        articlesActions.addArticle(articleData);


        // Tests.
        dispatchSpy.should.have.been.called;
        dispatchSpy.should.have.been.calledWith(expectedAction)
    }));

    it('should remove article', inject([ArticlesActions], (articlesActions /** It will be the service Variable !!*/) => {
            // Set up
            let article = articlesMock[0]

            const expectedAction = {
                type: ArticlesActions.REMOVE_ARTICLE, /** It will be the service CLASS INSTANCE !! That's why I can reach his static members.*/
                payload: {
                    id: article.id,
                }
            };

            // Actions
            articlesActions.removeArticle(article.id);

            // Tests.
            dispatchSpy.should.have.been.called;
            dispatchSpy.should.have.been.calledWith(expectedAction)
    }));


    it('Fetching Articles should dispatch FETCH_ARTICLES_REQUEST action', inject([ArticlesActions], (articlesActions) => {
        // Set up
        const expectedAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };

        // Actions
        articlesActions.fetchArticles();

        // Tests.
        dispatchSpy.should.have.been.called;
        dispatchSpy.should.have.been.calledWith(expectedAction)
    }));

    it('failing to fetch articles should dispatch FETCH_ARTICLES_FAILURE action', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {


        // Setup
        const errorMessage = "error"

        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };
        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_FAILURE,
            payload: {
                error: errorMessage
            }
        }

        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Error(errorMessage));
        });


        // Actions
        articlesActions.fetchArticles().complete(testing)

        //Test
        function testing() {
            dispatchSpy.should.have.been.calledTwice;
            dispatchSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            dispatchSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));

    it('should succeed fetching the articles and dispatch FETCH_ARTICLES_SUCCESS action with articles and users payload.', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {

        // Setup
        let normalizedArticles = normalize(articlesMock, [articleSchema])
        let articles = normalizedArticles.entities.article;
        let users = normalizedArticles.entities.user;

        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };

        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
            payload: {
                articles: articles,
                users: users
            }
        }


        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: articlesMock
            })));
        });

        // Actions
        articlesActions.fetchArticles().complete(testing)

        //Test
        function testing() {
            dispatchSpy.should.have.been.calledTwice;
            dispatchSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            dispatchSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));
});
