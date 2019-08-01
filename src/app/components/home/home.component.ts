import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnPageVisible, OnPageHidden } from 'angular-page-visibility';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
      text: 'Hi,<br> I\'m Andrew,<br>a web developer',
      helpText: 'Navigate to the home page'
    }, {
      title: 'Contact', route: '/contact', thumbnail: 'assets/images/contact.jpg',
      alt: 'desk with laptop', textColor: 'dark',
      text: 'Contact Me',
      helpText: 'Navigate to the contact me page'
    }, {
      title: 'About', route: '/about', thumbnail: 'assets/images/about.jpg',
      alt: 'chair in a room', textColor: 'light',
      text: 'About Me',
      helpText: 'Navigate to the about me page'
    }, {
      title: 'Portfolio', route: '/portfolio', thumbnail: 'assets/images/portfolio.jpg',
      alt: 'white book with no title', textColor: 'dark',
      text: 'My Projects',
      helpText: 'Navigate to the portfolio page'
    }
  ];
  @ViewChild('carouselRingButton') carouselRingButton: ElementRef;
  carouselRotateInterval = null; // auto rotate setInterval ref
  imageRatios = [1, 0.8, 0.7]; // adjustment ratios for different sizes of browser window
  imageWidth: number; // image/anchor width in pixels after applying sizing ratios
  apothem = 1; // distance from center of rotation to center of a polygon's side
  gapRatio = 0.1; // gap between carousel images
  currentIndex = 0; // index of carousel page
  currentImage = 0; // image index value to calculate carousel rotation
  manualTiming = '0.5s';
  autoTiming = '1.5s';
  pauseAutoTimer = null;
  theta = 2 * Math.PI / this.pages.length; // angle of one image in carousel in radians
  figureStyle: CarouselStyle = {};
  figcaptionStyle: CarouselStyle = {};
  anchorStyle: CarouselStyle[] = [{}, {}, {}, {}];
  captionStyle: CarouselStyle[] = [{}, {}, {}, {}];
  resizeSubscription: Subscription;

  constructor(private router: Router,
    public cdRef: ChangeDetectorRef) { }

  @OnPageVisible()
  onPageVisible(): void {
    this.startAutoRotate();
  }

  @OnPageHidden()
  onPageHidden(): void {
    this.stopAutoRotate(true);
  }

  ngOnInit() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(_ => {
        console.log('resize');
        this.setImageRatio(true);
      });
    this.startAutoRotate();
  }

  ngAfterViewInit() {
    this.setImageRatio();
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.stopAutoRotate(true);
  }

  /**
   * Start carousel rotation timer
   *
   * @params: none
   *
   * @return: none
  **/
  startAutoRotate(): void {
    this.figureStyle.transition = this.autoTiming;
    if (this.carouselRotateInterval == null) {
      this.carouselRotateInterval = setInterval(() => {
        this.rotateCarousel('next');
      }, 7000);
    }
  }

  /**
   * Stop carousel rotate timer and set to null
   *
   * @params: [onLeave] - true if leaving page view
   *
   * @return: none
  **/
  stopAutoRotate(onLeave?: boolean): void {
    clearInterval(this.carouselRotateInterval);
    this.carouselRotateInterval = null;
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

  /**
   * Manually rotate the carousel when button is clicked
   *
   * @params: event - click event
   *
   * @return: none
  **/
  rotateCarouselOnClick(event: any): void {
    const rect = this.carouselRingButton.nativeElement.getBoundingClientRect();
    this.rotateCarousel(event.clientX < (rect.left + rect.width / 2) ? 'prev': 'next', true);
  }

  /**
   * Rotate the carousel in the given direction
   *
   * @params: direction - either 'next' to go right or 'prev' to go left
   * @params: [stopAutoRotate] - true if carousel should not auto rotate
   *
   * @return: none
  **/
  rotateCarousel(direction: string, stopAutoRotate?: boolean): void {
    if (stopAutoRotate) this.stopAutoRotate();
    if (direction == 'next') {
      this.currentImage++;
      this.currentIndex = this.currentIndex == this.pages.length - 1 ? 0: this.currentIndex + 1;
    } else {
      this.currentImage--;
      this.currentIndex = !this.currentIndex ? this.pages.length - 1: this.currentIndex - 1;
    }
    // rotate the carousel by current image index and its angle size
    this.figureStyle.transform = `rotateY(${this.currentImage * -this.theta}rad)`;
    this.cdRef.detectChanges();
  }

  /**
   * Navigate to page on carousel image click if image is front and center,
   * otherwise rotate the carousel towards the selected index
   *
   * @params: index - index of clicked image
   *
   * @return: none
  **/
  onCarouselNavigate(index: number): void {
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

  /**
   * Set image width, values for 3d rotation, and image position values based
   * on window width
   *
   * @params: [resize] - true if window was resized after load
   *
   * @return: none
  **/
  setImageRatio(resize?: boolean): void {
    const innerWidth = window.innerWidth;
    // set image width with ratio from array based on window inner width
    this.imageWidth = innerWidth * this.imageRatios[(innerWidth < 599) ? 0: (innerWidth < 1199) ? 1: 2];
    // calculate apothem for transformOrigin distance
    this.apothem = this.imageWidth / (2 * Math.tan(Math.PI / this.pages.length));
    this.figureStyle['transformOrigin'] = `50% 50% ${-this.apothem}px`;
    // on first load, set transform to 0rad
    if (!resize) {
      this.figureStyle['transform'] = 'rotateY(0rad)';
    }

    // calculate styles for anchor and caption for each page in carousel
    for (let i=0; i < this.pages.length; i++) {
      // get the width of the image factoring in the selected gap ratio between anchors
      const width = this.gapRatio * innerWidth;
      this.anchorStyle[i] = {
        margin: `0 ${width}px`
      };
      // set caption color based on page's text color and position based on anchor width
      this.captionStyle[i] = {
        color: `${this.pages[i].textColor == 'light' ? '#ededed' :'#090f19'}`,
        top: `${width * 0.5}px`,
        left: `${width * 1.6}px`
      };
      // Set styling for anchors and captions other than the first (front and center)
      // so that they start in their relative positions
      if (i) {
        this.anchorStyle[i].transformOrigin = `50% 50% ${-this.apothem}px`;
        this.anchorStyle[i].transform = `rotateY(${i * this.theta}rad)`;
        this.captionStyle[i].left = `${width * 0.7}px`
      // First anchor is not rotated at this point
      } else {
        this.captionStyle[i].right = `${width}px`;
      }
    }
  }

}
