export class ExcelManager {

    public static getColumns(data : any[]){
      let columns = new Set<any>();
      for (let i = 0; i < data.length && i < 10000; i++) {
        const row : any = data[i];
        this.getColumnsFromRow(row).every(col => columns.add(col))
      }
      return columns;
    }
    
    public static checkRowsLength(data : any[]){
      console.log(data)
        return data.length >= 2;
    }

    private static getColumnsFromRow(row : any){
      let columns: string[] = [];
      Object.entries(row).forEach((value) => { columns.push(value[0]) })
      return columns;
    }
}