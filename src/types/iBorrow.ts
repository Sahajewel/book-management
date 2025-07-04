export interface Iborrow{
    _id: string;
    quantity: number;
     dueDate: string;
    book:{
        title: string;
        isbn: string;
    },
   
}