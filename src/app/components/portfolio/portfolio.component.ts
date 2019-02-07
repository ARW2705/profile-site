import { Component, OnInit } from '@angular/core';

import { baseURL } from '../../shared/base-url';
import { apiVersion } from '../../shared/api-version';
import { ProjectData } from '../../shared/project-data';

import { SAMPLE } from '../../tmp/sample-project';

import { fadeInOut } from '../animations/routing-animations';

import { ProjectDataService } from '../../services/project-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    fadeInOut()
  ]
})
export class PortfolioComponent implements OnInit {

  errMsg = '';
  url = 'assets/';
  projects: ProjectData[];
  projectList: ProjectData[];

  constructor(private projectService: ProjectDataService) {
    // this.url = baseURL + apiVersion;
  }

  ngOnInit() {
    this.projectList = SAMPLE;
    this.projects = SAMPLE;
    // this.projectService.getProjects()
    //   .subscribe(projects => {
    //     this.projects = projects;
    //     this.projectList = projects;
    //   }, err => this.errMsg = err);
  }

  filterProjectsByTechnology(selected: string) {
    this.projects = this.projectList.filter(project => {
      return project.technology.includes(selected);
    });
  }

  resetProjects() {
    this.projects = this.projectList;
  }

}
