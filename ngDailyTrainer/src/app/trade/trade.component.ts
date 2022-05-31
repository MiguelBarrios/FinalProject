import { TradesService } from 'src/app/services/trades.service';
import { OrderType } from './../models/order-type';
import { Component, OnInit } from '@angular/core';
import { Trade } from '../models/trade';
import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  symbol:string | null = "";
  userTrades:Trade[] = [];

  newTrade = new Trade();
  action = "Buy";
  orderType = "Market";

  missingQuantitySMS = "";
  missingSymbolSMS = "";

  constructor( private route: ActivatedRoute,private date:DatePipe, private tradeService: TradesService) { }


  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getUserTrades();
    if(this.symbol){
      this.newTrade.stock.symbol = this.symbol;
    }



  }



  submitTrade(){
    this.newTrade.createdAt = this.date.transform(Date.now(),"YYYY-MM-ddThh:mm:ss");
    this.newTrade.buy = (this.action == "Buy");
    this.newTrade.orderType.name = this.orderType;
    this.newTrade.orderType.id = (this.orderType == "Market") ? 1 : 2;
    let currentPrice = document.getElementById("currentStockPrice")?.textContent;
    if(currentPrice){
      this.newTrade.pricePerShare = parseFloat(currentPrice);
    }


    this.missingQuantitySMS = (!this.newTrade.quantity) ? "Quantity Required" : "";
    this.missingSymbolSMS = (!this.newTrade.stock.symbol) ? "Symbol Required" : "";

    if(!this.newTrade.quantity || !this.newTrade.stock.symbol){
      console.log("Error returned");
      return;
    }
    console.log("Not error");

    this.tradeService.createTrade(this.newTrade).subscribe(
      (data) => {
        console.log("New Trade Created");
        console.log(data);
        this.userTrades.push(data);
        this.userTrades = [...this.userTrades]
      },
      (error) => {
        console.log("Observable got and error " + error)
      }
    )
  }

  getUserTrades(){
    this.tradeService.getUserTrades().subscribe(
      (data) => {
        this.userTrades = data;
      },
      (error) => {
        console.log("Observable got and error " + error)
      }
    )
  }




}
