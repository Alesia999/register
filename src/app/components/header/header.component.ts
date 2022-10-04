import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../_core/_services/media.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDesktop: boolean;
  private mediaService = new MediaService('(min-width: 768px)');

  ngOnInit() {
    this.mediaService.match$.subscribe((value) => (this.isDesktop = value));
  }
}
