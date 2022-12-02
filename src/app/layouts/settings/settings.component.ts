import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openSettings() {
    document.querySelector('.fixed-plugin').classList.add('show');
  }

  closeSettings() {
    document.querySelector('.fixed-plugin').classList.remove('show');
  }
  sidebarColor(a) {
    var parent = document.querySelector('.nav-link.active');
    var color = a.getAttribute('data-color');

    if (parent.classList.contains('bg-gradient-primary')) {
      parent.classList.remove('bg-gradient-primary');
    }
    if (parent.classList.contains('bg-gradient-dark')) {
      parent.classList.remove('bg-gradient-dark');
    }
    if (parent.classList.contains('bg-gradient-info')) {
      parent.classList.remove('bg-gradient-info');
    }
    if (parent.classList.contains('bg-gradient-success')) {
      parent.classList.remove('bg-gradient-success');
    }
    if (parent.classList.contains('bg-gradient-warning')) {
      parent.classList.remove('bg-gradient-warning');
    }
    if (parent.classList.contains('bg-gradient-danger')) {
      parent.classList.remove('bg-gradient-danger');
    }
    parent.classList.add('bg-gradient-' + color);
  }
  sidebarType(a) {
    var parent = a.parentElement.children;
    var color = a.getAttribute('data-class');
    var body = document.querySelector('body');
    var bodyWhite = document.querySelector('body:not(.dark-version)');
    var bodyDark = body.classList.contains('dark-version');

    var colors = [];

    for (var i = 0; i < parent.length; i++) {
      parent[i].classList.remove('active');
      colors.push(parent[i].getAttribute('data-class'));
    }

    if (!a.classList.contains('active')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }

    var sidebar = document.querySelector('.sidenav');

    for (var i = 0; i < colors.length; i++) {
      sidebar.classList.remove(colors[i]);
    }

    sidebar.classList.add(color);
  }
}
