import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, fromEvent } from 'rxjs';
import { Message } from '../core/message.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-messenges',
  templateUrl: './search-messenges.component.html',
  styleUrls: ['./search-messenges.component.scss']
})
export class SearchMessengesComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  foundMessages$: Observable<Message[]>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.subscribeToInput();
  }

  private subscribeToInput() {
    fromEvent(this.input.nativeElement, 'input', event =>
      event.target.value.trim()
    )
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (!!value) {
          this.foundMessages$ = this.appService.searchMessages(value);
        } else {
          this.foundMessages$ = null;
        }
      });
  }
}
