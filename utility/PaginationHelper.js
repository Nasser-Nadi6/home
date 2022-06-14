class PaginationHelper {
    output=[]
    items
    numberOfItemsInEachPage

    constructor(items, numberOfItemsInEachPage) {
        this.items = items
        this.numberOfItemsInEachPage = numberOfItemsInEachPage
    }

    pageCount() {
        for (let i = 0; i < this.items.length; i = i + this.numberOfItemsInEachPage) {
            this.output.push(this.items.slice(i, i + this.numberOfItemsInEachPage))
        }
        return this.output
    }

    itemCount(){
        return this.items.length
    }

    pageItemCount(pageNumber){
        const pageItemCount= this.output[pageNumber]?.length
        if(!pageItemCount){
            return -1
        }
        return pageItemCount
    }

    pageIndex(index){
        if(index>this.itemCount() || index<0){
            return -1
        }
        return Math.floor(index/this.numberOfItemsInEachPage)
    }
}


const paginationHelper = new PaginationHelper(["a", "b", "c", "d", "c", "d"], 4)
// console.log(paginationHelper.pageCount());
// console.log(paginationHelper.itemCount());
// console.log(paginationHelper.pageItemCount(0));
// console.log(paginationHelper.pageIndex(60))

module.exports=PaginationHelper
