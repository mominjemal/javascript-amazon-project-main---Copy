// Enable HMR in your code

class Car {
  speed = 0;
  #brand;
  #model;
  isTrunkOpen;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  openTrunk() {
    if (this.speed == 0) {
      this.isTrunkOpen = true;
    } else {
      console.log("car is moving, cannot open trunk");
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }

  carIfo() {
    console.log(`This car is a ${this.brand} ${this.model}`);
  }
  go() {
    if (!this.isTrunkOpen) {
      if (this.speed < 200) {
        this.speed += 5;
        console.log(`car is going at ${this.speed} km/h`);
      } else {
        console.log("max speed reached");
      }
    } else {
      console.log("close the trunk first");
    }
  }
  brake() {
    if (this.speed > 4) {
      if (this.speed == 5) {
        console.log("car has stopped");
      } else {
        this.speed -= 5;
        console.log(`car is going at ${this.speed} km/h`);
      }
    }
  }
}
const car1 = new Car("toyota", "corolla");
const car2 = new Car("honda", "civic");

console.log(car1);
car1.go();
car1.go();

car1.brake();

class racaeCar extends Car {
  accelaration;

  constructor(brand, model, accelaration) {
    super(brand, model);
    this.accelaration = accelaration;
  }
  go() {
    if (!this.isTrunkOpen) {
      if (this.speed < 300) {
        this.speed += this.accelaration;
        console.log(`car is going at ${this.speed} km/h`);
      } else {
        console.log("max speed reached");
      }
    } else {
      console.log("close the trunk first");
    }
  }
}
const race1 = new racaeCar("ferrari", "488", 20);
console.log(race1);
race1.go();
race1.go();
race1.brake();
