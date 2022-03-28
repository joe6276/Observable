import { Component, OnDestroy, OnInit } from '@angular/core';
import {  filter, map, observable, Observable,Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
private firstSub!:Subscription
  constructor() { }

  ngOnInit(): void {
    // this.firstSub=interval(1000).subscribe(
    //   count=>{
    //     console.log(count)
    //   }
    // )
    const customObservable= Observable.create((observer:Observer<Number>)=>{
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count===2){
          observer.complete()
        }
        if(count>4){
          observer.error(new Error('An Error Occured'))
        }
        count++;
      }, 1000)
    })
  
    
    this.firstSub= customObservable.pipe(filter  ((data:number)=>{
        return data>0
    }),map((data:number)=>{
      return 'Round:'  +(data+1)
  })).subscribe(
      (data:number)=>{
        console.log(data)
      },
     ( error:string)=>{
        console.log(error);
        alert(error)
      },()=>{
        alert('Completed')
      }
    )
  }

  ngOnDestroy(): void {
    this.firstSub.unsubscribe()
  }

}
