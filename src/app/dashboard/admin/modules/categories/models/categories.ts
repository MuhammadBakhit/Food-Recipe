export interface ICategory{
    data:ICategoryData[];
    pageNumber:number;
    pageSize:number;
    totalNumberOfPages:number;
    totalNumberOfRecords:number;

}
export interface ICategoryData{
    id?:number;
    name:string;
    creationDate:Date;
    modificationDate:Date;
    imagePath:string;
    description:string;
}

export interface IgetCategoryParams{
    pageSize:number;
    pageNumber:number;
}



