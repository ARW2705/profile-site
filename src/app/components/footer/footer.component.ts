import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links = {
    github: 'https://github.com/ARW2705',
    linkedin: 'https://www.linkedin.com/in/andrew-wanex/',
    twitter: 'https://twitter.com/wanexa4?lang=en'
  };

  constructor() { }

  ngOnInit() {
  }

}
