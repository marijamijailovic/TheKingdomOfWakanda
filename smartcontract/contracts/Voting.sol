//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./WKNDToken.sol";

contract Voting {
    address owner;
    Candidate[] candidates;
    address[] delegators;
    mapping(address => WakandaVoter) wakandaVoter;
    uint256[] leaderboard;
    WKNDToken wknd;
    uint256 votingToken;

    event NewChallenger(uint256[] indexed leaderboard);

    struct Candidate {
        string name;
        uint256 age;
        string cult;
        uint256 score;
        uint256 id;
    }

    struct WakandaVoter {
        bool registered;
        uint256 voteFor;
        bool hasVoted;
        address delegateTo;
        bool isDelegator;
    }

    constructor(WKNDToken _wknd) {
        owner = msg.sender;
        wknd = WKNDToken(_wknd);
        votingToken = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Allowed only to owner");
        _;
    }

    modifier onlySender(address _address) {
        require(msg.sender == _address, "Allowed only to sender");
        _;
    }

    function addCandidates(Candidate[] memory _candidates) public onlyOwner {
        require(candidates.length == 0, "Candidates are already added");

        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
        }
        return;
    }

    function addDelegators(address _delegatorAddress) public onlyOwner {
        require(
            owner != _delegatorAddress,
            "Owner of account can't be delegator"
        );
        delegators.push(_delegatorAddress);
        wakandaVoter[_delegatorAddress].isDelegator = true;
        wakandaVoter[_delegatorAddress].registered = true;

        return;
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getDelegators() external view returns (address[] memory) {
        return delegators;
    }

    function getCandidatesSize() external view returns (uint256) {
        return candidates.length;
    }

    function registration(address _wakanda, uint256 _token) external onlyOwner {
        require(msg.sender != _wakanda, "You are not alowed for these action");
        require(
            !wakandaVoter[_wakanda].registered,
            "You are already registered"
        );
        require(_token == votingToken, "Only one token can be send");
        require(
            wknd.balanceOf(msg.sender) > 0,
            "Sender doesn't have enaugh balance"
        );

        wakandaVoter[_wakanda].registered = true;
        wknd.transfer(msg.sender, _wakanda, votingToken);

        return;
    }

    function isWakandaRegistered(address _wakanda)
        external
        view
        returns (bool success)
    {
        return wakandaVoter[_wakanda].registered;
    }

    function isWakandaVoted(address _wakanda)
        external
        view
        returns (bool success)
    {
        return wakandaVoter[_wakanda].hasVoted;
    }

    function vote(
        address _wakandaAddress,
        uint256 _candidateId,
        uint256 _amountOfVotes
    ) external onlySender(_wakandaAddress) {
        require(_wakandaAddress != owner, "Owner of contract could not vote");
        require(
            !wakandaVoter[_wakandaAddress].hasVoted,
            "These address already voted"
        );
        uint256 wakandaTokenBalance = wknd.balanceOf(_wakandaAddress);
        require(
            _amountOfVotes > 0 &&
                wakandaTokenBalance > 0 &&
                _amountOfVotes <= wakandaTokenBalance,
            "Wakanda doesn't have enaugh balance to vote!"
        );
        require(candidates.length > 0, "There is no candidate to vote for");

        wakandaVoter[_wakandaAddress].voteFor = _candidateId;

        if (
            wakandaTokenBalance == _amountOfVotes &&
            !wakandaVoter[_wakandaAddress].isDelegator
        ) {
            wakandaVoter[_wakandaAddress].hasVoted = true;
        }

        candidates[_candidateId].score += _amountOfVotes;

        if (!isCandidateInLeaderboard(_candidateId)) {
            updateLeaderboard(_candidateId);
        }

        wknd.burn(_wakandaAddress, _amountOfVotes);

        return;
    }

    function delegateVote(address _wakandaAddress, address _delegatorAddress)
        external
        onlySender(_wakandaAddress)
    {
        require(
            _wakandaAddress != owner && _delegatorAddress != owner,
            "Owner of contract could not delegate"
        );
        require(
            _wakandaAddress != _delegatorAddress,
            "Self delegation is not allowed"
        );
        require(
            wakandaVoter[_wakandaAddress].delegateTo == address(0) &&
                wakandaVoter[_wakandaAddress].registered &&
                !wakandaVoter[_wakandaAddress].hasVoted,
            "Wakanda can't delegate vote"
        );
        require(
            !wakandaVoter[_wakandaAddress].isDelegator,
            "Delegation form delegator to delegator is not allowed"
        );

        uint256 balanceOfWakanda = wknd.balanceOf(_wakandaAddress);
        require(
            balanceOfWakanda == votingToken,
            "Only one token could be delegated"
        );

        require(
            _delegatorAddress != address(0) &&
                wakandaVoter[_delegatorAddress].isDelegator,
            "Delegator addres is not valid"
        );

        wakandaVoter[_wakandaAddress].hasVoted = true;
        wakandaVoter[_wakandaAddress].delegateTo = _delegatorAddress;

        wknd.transfer(_wakandaAddress, _delegatorAddress, balanceOfWakanda);

        return;
    }

    function updateLeaderboard(uint256 _candidateId) private {
        uint256 size = leaderboard.length;
        if (size < 3) {
            leaderboard.push(_candidateId);
            emit NewChallenger(leaderboard);
        } else {
            uint256 min = candidateWithLowestScoreInLeaderboard();
            if (
                candidates[_candidateId].score >
                candidates[leaderboard[min]].score
            ) {
                leaderboard[min] = _candidateId;
                emit NewChallenger(leaderboard);
            }
        }
    }

    function isCandidateInLeaderboard(uint256 _candidateId)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == _candidateId) {
                return true;
            }
        }
        return false;
    }

    function candidateWithLowestScoreInLeaderboard()
        private
        view
        returns (uint256)
    {
        uint256 min_i = 0;
        for (uint256 i = 1; i < leaderboard.length; i++) {
            if (
                candidates[leaderboard[i]].score <=
                candidates[leaderboard[min_i]].score
            ) {
                min_i = i;
            }
        }
        return min_i;
    }

    function winningCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory winners = new Candidate[](leaderboard.length);
        for (uint256 i = 0; i < leaderboard.length; i++) {
            winners[i] = candidates[leaderboard[i]];
        }
        return winners;
    }
}
