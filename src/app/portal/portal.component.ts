import { Component, OnInit } from '@angular/core';

export interface PriceTable {
costPrice: number;
sellingPrice: number;
}
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  passcode = "";
  showError = false;
  gramList = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83];
  defaultGram = 75;
  bagWeightList = [33,34,35,36,37,38,39,40]
  defaultBagWeight = 36;
  selectedGram: number = 0;
  selectedBagWeight: number = 0;
  displayedColumns: string[] = ['costPrice', 'sellingPrice'];
  tableData: PriceTable[] = [];
  dataSource: PriceTable[] = [];
  calculated = false;
  authenticated = false;

  constructor() { }

  ngOnInit(): void {
    this.selectedGram = this.defaultGram;
    this.selectedBagWeight = this.defaultBagWeight;
  }

  changeGramValue(gram: number) {
    this.selectedGram = gram;
  }

  changeBagWeight(bagWeight: number) {
    this.selectedBagWeight = bagWeight;
  }

  calculateApproxPrice() {
    this.tableData = [];
    this.dataSource = [];
    const minCostPrice = 1500;
    const maxCostPrice = 3500;
    let modalPrice = minCostPrice;
    let approxPrice = 0;
    while(modalPrice <= maxCostPrice) {
      approxPrice = (((modalPrice + 120)/(this.selectedGram / 100 * this.selectedBagWeight)) * 80) + 150 - 450;
      console.log(modalPrice.toString() + " ---> " + approxPrice.toString());
      let priceMap: PriceTable = {
        costPrice: modalPrice,
        sellingPrice: Math.floor(approxPrice)
      };
      this.tableData.push(priceMap);
      modalPrice = modalPrice + 25;
    }
    this.dataSource = this.tableData;
    this.calculated = true;
  }

  login() {
    if (this.passcode == "336699") {
      this.authenticated = true;
    } else {
      this.showError = true;
    }
  }

}
