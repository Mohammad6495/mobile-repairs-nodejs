class HttpError extends Error {
    statusCode: number;
    data: any;
  
    constructor(messages: string[] = [], errorCode: number, data: any = null) {
      const message = messages.join(' '); 
      super(message);
      this.statusCode = errorCode;
      this.message = messages as any
      this.data = data;
    }
  }
  
  export default HttpError;
  