import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mrx',
  templateUrl: './mrx.component.html',
  styleUrls: ['./mrx.component.css']
})
export class MrxComponent implements OnInit {
  videoSrc = "";
  isVideoVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showVideoHumanWon() {
    this.videoSrc = "./assets/img/videos/Mensch gewinnt.mp4";
    this.showVideo();
  }

  showVideoMachineWon() {
    this.videoSrc = "./assets/img/videos/Maschine gewinnt.mp4";
    this.showVideo();
  }

  showVideo() {
    window.scrollTo(0,0);
    this.isVideoVisible = true;
  }

  hideVideo() {
    this.isVideoVisible = false;
  }

}
