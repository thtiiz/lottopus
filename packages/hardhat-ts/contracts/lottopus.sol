pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

contract Lottopus {
  struct Lotto {
    string lottoNumber;
    uint256 buyTime;
  }

  struct systemLotto {
    string lottoNumber;
    uint256 buytime;
    address buyer;
  }

  uint256 private rewardNow;
  uint256 public lottoPrice;

  systemLotto[] private lottoNows;

  string private winnerNumber;

  mapping(address => Lotto[]) private myLottoNows;
  mapping(address => Lotto[]) private myLottos;
  mapping(string => address[]) private lottoNumberOwners;

  constructor() {}

  function getMyLottoNow(address my) public view returns (Lotto[] memory) {
    return myLottoNows[my];
  }

  function getMyAllLotto(address my) public view returns (Lotto[] memory) {
    return myLottos[my];
  }

  function buyLotto(address buyer, string memory number) public {
    lottoNows.push(systemLotto(number, now, buyer));
    myLottos[buyer].push(Lotto(number, now));
    myLottoNows[buyer].push(Lotto(number, now));
  }

  function getAllLotto() public view returns (systemLotto[] memory) {
    return lottoNows;
  }

  function closeRound(address closer) public {
    winnerNumber = "123";
  }

  function getWinner(string memory number) private returns (address[] memory) {
    return lottoNumberOwners[number];
  }

  function getRewardNow() public view returns (uint256) {
    return rewardNow;
  }

  function getRewardNumber() private returns (string memory) {
    return "123";
  }
}
