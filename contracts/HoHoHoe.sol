pragma solidity ^0.4.18;

import 'StandardToken.sol';


/**
	*
	* @title HoHoHoe
	* @dev The JAAK 2017 Secret Santa
	* @dev Standard ERC20 interface
	*
*/
contract HoHoHoe is StandardToken {

	// Contract metadata
	string public name; // Ho Ho Hoe
	string public symbol; // HOE
	uint8 public decimals; // 18

	/**
		*
		* @dev Constructor function
		*
		* @param _name string The name of the token
		* @param _symbol string The name of the token
		* @param _decimals uint8 The number of decimal places used
		*
	*/
	function HoHoHoe (string _name, string _symbol, uint8 _decimals, uint _initialSupply) {		

		// Initial setup
		name = _name;
		symbol = _symbol;
		decimals = _decimals;
		totalSupply = _initialSupply;

		// Give all th hoes to the owner
		balances[msg.sender] = totalSupply;
		Transfer(0x0, msg.sender,	balances[msg.sender]);

	}
	

}