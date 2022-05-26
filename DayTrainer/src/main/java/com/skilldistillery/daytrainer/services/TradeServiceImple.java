package com.skilldistillery.daytrainer.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.daytrainer.entities.Account;
import com.skilldistillery.daytrainer.entities.Stock;
import com.skilldistillery.daytrainer.entities.Trade;
import com.skilldistillery.daytrainer.entities.User;
import com.skilldistillery.daytrainer.repository.AccountRepository;
import com.skilldistillery.daytrainer.repository.StockRepository;
import com.skilldistillery.daytrainer.repository.TradeRepository;
import com.skilldistillery.daytrainer.repository.UserRepository;

@Service
public class TradeServiceImple implements TradeService {

	
	@Autowired
	private TradeRepository tradeRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StockRepository stockRepo;
	
	@Autowired 
	private StockService stockService;
	
	@Autowired
	private AccountRepository accountRepo;
	
	
	@Override
	public List<Trade> getUserTrades(String username) {
		return tradeRepo.getUserTrades(username);
	}
	
	@Override
	public Trade getTradeById(int tid) {
		Optional<Trade> option = tradeRepo.findById(tid);
		return (option.isPresent()) ? option.get() : null;
	}
	
	@Override
	public Trade createMarketTrade(String username, Trade trade) {
	
		//PERSIST STOCK SYMBOL IF NOT PRESENT
		Stock stock = trade.getStock();
		stock = stockService.getStock(stock);
		
		User user = userRepo.findByUsername(username);
		trade.setUser(user);
		
		Account account = user.getAccount();
		
		if(trade.isBuy()) {
			System.out.println("User bought shares: " + stock);
			double updatedBalance = account.getBalance() - (trade.getPricePerShare() * trade.getQuantity());
			account.setBalance(updatedBalance);
			accountRepo.saveAndFlush(account);
			tradeRepo.saveAndFlush(trade);
			
		}else {
			System.out.println("User sold shares: " + stock);
			//Check if user Has shares
			//TODO: Brute force, come back and create query
			this.getCurrentHolding(username, stock.getSymbol());

			
		}		
		return trade;
	}
	
	private void getCurrentHolding(String username, String symbol) {
		List<Trade> holding = tradeRepo.getUserTradesByStock(username, symbol);
		int numberOfTrades = holding.size();
		int positionSize = 0;
		for(Trade trade : holding) {
			if(trade.isBuy()) {
				positionSize += trade.getQuantity();
			}else {
				positionSize -= trade.getQuantity();
			}
		}
		System.out.println("Number of trades on: " + symbol);
		System.out.println("Position size: " + positionSize);

		
	}
	
	
}
