interface IBulkUpload{
    fileName:string,
    totalEntries : number,
    totalErrors : number,
    timeTaken : number,
    session_id : string
}

export default IBulkUpload;
