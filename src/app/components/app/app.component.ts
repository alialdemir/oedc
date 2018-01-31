import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Menus } from '../../shared/models/index';
import { SubscribeService, JwtService } from '../../shared/services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Menus: Array<Menus> = [
    {
      Text: 'Bölümler',
      Link: '/yonetim/bolumler',
      Icon: 'account_balance',
      Role: ['Bolum.Ekle', 'Bolum.Guncelle', 'Bolum.Listele', 'Bolum.Sil']
    },
    {
      Text: 'Programlar',
      Link: '/yonetim/programlar',
      Icon: 'local_library',
      Role: []
    },
    {
      Text: 'Dersler',
      Link: '/yonetim/dersler',
      Icon: 'library_books',
      Role: []
    },
    {
      Text: 'Öğretim Elemanları',
      Link: '/yonetim/ogretimElemanlari',
      Icon: 'school',
      Role: []
    },
    {
      Text: 'Soru Grupları',
      Link: '/yonetim/soruGruplari',
      Icon: 'help',
      Role: []
    },
    {
      Text: 'Anketler',
      Link: '/yonetim/anketler',
      Icon: 'insert_chart',
      Role: []
    },
    {
      Text: 'Raporlar',
      Link: '/yonetim/raporlar',
      Icon: 'pie_chart',
      Role: []
    },
    {
      Text: 'Üyeler',
      Link: '/yonetim/yyeler',
      Icon: 'account_box',
      Role: []
    },
    {
      Text: 'Çıkış Yap',
      Link: '/login',
      Icon: 'exit_to_app',
      Role: []
    }
  ];

  Title: string;

  isLogin = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private subscribeService: SubscribeService,
    private titleService: Title,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        // tslint:disable-next-line:curly
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        const title: string = event['title'] + ' - Süleyman Demirel Üniversitesi Uluborlu Selahattin Karasoy Meslek YüksekOkulu';
        this.titleService.setTitle(title);
        this.Title = event['title'];
      });

    this.loginSubscribe();
  }

  gotoLink(e, link) {
    if (link === '/login') {
      this.loginSubscribe();
      this.isLogin = false;
      this.jwtService.destroyToken();
    }

    this.router.navigate([link]);
  }

  loginSubscribe() {
    const sub = this.subscribeService.subscribe('login', isLogin => {
      this.isLogin = isLogin;
      sub.unsubscribe();
    });
  }
}
