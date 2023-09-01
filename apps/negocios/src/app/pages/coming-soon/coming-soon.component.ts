import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
})
export class CommingSoonComponent implements OnInit {
  @Input() deadline: any;
  countdown: any;

  constructor() {}

  setCountDown() {
    console.log(this.deadline);
    // Update the count down every 1 second
    this.countdown = setInterval(() => {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = this.deadline - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in an element with id="demo"
      document.getElementById('demo')!.innerHTML =
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.countdown);
        document.getElementById('demo')!.innerHTML = 'EXPIRED';
      }
    }, 1000);
  }

  cancelCountDown() {
    if (this.countdown) {
      clearInterval(this.countdown);
    }
  }

  ngOnInit(): void {
    this.setCountDown();
  }

  ngOnDestroy() {
    this.cancelCountDown();
  }
}
