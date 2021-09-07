//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./WKNDToken.sol";

contract Voting {
    address public owner;
    Candidate[] public candidates;
    mapping(address => WakandaVoter) public wakandaVoter;
    uint256[] public leaderboard;
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
    }

    constructor(WKNDToken _wknd) {
        owner = msg.sender;
        wknd = WKNDToken(_wknd);
        votingToken = 1;
    }

    function addCandidates(Candidate[] memory _candidates) public {
        require(
            msg.sender == owner,
            "Only owner of contract can add candidate"
        );
        require(candidates.length == 0, "Candidates are already added");

        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
        }
        return;
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidatesSize() external view returns (uint256) {
        return candidates.length;
    }

    function registration(address _wakanda) external {
        require(
            wknd.balanceOf(_wakanda) == votingToken,
            "Wakanda doesn't have enaugh token to complete registration"
        );
        wakandaVoter[_wakanda].registered = true;
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
    ) external {
        require(_wakandaAddress != owner, "Owner of contract could not vote");
        require(_wakandaAddress == msg.sender, "You are not allowed to vote");
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

        if (wakandaTokenBalance == _amountOfVotes) {
            wakandaVoter[_wakandaAddress].hasVoted = true;
        }

        candidates[_candidateId].score += _amountOfVotes;

        if (!isCandidateInLeaderboard(_candidateId)) {
            updateLeaderboard(_candidateId);
        }

        wknd.burn(_wakandaAddress, _amountOfVotes);

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
