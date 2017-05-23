/**
 * Created by talgvili on 26/12/2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
    selector: 'users-view',
    templateUrl: 'users-view.component.html',
    styleUrls: ['users-view.component.scss']
})
export class UsersView {
    @Input() users;
    @Output() userSubmit = new EventEmitter();

    private userForm:FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.userForm = this.formBuilder.group({
            id: '',
            name: '',
        });
    }

    onSubmit(){
        let user = {
            id: this.userForm.controls["id"].value,
            name: this.userForm.controls["name"].value
        };
        this.userSubmit.emit(user)
    }


    ngOnChanges() {
        console.log()
    }

    trackUsers(user){
        return user ? user.id : undefined
    }

    ngOnInit() {
        console.log("USERS View INIT ###################");
    }

    ngOnDestroy() {
        console.log("USERS View DESTROY ###################");
    }
}
