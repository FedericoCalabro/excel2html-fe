export class Generation {
    data!: any[];
    config! : Config;

    constructor(partial : Partial<Generation>){
        Object.assign(this, partial);
    }
}

export class GenerationEntity {
    id? : string;
    html? : string;
    blobl? : any;
}

export class Config {

    view : "TABLE" | "CARD" | "PIVOT" = "PIVOT";
    name : string = "DATA-VIEW";
    addRowCounter : boolean = false;
    linkColumns : string[] = [];
    linkNames : string[] = [];
    columns : any[] = [];
    rowCriteria : RowCriteria[] = [];
    themeColor : string[] = [];
    mergedColumns? : MergedColumns[];
    textColor : string[] = [];
    aggregationRows? : AggregationRow[] = [];
    enableSorting? : boolean = false; 
    sortByColumns? : SortingColumn[] = [];

    constructor(partial : Partial<Config>){
        Object.assign(this, partial);
    }
}

export class SortingColumn{
    type? : "Number" | "String";
    name? : string;
    order? : number = 1;

    constructor(partial : Partial<SortingColumn>){
        Object.assign(this, partial);
    }
}


export class AggregationRow{
    blockedCol? : string;
    targetCol? : string;
    op? : 'Sum' | 'Min' | 'Max' | 'Std Variance' | 'Std Deviation' | 'Product';

    constructor(partial : Partial<AggregationRow>){
        Object.assign(this, partial);
    }
}

export class MergedColumns{
    name? : string;
    mergedFrom : string[] = [];

    constructor(partial : Partial<MergedColumns>){
        Object.assign(this, partial);
    }  
}

export class RowCriteria {
    columnName? : string;
    type? : "String" | "Number" = "Number";
    op? : '>' | '<' | '=' | '!=' | 'Regex' = ">";
    value? : any = "0";

    constructor(partial : Partial<RowCriteria>){
        Object.assign(this, partial);
    }
}

export class FileResponse {
    filename! : string;
    blob! : any;

    constructor(partial : Partial<FileResponse>){
        Object.assign(this, partial);
    }
}

export class HtmlObj {
    preview : any = "";
    res? : FileResponse = undefined;

    constructor(partial : Partial<HtmlObj>){
        Object.assign(this, partial);
    }
}

export class DataObj {
    data : any[] = [];
    columns : string[] = [];

    constructor(partial : Partial<DataObj>){
        Object.assign(this, partial);
    }
}