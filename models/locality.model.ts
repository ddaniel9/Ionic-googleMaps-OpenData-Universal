export class City {

    public name: string = "";
    public url: string = "";
    public countryCode: string = "";


    constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
            this.name = obj.name || this.name;
            this.url = obj.url || this.url;
            this.countryCode = obj.countryCode || this.countryCode;
        }
    }
  }
