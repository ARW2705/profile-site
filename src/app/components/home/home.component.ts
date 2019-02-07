import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInOut } from '../animations/routing-animations';

interface CarouselStyle {
  transform?: string,
  transformOrigin?: string,
  transition?: string,
  margin?: string,
  top?: string,
  left?: string,
  color?: string,
  right?: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInOut()
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  pages = [
    {
      title: 'Intro', route: '/home', thumbnail: 'assets/images/intro-4.png',
      alt: 'Abstract line waves', textColor: 'light',
      text: 'Hi,<br> I\'m Andrew,<br> web developer.'
    }, {
      title: 'Contact', route: '/contact', thumbnail: 'assets/images/contact.jpg',
      alt: 'desk with laptop', textColor: 'dark',
      text: 'Contact Me'
    }, {
      title: 'About', route: '/about', thumbnail: 'assets/images/about.jpg',
      alt: 'chair in a room', textColor: 'light',
      text: 'About Me'
    }, {
      title: 'Portfolio', route: '/portfolio', thumbnail: 'assets/images/portfolio.jpg',
      alt: 'white book with no title', textColor: 'dark',
      text: 'My Projects'
    }
  ];
  carouselRotateInterval = null;
  imageRatios = [1, 0.8, 0.7];
  imageWidth: number;
  apothem = 1;
  gapRatio = 0.1;
  currentIndex = 0;
  currentImage = 0;
  manualTiming = '0.5s';
  autoTiming = '1.5s';
  pauseAutoTimer = null;
  theta = 2 * Math.PI / this.pages.length;
  figureStyle: CarouselStyle = {};
  figcaptionStyle: CarouselStyle = {};
  anchorStyle: CarouselStyle[] = [{}, {}, {}, {}];
  captionStyle: CarouselStyle[] = [{}, {}, {}, {}];

  constructor(private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setImageRatio();
  }

  ngOnInit() {
    this.startAutoRotate();
  }

  ngAfterViewInit() {
    this.setImageRatio();
  }

  ngOnDestroy() {
    this.stopAutoRotate(true);
  }

  startAutoRotate() {
    this.figureStyle.transition = this.autoTiming;
    this.carouselRotateInterval = setInterval(() => {
      this.rotateCarousel('next');
    }, 7000);
  }

  stopAutoRotate(onLeave?: boolean) {
    clearInterval(this.carouselRotateInterval);
    if (!onLeave) {
      this.figureStyle.transition = this.manualTiming;
      if (this.pauseAutoTimer == null) {
        this.pauseAutoTimer = setTimeout(() => {
          this.pauseAutoTimer = null;
          this.startAutoRotate();
        }, 20000);
      }
    }
  }

  rotateCarousel(direction: string, stopAutoRotate?: boolean) {
    if (stopAutoRotate) this.stopAutoRotate();
    if (direction == 'next') {
      this.currentImage++;
      this.currentIndex = this.currentIndex == this.pages.length - 1 ? 0: this.currentIndex + 1;
    } else {
      this.currentImage--;
      this.currentIndex = !this.currentIndex ? this.pages.length - 1: this.currentIndex - 1;
    }
    // TODO - use angular animations?
    this.figureStyle.transform = `rotateY(${this.currentImage * -this.theta}rad)`;
  }

  onCarouselNavigate(index: number) {
    if (this.currentIndex == index) {
      this.router.navigate([this.pages[index].route]);
    } else {
      if (this.carouselRotateInterval != null) this.stopAutoRotate();
      if (!this.currentIndex && index == this.pages.length - 1) {
        this.rotateCarousel('prev');
      } else if (this.currentIndex == this.pages.length - 1 && !index) {
        this.rotateCarousel('next');
      } else if (this.currentIndex < index) {
        this.rotateCarousel('next');
      } else {
        this.rotateCarousel('prev');
      }
    }
  }

  setImageRatio() {
    const innerWidth = window.innerWidth;
    this.imageWidth = innerWidth * this.imageRatios[(innerWidth < 599) ? 0: (innerWidth < 1199) ? 1: 2];
    this.apothem = this.imageWidth / (2 * Math.tan(Math.PI / this.pages.length));
    this.figureStyle = {
      transformOrigin: `50% 50% ${-this.apothem}px`,
      transform: 'rotateY(0rad)'
    };

    for (let i=0; i < this.pages.length; i++) {
      const width = this.gapRatio * innerWidth;
      this.anchorStyle[i] = {
        margin: `0 ${width}px`
      };
      this.captionStyle[i] = {
        color: `${this.pages[i].textColor == 'light' ? '#ededed' :'#090f19'}`,
        top: `${width * 0.5}px`,
        left: `${width * 1.6}px`
      };
      if (i) {
        this.anchorStyle[i].transformOrigin = `50% 50% ${-this.apothem}px`;
        this.anchorStyle[i].transform = `rotateY(${i * this.theta}rad)`;
        this.captionStyle[i].left = `${width * 0.7}px`
      } else {
        this.captionStyle[i].right = `${width}px`;
      }
    }
  }

}
