import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoginService } from './Services/http/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Budget-app';
  alertAt = 40;
  startTimer = true;
  Token = localStorage.getItem('token');

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  
  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(private router: Router,private idle: Idle, private keepalive: Keepalive,private loginService: LoginService) {
    if(this.Token != null && this.Token != ''){
     // sets an idle timeout of 5 seconds, for testing purposes.
     idle.setIdle(40);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     idle.setTimeout(20);
     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
    //  idle.onIdleEnd.subscribe(() => { 
    //    this.reset();
    //  });
     
     idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
       localStorage.clear();
       sessionStorage.clear();
     });
     
     idle.onIdleStart.subscribe(() => {
         this.idleState = 'You\'ve gone idle!'
         this.childModal.show();
     });
     
     idle.onTimeoutWarning.subscribe((countdown) => {
       this.idle.clearInterrupts();
       this.idleState = 'You will time out in ' + countdown + ' seconds!'
     });
 
     // sets the ping interval to 15 seconds
     keepalive.interval(15);
 
     keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
     this.reset();
    }
   }

   refreshToken(){
    this.loginService.refreshToken()
    .subscribe(
        data => {
          if(data['statusCode'] == 200){
            localStorage.setItem("token", data['token']);
            location.reload();
          }
        },
        error => {
            
        });
   }

   reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

   Logout(){
     localStorage.clear();
     sessionStorage.clear();
     this.Token = '';
     this.childModal.hide();
     this.router.navigate(['']);
   }
}
