import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Menus } from '../../shared/models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Menus: Array<Menus> = [
    {
      Text: 'Bölümler',
      Link: 'Yonetim/Bolumler',
      Icon: 'account_balance',
      Role: ['Bolum.Ekle', 'Bolum.Guncelle', 'Bolum.Listele', 'Bolum.Sil']
    },
    {
      Text: 'Programlar',
      Link: 'Yonetim/Programlar',
      Icon: 'local_library',
      Role: []
    },
    {
      Text: 'Dersler',
      Link: 'Yonetim/Dersler',
      Icon: 'library_books',
      Role: []
    },
    {
      Text: 'Öğretim Elemanları',
      Link: 'Yonetim/OgretimElemanlari',
      Icon: 'school',
      Role: []
    },
    {
      Text: 'Soru Grupları',
      Link: 'Yonetim/SoruGruplari',
      Icon: 'help',
      Role: []
    },
    {
      Text: 'Anketler',
      Link: 'Yonetim/Anketler',
      Icon: 'insert_chart',
      Role: []
    },
    {
      Text: 'Raporlar',
      Link: 'Yonetim/Raporlar',
      Icon: 'pie_chart',
      Role: []
    },
    {
      Text: 'Üyeler',
      Link: 'Yonetim/Uyeler',
      Icon: 'account_box',
      Role: []
    },
    {
      Text: 'Çıkış Yap',
      Link: 'Yonetim/CikisYap',
      Icon: 'exit_to_app',
      Role: []
    }
  ];

  Title: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
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
  }
}
