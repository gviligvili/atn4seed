import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule, PreloadAllModules} from '@angular/router';
// import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {AlertModule, DatepickerModule} from 'ng2-bootstrap';


/**
 * Platform and Environment providers/directives/pipes
 */
import {ROUTES} from './app.routes';

// App is our top level component
import {AppComponent} from './app.component';
import {HomeComponent} from './home';
import {NoContentComponent} from './no-content';

/**
 *  Redux Imports
 */
import {IAppState, rootReducer} from "./store/store";
import {middleware, enhancers} from "./store/index";
import {DevToolsExtension, NgRedux} from "@angular-redux/store";
import {CoreModule} from "./core.module";
import {SharedModule} from "./modules/shared.module";
import {PerfectScrollbarModule, PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        NoContentComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpModule,
        AlertModule.forRoot(),
        DatepickerModule.forRoot(),
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    providers: [
    ]
})
export class AppModule {
    constructor(private ngRedux:NgRedux<IAppState>,
                private devTools:DevToolsExtension) {

        this.configureStore({});
    }

    configureStore(initState = {}){
        this.ngRedux.configureStore(
            rootReducer,
            {},
            middleware,
            this.devTools.isEnabled() ?
                [...enhancers, this.devTools.enhancer()] :
                enhancers);
    }
}

