import { Component, OnInit } from '@angular/core';

export interface PriceTable {
  gram: number,
  bagWeight: number,
  damageCost: number,
  moistureProfit: number,
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
  showSellingPrice = false;
  sellingPrice = 0;
  costPrice = 0;
  gramList = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83];
  defaultGram = 75;
  bagWeightList = [33,34,35,36,37,38,39,40]
  defaultBagWeight = 36;
  damageCostList = [{value:150, checked: true},{value:250, checked: false}];
  defaultDamageCost = 150;
  moistureProfitList = [{value:450, checked: true},{value:150, checked: false}];
  defaultMoistureProfit = 450;
  selectedGram: number = 0;
  selectedBagWeight: number = 0;
  selectedDamageCost: number = 0;
  selectedMoistureProfit: number = 0;
  displayedColumns: string[] = ['costPrice', 'sellingPrice'];
  tableData: PriceTable[] = [];
  dataSource: PriceTable[] = [];
  calculated = false;
  authenticated = false;
  inputParam1: String = '';
  inputParam2: String = '';

  constructor() { }

  ngOnInit(): void {
    this.selectedGram = this.defaultGram;
    this.selectedBagWeight = this.defaultBagWeight;
    this.selectedDamageCost = this.defaultDamageCost;
    this.selectedMoistureProfit = this.defaultMoistureProfit;
    this.calculateApproxPrice();
    this.setFooterInputParams();
  }

  setFooterInputParams() {
    this.inputParam1 = this.selectedGram + '% \n Pinju Rs. ' 
        + this.selectedDamageCost;
    this.inputParam2 = this.selectedBagWeight + 'Kg \n Moisture Rs. ' 
        + this.selectedMoistureProfit;
  }

  changeGramValue(event: Event) {
    this.selectedGram = parseInt((<HTMLInputElement>event.target).value);
    this.calculateApproxPrice();
    this.updateSellingPrice();
    this.setFooterInputParams();
  }

  changeBagWeight(event: Event) {
    this.selectedBagWeight = parseInt((<HTMLInputElement>event.target).value);;
    this.calculateApproxPrice();
    this.updateSellingPrice();
    this.setFooterInputParams();
  }

  changeDamageCost(damageCost: number) {
    this.selectedDamageCost = damageCost;
    this.calculateApproxPrice();
    this.updateSellingPrice();
    this.setFooterInputParams();
  }

  changeMoistureProfit(moistureProfit: number) {
    this.selectedMoistureProfit = moistureProfit;
    this.calculateApproxPrice();
    this.updateSellingPrice();
    this.setFooterInputParams();
  }

  calculateApproxPrice() {
    this.tableData = [];
    this.dataSource = [];
    const minCostPrice = 1500;
    const maxCostPrice = 3500;
    let modalPrice = minCostPrice;
    let approxPrice = 0;
    while(modalPrice <= maxCostPrice) {
      approxPrice = (((modalPrice + 120)/(this.selectedGram / 100 * this.selectedBagWeight)) * 80) + this.selectedDamageCost - this.selectedMoistureProfit;
      let priceMap: PriceTable = {
        gram: this.selectedGram,
        bagWeight: this.selectedBagWeight,
        damageCost: this.selectedDamageCost,
        moistureProfit: this.selectedMoistureProfit,
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
    if (this.passcode == "336699" || this.passcode == "9999") {
      this.authenticated = true;
    }
  }

  updateSellingPrice() {
    this.costPrice = parseInt(this.costPrice.toString());
    if (isNaN(this.costPrice)) {
      this.costPrice = 0;
      return;
    }
    if (this.costPrice > 0) {
      this.showSellingPrice = true;
      this.sellingPrice = (((this.costPrice + 120)/(this.selectedGram / 100 * this.selectedBagWeight)) * 80) + this.selectedDamageCost - this.selectedMoistureProfit;
      this.sellingPrice = Math.floor(this.sellingPrice);
    } else {
      this.showSellingPrice = false;
    }
  }

}
