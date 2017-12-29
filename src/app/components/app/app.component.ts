import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from '../../shared/services/message.service';

import { MatDialog } from '@angular/material';
import { Menus } from '../../shared/models/menus.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
      Icon: 'school',
      Role: []
    },
    {
      Text: 'Dersler',
      Link: 'Yonetim/Dersler',
      Icon: 'home',
      Role: []
    },
    {
      Text: 'Öğretim Elemanları',
      Link: 'Yonetim/OgretimElemanları',
      Icon: 'home',
      Role: []
    },
    {
      Text: 'Sorular',
      Link: 'Yonetim/Sorular',
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

  addComponent: any;

  readonly notifyOptions = {
    timeOut: 5000
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) { }

  openNewRecordDialog(): void {
    const dialogRef = this.dialog.open(this.addComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => this.messageService.sendMessage(result));
  }
  // tslint:disable-next-line:use-life-cycle-interface
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
        this.addComponent = event['addComponent'];
      });
  }
}
