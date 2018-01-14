import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public type = 'all';
  public streams: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStreams('all');
  }

  getStreams(type) {
      this.http.get('https://api.twitch.tv/helix/streams/?type=' + type,
        {headers: new HttpHeaders().set('Client-ID', 'j3ta4qnp53hv7t867vxyan7wwzkld6')})
    .subscribe(data => {
        // Read the result field from the JSON response.
      this.setImgSize(data);
      this.streams = data.data;
        console.log(data);
      });
  }

  setImgSize(data) {
    data.data.forEach((obj) => {
      obj.thumbnail_url = obj.thumbnail_url.replace(/{width}|{height}/g, 50);
    });
  }

  switchType(e, type) {
    e.preventDefault();
    this.type = type;
    this.getStreams(type);
  }
}
