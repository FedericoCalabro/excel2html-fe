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

    view : "TABLE" | "CARD" | "PIVOT" = "CARD";
    addRowCounter : boolean = false;
    mergedColumns? : MergedColumns[];
    aggregationRows : AggregationRow[] = [];
    sortByColumns? : SortingColumn[] = [];
    rowCriteria : RowCriteria[] = [];
    cardHeaderConfig : CardHeaderConfig = new CardHeaderConfig({});

    columns : any[] = [];
    themeColor : string[] = [];
    textColor : string[] = [];

    constructor(partial : Partial<Config>){
        Object.assign(this, partial);
    }
}

export class CardHeaderConfig {

    isLink : boolean = true;
    linkDisplayColumn? : string;
    linkValueColumn? : string;

    colorsCriteria : CardHeaderColorCriteria[] = [];

    constructor(partial : Partial<CardHeaderConfig>){
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
    op? : string[] = [];

    constructor(partial : Partial<AggregationRow>){
        Object.assign(this, partial);
    }
}

export class MergedColumns{
    nameDefinition? : string;
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

export class CardHeaderColorCriteria extends RowCriteria {
    color : string = "00ff00"

    constructor(partial : Partial<CardHeaderColorCriteria>){
        super(partial);
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