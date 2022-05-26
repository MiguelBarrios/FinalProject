package com.skilldistillery.daytrainer.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.daytrainer.entities.Account;
import com.skilldistillery.daytrainer.entities.OrderType;
import com.skilldistillery.daytrainer.entities.Stock;
import com.skilldistillery.daytrainer.entities.Trade;
import com.skilldistillery.daytrainer.entities.User;
import com.skilldistillery.daytrainer.services.StockService;
import com.skilldistillery.daytrainer.services.TradeService;
import com.skilldistillery.daytrainer.services.UserService;


@RestController
@RequestMapping("api")
public class TradeController {
	
	@Autowired
	private TradeService tradeService;
	
	@Autowired 
	private StockService stockService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("trades")
	public List<Trade> getUserTrades(Principal principal){
		String username = principal.getName();
		return tradeService.getUserTrades(username);
	}
	
	@GetMapping("trades/{tid}")
	public Trade getTradeById(@PathVariable Integer tid, HttpServletResponse response, Principal principal) {
		
		Trade trade = tradeService.getTradeById(tid);
		if(trade == null) {
			response.setStatus(404);
		}
		
		return trade;
	}
	
	@PostMapping("trades")
	public Trade create(@RequestBody Trade trade, HttpServletResponse response, Principal principal) {
		
		String orderType = trade.getOrderType().getName();
		if(orderType.equals("Market")){
			trade = tradeService.createMarketTrade(principal.getName(),trade);
			if(trade == null) {
				response.setStatus(401);
			}
		}else {
			//TODO: Place limit order
		}
		
		return trade;
	}

}
