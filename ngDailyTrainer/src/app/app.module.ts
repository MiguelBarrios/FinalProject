import { FooterComponent } from './components/footer/footer.component';
import { TradesService } from './services/trades.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { PortfolioChartComponent } from './components/portfolio-chart/portfolio-chart.component';
import { TopMoversComponent } from './components/top-movers/top-movers.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NavbarComponent } from './components/navbar/navbar.component';

import { FilterTablePipe } from './pipes/filter-table.pipe';
import { FormsModule } from '@angular/forms';

import { SingleStockViewComponent } from './components/single-stock-view/single-stock-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AccountHomeComponent } from './components/account-home/account-home.component';




import { TradeComponent } from './trade/trade.component';
import { DatePipe } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { LogoutComponent } from './components/logout/logout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';
import { FeedComponent } from './components/feed/feed.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MarketComponent } from './components/market/market.component';
import { UsersComponent } from './components/users/users.component';
import { FriendsComponent } from './components/friends/friends.component';
import { TradesComponent } from './components/trades/trades.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMoversComponent,
    PortfolioChartComponent,
    LeaderBoardComponent,
    FilterTablePipe,
    SingleStockViewComponent,
    HomepageComponent,
    AccountHomeComponent,
    NavbarComponent,
    FooterComponent,
    TradeComponent,
    LogoutComponent,
    NotfoundComponent,
    UserUpdateFormComponent,
    FeedComponent,
    SettingsComponent,
    MarketComponent,
    UsersComponent,
    FriendsComponent,
    TradesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [TradesService, FilterTablePipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
