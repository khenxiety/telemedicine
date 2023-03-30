import { Injectable } from '@angular/core';
import {
  child,
  Database,
  get,
  onValue,
  orderByChild,
  ref,
  remove,
  startAt,
  endAt,
  query,
  push,
  update,
} from '@angular/fire/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database) {}

  getDataSnapshot(): Observable<any> {
    const dbInstance = ref(this.db, 'data/');

    // return from(
    //   onValue(dbInstance, (snapshot) => {
    //     return snapshot.val();
    //   })
    // );
    return from(
      get(dbInstance)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  getDataRealtime(): Observable<any> {
    const dbInstance = ref(this.db, 'data/');
    return new Observable((observer) => {
      const unsubscribe = onValue(
        dbInstance,
        (snapshot) => {
          if (snapshot.exists()) {
            observer.next({
              status: 200,
              message: 'success',
              data: snapshot.val(),
            });
          } else {
            observer.next({
              status: 400,
              message: 'No data available',
              data: undefined,
            });
          }
        },
        (error) => {
          console.error(error);
          observer.next({
            status: 400,
            message: 'Error',
            data: error,
          });
        }
      );
      return unsubscribe;
    });
  }

  getSingleDataSnapshot(id: string): Observable<any> {
    const dbInstance = ref(this.db, `data/${id}`);

    return from(
      get(dbInstance)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  updatePatientData(key: string, data: any) {
    const dbInstance = ref(this.db, `data/${key}`);
    return update(dbInstance, data);
  }

  removeData(id: string): Promise<void> {
    const dbInstance = ref(this.db, `data/${id}`);
    return remove(dbInstance);
  }

  getDataByDateRange(startDate: string, endDate: string): Observable<any> {
    const dbInstance = ref(this.db, 'data/');
    const sortedData = query(dbInstance, orderByChild('date'));
    const filteredData = query(sortedData, startAt(startDate), endAt(endDate));
    return from(
      get(filteredData)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  addData(data: any): Promise<any> {
    // Use the push method to add a new record to the database
    const dbInstance = ref(this.db, 'data/');
    return push(dbInstance, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addCmsContactData(data: any): Promise<any> {
    const dbInstance = ref(this.db, 'cms/contacts/');
    return push(dbInstance, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  getCmsContactData(): Observable<any> {
    const dbInstance = ref(this.db, 'cms/contacts/');
    return new Observable((observer) => {
      const unsubscribe = onValue(
        dbInstance,
        (snapshot) => {
          if (snapshot.exists()) {
            observer.next({
              status: 200,
              message: 'success',
              data: snapshot.val(),
            });
          } else {
            observer.next({
              status: 400,
              message: 'No data available',
              data: undefined,
            });
          }
        },
        (error) => {
          console.error(error);
          observer.next({
            status: 400,
            message: 'Error',
            data: error,
          });
        }
      );
      return unsubscribe;
    });
  }

  updateCmsContactData(key: string, data: any) {
    // Use the update method to update the specified record in the database
    const dbInstance = ref(this.db, `cms/contacts/${key}`);
    return update(dbInstance, data);
  }
}
