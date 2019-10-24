import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchMessengesComponent } from './search-messenges/search-messenges.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { ConversationEffects } from './redux/conversation.effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConversationReducer } from './redux/conversation.reducer';

@NgModule({
  declarations: [AppComponent, SearchMessengesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([ConversationEffects]),
    StoreModule.forFeature('app-state', ConversationReducer),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
