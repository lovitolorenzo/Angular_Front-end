import { Component, Input, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface winningProposalDataStruct {
  name: string;
  voteCount: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  addressToDelegate: string;
  toDelegate: string;
  tokenTotalSupply: string;
  tokenContractAddress: string;
  walletAddress: string;
  wallet: ethers.Wallet;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;
  winningProposal: winningProposalDataStruct | undefined;

  claimForm = this.fb.group({
    name: [''],
    id: [''],
  });

  formGroup = new FormGroup({
    address: new FormControl('', [Validators.required]),
  });

  formGroupVote = new FormGroup({
    vote: new FormControl('', [Validators.required]),
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.tokenTotalSupply = 'Loading...';
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = 'Loading...';
    this.etherBalance = 'Loading...';
    this.provider = ethers.getDefaultProvider('goerli');
    this.tokenContractAddress = '';
    this.addressToDelegate = '';
    this.toDelegate = '';
    this.winningProposal;
    this.formGroup.valueChanges.subscribe((value) =>
      console.log(this.formGroup.value.address)
    );
    this.formGroupVote.valueChanges.subscribe((value) =>
      console.log(this.formGroupVote.value)
    );
  }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => {
      this.tokenContractAddress = response.result;
    });

    this.apiService.getTotalSupply().subscribe((response) => {
      this.tokenTotalSupply = response.result;
    });

    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + 'Eth';
    });
  }

  getWinningProposal() {
    this.apiService.getWinningProposal().subscribe((response) => {
      // const { name } = response.result;
      // const { voteCount } = response.result;
      // this.winningProposal = {
      //   name: ethers.utils.parseBytes32String(name),
      //   voteCount: ethers.utils.formatEther(voteCount),
      // };
      console.log(response);
    });
  }

  request() {
    const body = {
      name: this.claimForm.value.name,
      id: this.claimForm.value.id,
    };
    this.apiService.requestTokens(body).subscribe((result) => {
      console.log(result);
    });
  }

  delegate() {
    const body = {
      address: this.formGroup.value?.address,
    };

    this.apiService.delegate(body).subscribe((result) => {
      console.log(result);
    });
  }

  vote() {
    const body = {
      choice: this.formGroupVote.value?.vote,
    };

    this.apiService.delegate(body).subscribe((result) => {
      console.log(result);
    });
  }
}
