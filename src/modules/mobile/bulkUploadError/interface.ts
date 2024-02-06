interface IBulkError{
  totalEntries : number,
  errorDetails : string | object,
  session_id : string
}

export default IBulkError;
