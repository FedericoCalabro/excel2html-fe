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

    view? : "TABLE" | "CARD" = "TABLE";
    name? : string = "DATA-VIEW";
    addRowCounter? : boolean = false;
    linkColumns? : string[] = [];
    linkNames? : string[] = [];
    columns? : any[] = [];
    rowCriteria? : RowCriteria[] = [];
    themeColor? : string = "#32a852";
    mergedColumns? : MergedColumns[]

    constructor(partial : Partial<Config>){
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