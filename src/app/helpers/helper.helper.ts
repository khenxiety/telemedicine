export class Helper {
  static dateFormatter(date: string) {
    const dateString = date;
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  static toArrayObjects(data: any): any[] {
    const newData: any[] = [];
    for (const i in data['data']) {
      newData.push({ id: i, ...data['data'][i] });
    }

    return newData;
  }
}
