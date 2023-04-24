import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


    public  setItem(key: string, item: any): void {
      localStorage.setItem(key, JSON.stringify(item))
    }
  
    public  async getItem(key: string): Promise<any> {
      const dataItem = await localStorage.getItem(key)
  
      return dataItem ? JSON.parse(dataItem) : null
    }

    public removeItem(key:string){
      localStorage.removeItem(key)
    }
  
}
