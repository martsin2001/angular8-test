import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, fromEvent, of } from 'rxjs';
import { Message } from '../core/message.interface';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { ConversationFacade } from '../redux/conversation.facade';

@Component({
  selector: 'app-search-messenges',
  templateUrl: './search-messenges.component.html',
  styleUrls: ['./search-messenges.component.scss']
})
export class SearchMessengesComponent implements OnInit {
  @Input() themeColor: string;

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  foundMessages$: Observable<Message[]>;
  consversations: { id: number; name: string }[];

  constructor(
    private appService: AppService,
    private conversationFacade: ConversationFacade
  ) {}

  ngOnInit() {
    this.subscribeToInput();
    this.loadConversations();
    this.searchMessages('');
  }

  changeConvarsation(id: number) {
    this.conversationFacade.loadConverastionById(id);
  }

  private loadConversations() {
    this.consversations = this.appService.loadConversationData();
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
          this.foundMessages$ = this.searchMessages(value);
        } else {
          this.foundMessages$ = null;
        }
      });
  }

  private searchMessages(keyword): Observable<Message[]> {
    return this.conversationFacade.conversation$.pipe(
      map(conv => {
        return conv.messages.filter((item: Message) =>
          item.message.toLowerCase().includes(keyword.toLowerCase())
        );
      })
    );
  }
}
