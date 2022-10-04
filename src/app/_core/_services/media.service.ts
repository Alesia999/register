import { ReplaySubject } from 'rxjs';

export class MediaService {
  private matches = new ReplaySubject<boolean>(1);
  public match$ = this.matches.asObservable();

  constructor(public readonly query: string) {
    if (window) {
      const mediaQueryList = window.matchMedia(this.query);

      const listener = (event: any) => this.matches.next(event.matches);

      listener(mediaQueryList);
      mediaQueryList.addEventListener('change', listener);
    }
  }
}
