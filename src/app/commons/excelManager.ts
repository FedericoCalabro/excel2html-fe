export class ExcelManager {

  public static getColumns(data : any[]){
    let row = data[0];
    let columns: string[] = [];
    Object.entries(row).forEach((value) => { columns.push(value[0]) })
    return columns;
  }

    public static checkRowsLength(data : any[]){
      console.log(data)
      return data.length >= 1;
    }

    public static checkSameColName(data : any[]){
      let columns = this.getColumns(data);
      return new Set(columns).size === columns.length;
    }
}