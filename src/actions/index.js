import getWeb3 from "./../util/web3/getWeb3"

export const TO_COMMIT_FORM = 'FETCH_WEATHER';
export const NEW_COMMITMENT = 'NEW_COMMITMENT';
export const REQUEST_COMMITMENT = 'REQUEST_COMMITMENT';
export const RECEIVE_COMMITMENT = 'RECEIVE_COMMITMENT';

const nudgeFactoryABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "getStandardNudgeCountForAccount",
		"outputs": [
			{
				"name": "contractCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_moderator",
				"type": "address"
			},
			{
				"name": "_alternativePayout",
				"type": "address"
			},
			{
				"name": "_commitment",
				"type": "string"
			},
			{
				"name": "_durationMinutes",
				"type": "uint256"
			}
		],
		"name": "newStandardNudge",
		"outputs": [
			{
				"name": "newNudgeAddress",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllStandardNudgeContracts",
		"outputs": [
			{
				"name": "contracts",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allStandardNudgeContracts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "live",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenContract",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approveToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenContract",
				"type": "address"
			},
			{
				"name": "_transferTo",
				"type": "address"
			},
			{
				"name": "_transferFrom",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferTokenFrom",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "getStandardNudgeContractsForAccount",
		"outputs": [
			{
				"name": "contractsForAccount",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tokenContract",
				"type": "address"
			},
			{
				"name": "_transferTo",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "bool"
			}
		],
		"name": "setLive",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_live",
				"type": "bool"
			}
		],
		"name": "FactoryLive",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "NewStandardNudge",
		"type": "event"
	}
]

export function toCommitForm(landingCommitment, userAddr) {
  return {
    type: TO_COMMIT_FORM,
    payload: landingCommitment,
    userAddr: userAddr
  };
}

export function newCommitment(commitment) {
  return {
    type: NEW_COMMITMENT,
    payload: commitment
  }
}

export function requestCommitment() {
  console.log("request commitment")
  return {
    type: REQUEST_COMMITMENT
  }
}

// Thunk action creator
export function confirmedCommitment(contractParams) {
  // Thunk middleware passes the dispatch method as an argument to 
  // the function, thus making it able to dispatch actions itself
  console.log("Create contract with terms here, terms:", contractParams);

  return function(dispatch){
    // First dispatch, app state updated that call is starting 
    dispatch(requestCommitment())
  
    return getWeb3
      .then((web3) => {
        if(web3){
          web3.payload.web3Instance.eth.getAccounts((err, accounts) => {
            if(!err){
              return accounts
            }
          })
          .then(function(accounts) {
            let _web3 = web3.payload.web3Instance;
            let NudgeFactoryContract = new _web3.eth.Contract(nudgeFactoryABI, "0xf12b5dd4ead5f743c6baa640b0216200e89b60da");
            return NudgeFactoryContract;
          })
          .then(function(nudgeFactory) {
            let _web3 = web3.payload.web3Instance;
            console.log(nudgeFactory)
            console.log(contractParams)
            nudgeFactory.methods.newStandardNudge(
              contractParams.userAddress,
              contractParams.modAddress,
              contractParams.altAddress,
              contractParams.commitment,
              contractParams.deadline
            )
            .send({from: "0xf17f52151EbEF6C7334FAD080c5704D77216b732", gas: 6500000, value: _web3.utils.toWei("5")})
            .then(function(receipt) {
              console.log(receipt)
            })
              


            /*
            nudgeFactory.methods.live().call((err, result) => {
              if (result != null){
                console.log("is factory live?", result);
              }
            })
            */
          })

        }
      })
      
  }
}

export function receiveCommitment(response){
  console.log("receive commitment", response)
  return {
    type: RECEIVE_COMMITMENT,
    payload: response,
    receivedAt: Date.now()
  }
}