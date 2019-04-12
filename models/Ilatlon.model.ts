

export class Ilatlon {

    public lat: any ;
    public lng: any;

    constructor(lat: any, lng:any) {
        this.set(lat, lng);
    }

    set(lat: any, lng:any) {
        if (lat && lng) {
            this.lat = eval(lng) ;
            this.lng = eval(lat) ;
        }
    }




}
