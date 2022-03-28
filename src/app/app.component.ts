import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'observables';

  activated:boolean=false
  sub!:Subscription

  constructor(private userService:UserService){}

  ngOnInit(): void {
      this.sub=this.userService.activatedEmitter.subscribe(
        active=>{
          this.activated=active
        }
      )
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
  
}
