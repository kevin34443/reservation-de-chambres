export interface User{
    username:string,
    passwort: string,

}
export interface Room{
    name: string,
    status: string,
    startReservation: Date,
    endReservation: Date,
}
export interface ReservedRoom {
    roomNumber: string;
    start: string;
    end: string;
  }